import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const methods = ['bone', 'bazi', 'ziwei', 'fengshui', 'name', 'divination', 'phone'];

const Result = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    const formDataStr = localStorage.getItem('formData');
    if (!formDataStr) {
      navigate('/');
      return;
    }

    const data = JSON.parse(formDataStr);
    setFormData(data);
    setIsAll(data.method === 'all');
    getResults(data);
  }, [navigate]);

  const getResults = async (data: any) => {
    setLoading(true);
    try {
      if (data.method === 'all') {
        const promises = methods.map(async (method) => {
          try {
            const response = await fetch(`http://localhost:3001/api/fortune/${method}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            return await response.json();
          } catch (error) {
            return getFallbackResult(method, data);
          }
        });
        const allResults = await Promise.all(promises);
        setResults(allResults);
      } else {
        try {
          const response = await fetch(`http://localhost:3001/api/fortune/${data.method}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          setResults([result]);
        } catch (error) {
          setResults([getFallbackResult(data.method, data)]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getFallbackResult = (method: string, data: any) => {
    switch (method) {
      case 'bone':
        return getBoneResult(data);
      case 'bazi':
        return getBaziResult(data);
      case 'ziwei':
        return getZiweiResult(data);
      case 'fengshui':
        return getFengshuiResult(data);
      case 'name':
        return getNameResult(data);
      case 'divination':
        return getDivinationResult(data);
      case 'phone':
        return getPhoneResult(data);
      default:
        return { type: '未知', analysis: '测算失败' };
    }
  };

  const getBoneResult = (formData: any) => {
    const year = parseInt(formData.year);
    const month = parseInt(formData.month);
    const day = parseInt(formData.day);
    let boneWeight = 0;
    if (year >= 1920 && year <= 1929) boneWeight += 0.6;
    else if (year >= 1930 && year <= 1939) boneWeight += 0.7;
    else if (year >= 1940 && year <= 1949) boneWeight += 0.8;
    else if (year >= 1950 && year <= 1959) boneWeight += 0.9;
    else if (year >= 1960 && year <= 1969) boneWeight += 1.0;
    else if (year >= 1970 && year <= 1979) boneWeight += 1.1;
    else if (year >= 1980 && year <= 1989) boneWeight += 1.2;
    else if (year >= 1990 && year <= 1999) boneWeight += 1.3;
    else if (year >= 2000 && year <= 2009) boneWeight += 1.4;
    else if (year >= 2010 && year <= 2019) boneWeight += 1.5;
    else if (year >= 2020 && year <= 2029) boneWeight += 1.6;
    const monthWeights = [0, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
    boneWeight += monthWeights[month] || 0.6;
    const dayWeights = [0, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5];
    boneWeight += dayWeights[day] || 0.5;
    if (formData.hour) boneWeight += 0.8;
    let analysis = '';
    if (boneWeight < 2.0) analysis = '骨重较轻，一生劳碌，奔波辛苦，但晚景尚可。';
    else if (boneWeight < 3.0) analysis = '骨重中等，一生平稳，虽有波折，但总体顺遂。';
    else if (boneWeight < 4.0) analysis = '骨重较重，一生富贵，事业有成，家庭幸福。';
    else analysis = '骨重很重，一生大富大贵，名利双收，福禄双全。';
    return { type: '称骨算命', boneWeight: boneWeight.toFixed(1), analysis };
  };

  const getBaziResult = (formData: any) => ({
    type: '八字算命',
    bazi: `${formData.year}年${formData.month}月${formData.day}日`,
    analysis: '八字测算结果：命局中和，五行均衡，一生运势平稳，事业有成，家庭幸福。'
  });

  const getZiweiResult = (formData: any) => ({
    type: '紫微斗数',
    analysis: '紫微命盘分析：命宫有紫微坐守，主贵，一生荣华富贵，事业有成，婚姻美满。'
  });

  const getFengshuiResult = (formData: any) => ({
    type: '风水测试',
    analysis: '风水分析：住宅风水良好，气场和谐，有利于财运和健康，家人平安。'
  });

  const getNameResult = (formData: any) => {
    const name = formData.name;
    const nameScore = Math.floor(Math.random() * 20) + 80;
    return {
      type: '周易测名',
      name,
      score: nameScore,
      analysis: '姓名分析：这个名字数理吉祥，寓意美好，有利于事业发展和人际关系。'
    };
  };

  const getDivinationResult = (formData: any) => {
    const hexagrams = [
      '乾为天', '坤为地', '水雷屯', '山水蒙', '水天需', '天水讼', '地水师', '水地比',
      '风天小畜', '天泽履', '地天泰', '天地否', '天火同人', '火天大有', '地山谦', '雷地豫'
    ];
    const randomHexagram = hexagrams[Math.floor(Math.random() * hexagrams.length)];
    return {
      type: '周易占卜',
      hexagram: randomHexagram,
      analysis: '占卜结果：近期运势良好，做事顺利，宜把握机会。'
    };
  };

  const getPhoneResult = (formData: any) => {
    const phone = '138' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const phoneScore = Math.floor(Math.random() * 30) + 70;
    return {
      type: '手机吉凶',
      phone,
      score: phoneScore,
      analysis: '手机号码分析：此号码数理吉祥，有利于财运和人际关系，使用此号码会带来好运。'
    };
  };

  const renderResultCard = (result: any, index: number) => (
    <div key={index} className="bg-red-900/50 p-6 rounded-lg border border-yellow-600/30 mb-6 fade-in">
      <h3 className="text-xl font-bold mb-4 text-yellow-300">{result.type}</h3>
      {result.boneWeight && <p className="mb-2">骨重：{result.boneWeight}两</p>}
      {result.bazi && <p className="mb-2">八字：{result.bazi}</p>}
      {result.hexagram && <p className="mb-2">卦象：{result.hexagram}</p>}
      {result.name && result.score && <p className="mb-2">姓名评分：{result.score}分</p>}
      {result.phone && result.score && <p className="mb-2">手机号码：{result.phone}</p>}
      {result.phone && result.score && <p className="mb-2">号码评分：{result.score}分</p>}
      <p className="mt-4 text-lg">{result.analysis}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-red-800/30 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-yellow-600/50">
        <div className="flex justify-center items-center h-64">
          <div className="text-yellow-300 text-xl">{isAll ? '正在进行全面测算，请稍候...' : '测算中...'}</div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0 || !formData) {
    return (
      <div className="max-w-4xl mx-auto bg-red-800/30 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-yellow-600/50">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">无测算结果</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors"
          >
            返回重新测算
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-red-800/30 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-yellow-600/50">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">
        {isAll ? '全面测算结果' : results[0]?.type + '结果'}
      </h2>
      
      <div className="bg-red-900/30 p-6 rounded-lg border border-yellow-600/30 mb-8">
        <p className="text-lg mb-2">姓名：{formData.name}</p>
        <p className="text-lg mb-2">性别：{formData.gender === 'male' ? '男' : '女'}</p>
        <p className="text-lg mb-2">出生日期：{formData.year}年{formData.month}月{formData.day}日</p>
        {formData.hour && <p className="text-lg mb-2">时辰：{formData.hour}</p>}
      </div>

      <div className="space-y-6">
        {results.map((result, index) => renderResultCard(result, index))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          重新测算
        </button>
      </div>
    </div>
  );
};

export default Result;

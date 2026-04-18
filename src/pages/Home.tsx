import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    year: '',
    month: '',
    day: '',
    hour: '',
    method: 'bone'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 验证表单
    if (!formData.name || !formData.year || !formData.month || !formData.day) {
      alert('请填写必填信息');
      return;
    }
    // 保存表单数据到localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    // 导航到结果页面
    navigate('/result');
  };

  return (
    <div className="max-w-4xl mx-auto bg-red-800/30 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-yellow-600/50">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">命理测算</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">姓名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">性别</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>

        {/* 出生日期 */}
        <div>
          <label className="block text-sm font-medium mb-2">出生日期</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="年"
              required
              className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="月"
              required
              min="1"
              max="12"
              className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="日"
              required
              min="1"
              max="31"
              className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* 时辰 */}
        <div>
          <label className="block text-sm font-medium mb-2">时辰 (可选)</label>
          <select
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">请选择</option>
            <option value="23-1">子时 (23:00-01:00)</option>
            <option value="1-3">丑时 (01:00-03:00)</option>
            <option value="3-5">寅时 (03:00-05:00)</option>
            <option value="5-7">卯时 (05:00-07:00)</option>
            <option value="7-9">辰时 (07:00-09:00)</option>
            <option value="9-11">巳时 (09:00-11:00)</option>
            <option value="11-13">午时 (11:00-13:00)</option>
            <option value="13-15">未时 (13:00-15:00)</option>
            <option value="15-17">申时 (15:00-17:00)</option>
            <option value="17-19">酉时 (17:00-19:00)</option>
            <option value="19-21">戌时 (19:00-21:00)</option>
            <option value="21-23">亥时 (21:00-23:00)</option>
          </select>
        </div>

        {/* 测算方法 */}
        <div>
          <label className="block text-sm font-medium mb-2">测算方法</label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-red-900/50 border border-yellow-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">一键测算全部</option>
            <option value="bone">称骨算命</option>
            <option value="bazi">八字算命</option>
            <option value="ziwei">紫微斗数</option>
            <option value="fengshui">风水测试</option>
            <option value="name">周易测名</option>
            <option value="divination">周易占卜</option>
            <option value="phone">手机吉凶</option>
          </select>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            开始测算
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
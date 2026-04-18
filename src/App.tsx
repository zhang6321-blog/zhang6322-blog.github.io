import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-black text-white">
        <header className="py-6 px-4 bg-red-800 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-yellow-300">命理测算</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="hover:text-yellow-300 transition-colors">首页</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <footer className="py-6 px-4 bg-red-900 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm text-gray-300">© 2026 命理测算 | 仅供娱乐</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
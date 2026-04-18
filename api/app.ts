import express from 'express';
import cors from 'cors';
import fortuneRoutes from './routes/fortune';

const app = express();

app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 测算路由
app.use('/api/fortune', fortuneRoutes);

export default app;
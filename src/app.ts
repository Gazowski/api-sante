import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import bloodPressureRoutes from './routes/bloodPressure.routes';
import userRoutes from './routes/user.routes';
// import healthDataRoutes from './routes/healthData.routes'
import { connectToDatabase } from './config/db.config';
// import { authenticate } from './middlewares/auth.middleware';

const app = express();

app.use(cors()); // Important pour les requêtes cross-origin
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bloodpressure', bloodPressureRoutes);
app.use('/api/user', userRoutes);  
// app.use('/api/healthdata', authenticate, healthDataRoutes); // Protéger les routes healthData

connectToDatabase();

export default app;
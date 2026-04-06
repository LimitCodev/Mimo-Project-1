import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';

import { initializeDatabase } from './db/connection.js';
import circuitsRouter from './routes/circuits.js';
import simulationsRouter from './routes/simulations.js';
import algorithmsRouter from './routes/algorithms.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/circuits', circuitsRouter);
app.use('/api/simulations', simulationsRouter);
app.use('/api/algorithms', algorithmsRouter);

// Error handling middleware
interface AppError extends Error {
    status?: number;
    code?: string;
}

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message);

    const status = err.status || 500;
    const code = err.code || 'INTERNAL_ERROR';

    res.status(status).json({
        success: false,
        error: {
            code,
            message: err.message || 'An unexpected error occurred',
        },
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'The requested resource was not found',
        },
    });
});

// Start server
async function start() {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`🚀 QuantumCloud server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();

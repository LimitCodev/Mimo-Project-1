import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getDb } from '../db/connection.js';
import type { NewExecution } from '../db/schema.js';

const router = Router();

// ============================================================================
// Validation Schemas
// ============================================================================

const runSimulationSchema = z.object({
    circuitId: z.number().int().positive(),
    shots: z.number().int().min(1).max(10000).default(1024),
    backend: z.enum(['simulator', 'noisy_simulator']).default('simulator'),
});

// ============================================================================
// Routes
// ============================================================================

/**
 * POST /api/simulations/run
 * Execute a quantum circuit simulation
 * 
 * Note: Actual simulation runs client-side using the Quantum Engine.
 * This endpoint records the execution for history/analytics.
 */
router.post('/run', async (req: Request, res: Response) => {
    const startTime = performance.now();

    try {
        const validation = runSimulationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: validation.error.errors.map(e => `${e.path}: ${e.message}`).join(', '),
                },
            });
        }

        const { circuitId, shots, backend } = validation.data;
        const db = getDb();

        // Verify circuit exists
        const circuit = await db
            .selectFrom('circuits')
            .select(['id', 'num_qubits', 'qasm'])
            .where('id', '=', circuitId)
            .executeTakeFirst();

        if (!circuit) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Circuit not found' },
            });
        }

        // Simulate measurement (placeholder - real simulation is client-side)
        // This generates random results for demo purposes
        const numStates = 2 ** circuit.num_qubits;
        const counts: Record<string, number> = {};

        for (let i = 0; i < shots; i++) {
            const state = Math.floor(Math.random() * numStates);
            const stateStr = state.toString(2).padStart(circuit.num_qubits, '0');
            counts[stateStr] = (counts[stateStr] || 0) + 1;
        }

        // Calculate probabilities
        const probabilities: Record<string, number> = {};
        for (const [state, count] of Object.entries(counts)) {
            probabilities[state] = count / shots;
        }

        const executionTimeMs = Math.round(performance.now() - startTime);
        const now = new Date().toISOString();

        // Record execution
        const execution: NewExecution = {
            circuit_id: circuitId,
            shots,
            counts: JSON.stringify(counts),
            probabilities: JSON.stringify(probabilities),
            execution_time_ms: executionTimeMs,
            backend,
            created_at: now,
        };

        const result = await db
            .insertInto('executions')
            .values(execution)
            .returning(['id'])
            .executeTakeFirstOrThrow();

        res.json({
            success: true,
            data: {
                executionId: result.id,
                circuitId,
                counts,
                probabilities,
                shots,
                executionTimeMs,
                backend,
            },
        });
    } catch (error: any) {
        console.error('Error running simulation:', error);
        res.status(500).json({
            success: false,
            error: { code: 'SIMULATION_ERROR', message: error.message },
        });
    }
});

/**
 * GET /api/simulations/history/:circuitId
 * Get simulation history for a circuit
 */
router.get('/history/:circuitId', async (req: Request, res: Response) => {
    try {
        const circuitId = parseInt(req.params.circuitId, 10);
        if (isNaN(circuitId)) {
            return res.status(400).json({
                success: false,
                error: { code: 'INVALID_ID', message: 'Circuit ID must be a number' },
            });
        }

        const db = getDb();
        const executions = await db
            .selectFrom('executions')
            .selectAll()
            .where('circuit_id', '=', circuitId)
            .orderBy('created_at', 'desc')
            .limit(20)
            .execute();

        const items = executions.map(e => ({
            ...e,
            counts: JSON.parse(e.counts),
            probabilities: JSON.parse(e.probabilities),
        }));

        res.json({
            success: true,
            data: { items },
        });
    } catch (error: any) {
        console.error('Error fetching history:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

export default router;

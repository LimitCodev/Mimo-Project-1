import { Router, Request, Response } from 'express';
import { getDb } from '../db/connection.js';

const router = Router();

/**
 * GET /api/algorithms
 * List all pre-built quantum algorithms with their explanations
 */
router.get('/', async (_req: Request, res: Response) => {
    try {
        const db = getDb();
        const algorithms = await db
            .selectFrom('algorithms')
            .selectAll()
            .orderBy('name', 'asc')
            .execute();

        res.json({
            success: true,
            data: { items: algorithms },
        });
    } catch (error: any) {
        console.error('Error fetching algorithms:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

/**
 * GET /api/algorithms/:slug
 * Get a single algorithm by slug with full explanation
 */
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const db = getDb();

        const algorithm = await db
            .selectFrom('algorithms')
            .selectAll()
            .where('slug', '=', slug)
            .executeTakeFirst();

        if (!algorithm) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Algorithm not found' },
            });
        }

        // Get the associated circuit
        const circuit = await db
            .selectFrom('circuits')
            .selectAll()
            .where('id', '=', algorithm.circuit_id)
            .executeTakeFirst();

        res.json({
            success: true,
            data: {
                ...algorithm,
                circuit: circuit ? {
                    ...circuit,
                    tags: JSON.parse(circuit.tags || '[]'),
                } : null,
            },
        });
    } catch (error: any) {
        console.error('Error fetching algorithm:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

export default router;

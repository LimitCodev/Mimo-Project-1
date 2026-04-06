import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getDb } from '../db/connection.js';
import type { NewCircuit } from '../db/schema.js';

const router = Router();

// ============================================================================
// Validation Schemas
// ============================================================================

const createCircuitSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    qasm: z.string().min(1),
    numQubits: z.number().int().min(1).max(12),
    numGates: z.number().int().min(0),
    depth: z.number().int().min(0),
    category: z.enum(['algorithm', 'tutorial', 'benchmark', 'custom']).default('custom'),
    tags: z.array(z.string()).default([]),
    isPublic: z.boolean().default(false),
    authorName: z.string().max(50).optional(),
});

const listCircuitsSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(50),
    offset: z.coerce.number().int().min(0).default(0),
    category: z.enum(['algorithm', 'tutorial', 'benchmark', 'custom']).optional(),
    isPublic: z.coerce.boolean().optional(),
});

// ============================================================================
// Routes
// ============================================================================

/**
 * GET /api/circuits
 * List circuits with pagination and filtering
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const params = listCircuitsSchema.parse(req.query);
        const db = getDb();

        let query = db.selectFrom('circuits').selectAll();

        // Apply filters
        if (params.category) {
            query = query.where('category', '=', params.category);
        }
        if (params.isPublic !== undefined) {
            query = query.where('is_public', '=', params.isPublic ? 1 : 0);
        }

        // Get total count
        const countResult = await db
            .selectFrom('circuits')
            .select(db.fn.count<number>('id').as('count'))
            .executeTakeFirst();

        // Get paginated results
        const circuits = await query
            .orderBy('created_at', 'desc')
            .limit(params.limit)
            .offset(params.offset)
            .execute();

        // Parse JSON fields
        const items = circuits.map(c => ({
            ...c,
            tags: JSON.parse(c.tags || '[]'),
            isPublic: Boolean(c.is_public),
        }));

        res.json({
            success: true,
            data: {
                items,
                total: countResult?.count || 0,
                limit: params.limit,
                offset: params.offset,
            },
        });
    } catch (error: any) {
        console.error('Error listing circuits:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

/**
 * GET /api/circuits/:id
 * Get a single circuit by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: { code: 'INVALID_ID', message: 'Circuit ID must be a number' },
            });
        }

        const db = getDb();
        const circuit = await db
            .selectFrom('circuits')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();

        if (!circuit) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Circuit not found' },
            });
        }

        res.json({
            success: true,
            data: {
                ...circuit,
                tags: JSON.parse(circuit.tags || '[]'),
                isPublic: Boolean(circuit.is_public),
            },
        });
    } catch (error: any) {
        console.error('Error fetching circuit:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

/**
 * POST /api/circuits
 * Create a new circuit
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const validation = createCircuitSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: validation.error.errors.map(e => `${e.path}: ${e.message}`).join(', '),
                },
            });
        }

        const data = validation.data;
        const now = new Date().toISOString();

        const newCircuit: NewCircuit = {
            name: data.name,
            description: data.description || null,
            qasm: data.qasm,
            num_qubits: data.numQubits,
            num_gates: data.numGates,
            depth: data.depth,
            category: data.category,
            tags: JSON.stringify(data.tags),
            is_public: data.isPublic ? 1 : 0,
            author_name: data.authorName || null,
            downloads: 0,
            created_at: now,
            updated_at: now,
        };

        const db = getDb();
        const result = await db
            .insertInto('circuits')
            .values(newCircuit)
            .returning(['id'])
            .executeTakeFirstOrThrow();

        // Fetch the created circuit
        const circuit = await db
            .selectFrom('circuits')
            .selectAll()
            .where('id', '=', result.id)
            .executeTakeFirstOrThrow();

        res.status(201).json({
            success: true,
            data: {
                ...circuit,
                tags: data.tags,
                isPublic: data.isPublic,
            },
        });
    } catch (error: any) {
        console.error('Error creating circuit:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

/**
 * DELETE /api/circuits/:id
 * Delete a circuit
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: { code: 'INVALID_ID', message: 'Circuit ID must be a number' },
            });
        }

        const db = getDb();
        const result = await db
            .deleteFrom('circuits')
            .where('id', '=', id)
            .executeTakeFirst();

        if (result.numDeletedRows === 0n) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Circuit not found' },
            });
        }

        res.json({
            success: true,
            data: { deleted: true, id },
        });
    } catch (error: any) {
        console.error('Error deleting circuit:', error);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: error.message },
        });
    }
});

export default router;

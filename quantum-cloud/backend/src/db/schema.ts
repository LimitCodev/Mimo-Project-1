import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

/**
 * Database schema types for Kysely ORM
 * Provides full type safety for all database operations
 */

// ============================================================================
// Circuits Table
// ============================================================================

export interface CircuitsTable {
    id: Generated<number>;
    name: string;
    description: string | null;
    qasm: string;
    num_qubits: number;
    num_gates: number;
    depth: number;
    category: 'algorithm' | 'tutorial' | 'benchmark' | 'custom';
    tags: string; // JSON array stored as string
    is_public: number; // SQLite doesn't have boolean, use 0/1
    author_name: string | null;
    downloads: number;
    created_at: string;
    updated_at: string;
}

export type Circuit = Selectable<CircuitsTable>;
export type NewCircuit = Insertable<CircuitsTable>;
export type CircuitUpdate = Updateable<CircuitsTable>;

// ============================================================================
// Executions Table
// ============================================================================

export interface ExecutionsTable {
    id: Generated<number>;
    circuit_id: number;
    shots: number;
    counts: string; // JSON object stored as string
    probabilities: string; // JSON object stored as string
    execution_time_ms: number;
    backend: string;
    created_at: string;
}

export type Execution = Selectable<ExecutionsTable>;
export type NewExecution = Insertable<ExecutionsTable>;

// ============================================================================
// Algorithms Table
// ============================================================================

export interface AlgorithmsTable {
    id: Generated<number>;
    name: string;
    slug: string;
    description: string;
    circuit_id: number;
    complexity: string;
    explanation: string;
    created_at: string;
}

export type Algorithm = Selectable<AlgorithmsTable>;
export type NewAlgorithm = Insertable<AlgorithmsTable>;

// ============================================================================
// Database Schema
// ============================================================================

export interface Database {
    circuits: CircuitsTable;
    executions: ExecutionsTable;
    algorithms: AlgorithmsTable;
}

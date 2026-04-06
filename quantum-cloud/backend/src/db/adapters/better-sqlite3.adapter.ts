import Database from 'better-sqlite3';
import type { CompiledQuery, QueryResult } from 'kysely';
import type { DatabaseAdapter, AdapterConfig } from './adapter.interface.js';

/**
 * Better-SQLite3 Adapter for Development
 * 
 * Benefits:
 * - 10x faster than sql.js
 * - Synchronous operations
 * - Native SQLite bindings
 * 
 * Requirements:
 * - Node.js with native module compilation (node-gyp)
 * - Only for development environment
 */
export class BetterSqlite3Adapter implements DatabaseAdapter {
    private db: Database.Database | null = null;
    private config: AdapterConfig;

    constructor(config: AdapterConfig) {
        this.config = config;
    }

    async init(): Promise<void> {
        if (this.db) return;

        this.db = new Database(this.config.databasePath, {
            verbose: this.config.verbose ? console.log : undefined,
        });

        // Enable WAL mode for better concurrent access
        this.db.pragma('journal_mode = WAL');

        // Enable foreign keys
        this.db.pragma('foreign_keys = ON');

        console.log(`[BetterSqlite3] Connected to ${this.config.databasePath}`);
    }

    async executeQuery<R>(query: CompiledQuery): Promise<QueryResult<R>> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const { sql, parameters } = query;
        const isSelect = sql.trimStart().toUpperCase().startsWith('SELECT');
        const hasReturning = sql.toUpperCase().includes('RETURNING');

        try {
            if (isSelect || hasReturning) {
                const stmt = this.db.prepare(sql);
                const rows = stmt.all(...(parameters as any[])) as R[];
                return { rows };
            } else {
                const stmt = this.db.prepare(sql);
                const result = stmt.run(...(parameters as any[]));
                return {
                    rows: [] as R[],
                    numAffectedRows: BigInt(result.changes),
                    insertId: result.lastInsertRowid !== undefined
                        ? BigInt(result.lastInsertRowid)
                        : undefined,
                };
            }
        } catch (error: any) {
            throw new Error(`SQL Error: ${error.message}\nQuery: ${sql}`);
        }
    }

    async close(): Promise<void> {
        if (this.db) {
            this.db.close();
            this.db = null;
            console.log('[BetterSqlite3] Connection closed');
        }
    }

    getDatabase(): Database.Database {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        return this.db;
    }
}

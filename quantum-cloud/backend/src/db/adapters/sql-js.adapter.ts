import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';
import type { CompiledQuery, QueryResult } from 'kysely';
import type { DatabaseAdapter, AdapterConfig } from './adapter.interface.js';

/**
 * SQL.js Adapter for Production (Mimo)
 * 
 * Benefits:
 * - No native compilation required
 * - WASM-based, works everywhere
 * - Compatible with Mimo hosting
 * 
 * Trade-offs:
 * - Slower than better-sqlite3
 * - Requires manual persistence
 */
export class SqlJsAdapter implements DatabaseAdapter {
    private db: SqlJsDatabase | null = null;
    private config: AdapterConfig;
    private persistInterval: NodeJS.Timeout | null = null;

    constructor(config: AdapterConfig) {
        this.config = config;
    }

    async init(): Promise<void> {
        if (this.db) return;

        const SQL = await initSqlJs();

        // Ensure data directory exists
        const dir = path.dirname(this.config.databasePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Load existing database or create new
        if (fs.existsSync(this.config.databasePath)) {
            const fileBuffer = fs.readFileSync(this.config.databasePath);
            this.db = new SQL.Database(new Uint8Array(fileBuffer));
            console.log(`[SqlJs] Loaded database from ${this.config.databasePath}`);
        } else {
            this.db = new SQL.Database();
            console.log(`[SqlJs] Created new database`);
        }

        // Enable foreign keys
        this.db.run('PRAGMA foreign_keys = ON');

        // Auto-persist every 30 seconds
        this.persistInterval = setInterval(() => {
            this.persist().catch(console.error);
        }, 30000);

        console.log(`[SqlJs] Connected to ${this.config.databasePath}`);
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
                stmt.bind(parameters as any[]);

                const rows: R[] = [];
                while (stmt.step()) {
                    rows.push(stmt.getAsObject() as R);
                }
                stmt.free();

                return { rows };
            } else {
                this.db.run(sql, parameters as any[]);

                const changes = this.db.getRowsModified();
                const lastId = this.db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0];

                return {
                    rows: [] as R[],
                    numAffectedRows: BigInt(changes),
                    insertId: lastId !== undefined ? BigInt(lastId as number) : undefined,
                };
            }
        } catch (error: any) {
            throw new Error(`SQL Error: ${error.message}\nQuery: ${sql}`);
        }
    }

    async persist(): Promise<void> {
        if (!this.db) return;

        const data = this.db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(this.config.databasePath, buffer);

        if (this.config.verbose) {
            console.log(`[SqlJs] Persisted to ${this.config.databasePath}`);
        }
    }

    async close(): Promise<void> {
        if (this.persistInterval) {
            clearInterval(this.persistInterval);
            this.persistInterval = null;
        }

        if (this.db) {
            await this.persist();
            this.db.close();
            this.db = null;
            console.log('[SqlJs] Connection closed');
        }
    }

    getDatabase(): SqlJsDatabase {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        return this.db;
    }
}

import type { DatabaseConnection, Driver, CompiledQuery, QueryResult } from 'kysely';

/**
 * Database Adapter Interface
 * 
 * Abstraction layer that allows switching between:
 * - better-sqlite3 (development): Fast, requires native compilation
 * - sql.js (production): WASM-based, no native deps, Mimo compatible
 */
export interface DatabaseAdapter {
    /** Initialize the database connection */
    init(): Promise<void>;

    /** Execute a query and return rows */
    executeQuery<R>(query: CompiledQuery): Promise<QueryResult<R>>;

    /** Close the database connection */
    close(): Promise<void>;

    /** Save database to disk (for sql.js) */
    persist?(): Promise<void>;

    /** Get the underlying database instance (for migrations) */
    getDatabase(): unknown;
}

/**
 * Kysely Driver implementation using our adapter
 */
export class AdapterDriver implements Driver {
    private adapter: DatabaseAdapter;
    private connection: AdapterConnection | null = null;

    constructor(adapter: DatabaseAdapter) {
        this.adapter = adapter;
    }

    async init(): Promise<void> {
        await this.adapter.init();
    }

    async acquireConnection(): Promise<DatabaseConnection> {
        if (!this.connection) {
            this.connection = new AdapterConnection(this.adapter);
        }
        return this.connection;
    }

    async beginTransaction(connection: DatabaseConnection): Promise<void> {
        await connection.executeQuery({ sql: 'BEGIN', parameters: [] } as CompiledQuery);
    }

    async commitTransaction(connection: DatabaseConnection): Promise<void> {
        await connection.executeQuery({ sql: 'COMMIT', parameters: [] } as CompiledQuery);
    }

    async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
        await connection.executeQuery({ sql: 'ROLLBACK', parameters: [] } as CompiledQuery);
    }

    async releaseConnection(_connection: DatabaseConnection): Promise<void> {
        // Connection pooling not needed for SQLite
    }

    async destroy(): Promise<void> {
        await this.adapter.close();
        this.connection = null;
    }
}

/**
 * Kysely Connection implementation
 */
class AdapterConnection implements DatabaseConnection {
    private adapter: DatabaseAdapter;

    constructor(adapter: DatabaseAdapter) {
        this.adapter = adapter;
    }

    async executeQuery<R>(query: CompiledQuery): Promise<QueryResult<R>> {
        return this.adapter.executeQuery<R>(query);
    }

    async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
        throw new Error('Streaming not supported in SQLite adapter');
    }
}

/**
 * Environment configuration
 */
export interface AdapterConfig {
    /** Path to SQLite database file */
    databasePath: string;

    /** Force sql.js even in development */
    forceSqlJs?: boolean;

    /** Enable verbose logging */
    verbose?: boolean;
}

/**
 * Determine which adapter to use based on environment
 */
export function shouldUseSqlJs(): boolean {
    // Production always uses sql.js (Mimo compatible)
    if (process.env.NODE_ENV === 'production') {
        return true;
    }

    // Force sql.js if specified (for testing on Windows without build tools)
    if (process.env.FORCE_SQL_JS === 'true') {
        return true;
    }

    // Development uses better-sqlite3 (faster)
    return false;
}

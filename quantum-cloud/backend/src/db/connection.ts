import { Kysely, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely';
import { config as loadEnv } from 'dotenv';
import { createAdapter, AdapterDriver, type DatabaseAdapter } from './adapters/index.js';
import type { Database } from './schema.js';

// Load environment variables
loadEnv();

const DB_PATH = process.env.DATABASE_PATH || './data/database.sqlite';

let db: Kysely<Database> | null = null;
let adapter: DatabaseAdapter | null = null;

/**
 * Initialize the database connection with Kysely ORM
 * 
 * Uses:
 * - better-sqlite3 in development (fast, native)
 * - sql.js in production (Mimo compatible)
 */
export async function initializeDatabase(): Promise<Kysely<Database>> {
    if (db) return db;

    // Create the appropriate adapter based on environment
    adapter = await createAdapter({
        databasePath: DB_PATH,
        verbose: process.env.DB_VERBOSE === 'true',
    });

    // Create Kysely instance with custom driver
    db = new Kysely<Database>({
        dialect: {
            createDriver: () => new AdapterDriver(adapter!),
            createAdapter: () => new SqliteAdapter(),
            createIntrospector: (db) => new SqliteIntrospector(db),
            createQueryCompiler: () => new SqliteQueryCompiler(),
        },
    });

    // Run migrations
    await runMigrations(db);

    console.log('✅ Database initialized with Kysely ORM');
    return db;
}

/**
 * Get the Kysely database instance
 */
export function getDb(): Kysely<Database> {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    return db;
}

/**
 * Close the database connection
 */
export async function closeDatabase(): Promise<void> {
    if (db) {
        await db.destroy();
        db = null;
        adapter = null;
        console.log('Database connection closed');
    }
}

/**
 * Run database migrations (create tables if not exist)
 */
async function runMigrations(database: Kysely<Database>): Promise<void> {
    // Create circuits table
    await database.schema
        .createTable('circuits')
        .ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .addColumn('qasm', 'text', (col) => col.notNull())
        .addColumn('num_qubits', 'integer', (col) => col.notNull())
        .addColumn('num_gates', 'integer', (col) => col.notNull())
        .addColumn('depth', 'integer', (col) => col.notNull())
        .addColumn('category', 'text', (col) => col.notNull().defaultTo('custom'))
        .addColumn('tags', 'text', (col) => col.notNull().defaultTo('[]'))
        .addColumn('is_public', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('author_name', 'text')
        .addColumn('downloads', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('created_at', 'text', (col) => col.notNull())
        .addColumn('updated_at', 'text', (col) => col.notNull())
        .execute();

    // Create executions table
    await database.schema
        .createTable('executions')
        .ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('circuit_id', 'integer', (col) => col.notNull())
        .addColumn('shots', 'integer', (col) => col.notNull())
        .addColumn('counts', 'text', (col) => col.notNull())
        .addColumn('probabilities', 'text', (col) => col.notNull())
        .addColumn('execution_time_ms', 'integer', (col) => col.notNull())
        .addColumn('backend', 'text', (col) => col.notNull().defaultTo('simulator'))
        .addColumn('created_at', 'text', (col) => col.notNull())
        .execute();

    // Create algorithms table
    await database.schema
        .createTable('algorithms')
        .ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('slug', 'text', (col) => col.notNull().unique())
        .addColumn('description', 'text', (col) => col.notNull())
        .addColumn('circuit_id', 'integer', (col) => col.notNull())
        .addColumn('complexity', 'text', (col) => col.notNull())
        .addColumn('explanation', 'text', (col) => col.notNull())
        .addColumn('created_at', 'text', (col) => col.notNull())
        .execute();

    // Create indices
    await database.schema
        .createIndex('idx_circuits_category')
        .ifNotExists()
        .on('circuits')
        .column('category')
        .execute();

    await database.schema
        .createIndex('idx_circuits_is_public')
        .ifNotExists()
        .on('circuits')
        .column('is_public')
        .execute();

    console.log('✅ Database migrations complete');
}

// Export for use in routes
export { db };

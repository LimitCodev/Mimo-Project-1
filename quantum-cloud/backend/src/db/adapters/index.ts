export {
    type DatabaseAdapter,
    AdapterDriver,
    type AdapterConfig,
    shouldUseSqlJs
} from './adapter.interface.js';

// NOTE: Do NOT export the concrete adapters here at top level
// They are dynamically imported in createAdapter() to avoid loading
// better-sqlite3 on systems where it's not compiled

import type { DatabaseAdapter, AdapterConfig } from './adapter.interface.js';
import { shouldUseSqlJs } from './adapter.interface.js';

/**
 * Factory function to create the appropriate database adapter
 * 
 * Uses dynamic imports to avoid loading unavailable modules:
 * - better-sqlite3: Fast native SQLite, may not compile on all systems
 * - sql.js: WASM-based SQLite, works everywhere
 * 
 * @param config - Adapter configuration
 * @returns DatabaseAdapter instance
 */
export async function createAdapter(config: AdapterConfig): Promise<DatabaseAdapter> {
    const useSqlJs = shouldUseSqlJs() || config.forceSqlJs;

    if (useSqlJs) {
        console.log('[DB] Using sql.js adapter (production/fallback mode)');
        const { SqlJsAdapter } = await import('./sql-js.adapter.js');
        const adapter = new SqlJsAdapter(config);
        await adapter.init();
        return adapter;
    }

    // Try better-sqlite3 first (faster)
    console.log('[DB] Attempting better-sqlite3 adapter (development mode)');
    try {
        const { BetterSqlite3Adapter } = await import('./better-sqlite3.adapter.js');
        const adapter = new BetterSqlite3Adapter(config);
        await adapter.init();
        return adapter;
    } catch (error: any) {
        // Fallback to sql.js if better-sqlite3 fails
        console.warn('[DB] better-sqlite3 unavailable, using sql.js fallback');
        console.warn('[DB] Reason:', error.message);
        const { SqlJsAdapter } = await import('./sql-js.adapter.js');
        const adapter = new SqlJsAdapter(config);
        await adapter.init();
        return adapter;
    }
}

/**
 * Application-wide error codes
 */
export const ERROR_CODES = {
    // Circuit errors
    CIRCUIT_NOT_FOUND: 'CIRCUIT_NOT_FOUND',
    INVALID_CIRCUIT: 'INVALID_CIRCUIT',
    TOO_MANY_QUBITS: 'TOO_MANY_QUBITS',

    // Simulation errors
    SIMULATION_FAILED: 'SIMULATION_FAILED',
    INVALID_GATE: 'INVALID_GATE',
    INVALID_QUBIT_INDEX: 'INVALID_QUBIT_INDEX',

    // General errors
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    NOT_FOUND: 'NOT_FOUND',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Maximum number of qubits supported
 */
export const MAX_QUBITS = 12;

/**
 * Maximum shots for simulation
 */
export const MAX_SHOTS = 10000;

/**
 * Default shots for simulation
 */
export const DEFAULT_SHOTS = 1024;

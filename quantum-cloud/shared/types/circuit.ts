import { Gate } from './gate';

/**
 * Quantum circuit representation
 */
export interface Circuit {
    id: string;
    name: string;
    description?: string;
    numQubits: number;
    gates: Gate[];
    createdAt: string;
    updatedAt: string;
}

/**
 * Circuit creation request
 */
export interface CreateCircuitRequest {
    name: string;
    description?: string;
    numQubits: number;
    gates?: Gate[];
    qasm?: string;
}

/**
 * Simulation parameters
 */
export interface SimulationParams {
    circuitId: string;
    shots: number;         // Number of measurements (1-10000)
    includeStatevector?: boolean;
    noiseModel?: NoiseModel;
}

/**
 * Noise model configuration
 */
export interface NoiseModel {
    type: 'depolarizing' | 'bit_flip' | 'phase_flip' | 'amplitude_damping';
    probability: number;  // Error probability (0-1)
}

/**
 * Measurement result
 */
export interface MeasurementResult {
    state: string;        // Binary string e.g., "00", "01", "10", "11"
    count: number;        // Number of times measured
    probability: number;  // Measured probability
}

/**
 * Simulation result
 */
export interface SimulationResult {
    circuitId: string;
    shots: number;
    measurements: MeasurementResult[];
    statevector?: ComplexAmplitude[];
    executionTimeMs: number;
}

/**
 * Complex amplitude for state vector
 */
export interface ComplexAmplitude {
    state: string;    // Binary string
    real: number;     // Real part
    imag: number;     // Imaginary part
    probability: number;
    phase: number;    // Phase in radians
}

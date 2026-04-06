import { Complex, COMPLEX } from './complex';
import { GATES, Matrix2x2, createRx, createRy, createRz } from './gates';
import type { GateType } from '@shared/types/gate';

const { ZERO, ONE } = COMPLEX;

/**
 * Quantum state vector simulator.
 * Supports up to 12 qubits (2^12 = 4096 amplitudes).
 */
export class QuantumSimulator {
    private stateVector: Complex[];
    private numQubits: number;

    constructor(numQubits: number) {
        if (numQubits < 1 || numQubits > 12) {
            throw new Error('Number of qubits must be between 1 and 12');
        }
        this.numQubits = numQubits;
        this.stateVector = this.createInitialState();
    }

    /** Initialize to |00...0⟩ state */
    private createInitialState(): Complex[] {
        const size = 2 ** this.numQubits;
        const state = new Array(size).fill(ZERO);
        state[0] = ONE; // |00...0⟩ has amplitude 1
        return state;
    }

    /** Reset to |00...0⟩ state */
    reset(): void {
        this.stateVector = this.createInitialState();
    }

    /** Get current state vector (copy) */
    getStateVector(): Complex[] {
        return [...this.stateVector];
    }

    /** Get number of qubits */
    getNumQubits(): number {
        return this.numQubits;
    }

    /**
     * Apply a single-qubit gate to a target qubit.
     * Uses efficient in-place calculation without full tensor product.
     */
    applySingleQubitGate(gate: Matrix2x2, targetQubit: number): void {
        this.validateQubit(targetQubit);

        const size = 2 ** this.numQubits;
        const targetMask = 1 << targetQubit;

        // Process pairs of amplitudes
        for (let i = 0; i < size; i++) {
            if ((i & targetMask) === 0) {
                const j = i | targetMask;
                const amp0 = this.stateVector[i];
                const amp1 = this.stateVector[j];

                // Apply 2x2 gate matrix
                this.stateVector[i] = gate[0][0].multiply(amp0).add(gate[0][1].multiply(amp1));
                this.stateVector[j] = gate[1][0].multiply(amp0).add(gate[1][1].multiply(amp1));
            }
        }
    }

    /**
     * Apply a two-qubit gate (CNOT, CZ, SWAP).
     * Control and target must be different qubits.
     */
    applyTwoQubitGate(
        gateType: 'CNOT' | 'CZ' | 'SWAP',
        controlQubit: number,
        targetQubit: number
    ): void {
        this.validateQubit(controlQubit);
        this.validateQubit(targetQubit);

        if (controlQubit === targetQubit) {
            throw new Error('Control and target qubits must be different');
        }

        const size = 2 ** this.numQubits;
        const controlMask = 1 << controlQubit;
        const targetMask = 1 << targetQubit;

        // Process based on gate type
        for (let i = 0; i < size; i++) {
            if (gateType === 'CNOT') {
                // CNOT: Flip target if control is |1⟩
                if ((i & controlMask) !== 0 && (i & targetMask) === 0) {
                    const j = i | targetMask;
                    [this.stateVector[i], this.stateVector[j]] =
                        [this.stateVector[j], this.stateVector[i]];
                }
            } else if (gateType === 'CZ') {
                // CZ: Negate amplitude if both are |1⟩
                if ((i & controlMask) !== 0 && (i & targetMask) !== 0) {
                    this.stateVector[i] = this.stateVector[i].scale(-1);
                }
            } else if (gateType === 'SWAP') {
                // SWAP: Exchange amplitudes where qubits differ
                const controlBit = (i & controlMask) !== 0;
                const targetBit = (i & targetMask) !== 0;
                if (controlBit !== targetBit && !controlBit) {
                    const j = (i ^ controlMask) ^ targetMask;
                    [this.stateVector[i], this.stateVector[j]] =
                        [this.stateVector[j], this.stateVector[i]];
                }
            }
        }
    }

    /**
     * Apply a named gate to target qubit(s).
     */
    applyGate(
        gateType: GateType,
        targetQubit: number,
        controlQubit?: number,
        angle?: number
    ): void {
        // Rotation gates
        if (gateType === 'Rx' && angle !== undefined) {
            this.applySingleQubitGate(createRx(angle), targetQubit);
            return;
        }
        if (gateType === 'Ry' && angle !== undefined) {
            this.applySingleQubitGate(createRy(angle), targetQubit);
            return;
        }
        if (gateType === 'Rz' && angle !== undefined) {
            this.applySingleQubitGate(createRz(angle), targetQubit);
            return;
        }

        // Two-qubit gates
        if (gateType === 'CNOT' && controlQubit !== undefined) {
            this.applyTwoQubitGate('CNOT', controlQubit, targetQubit);
            return;
        }
        if (gateType === 'CZ' && controlQubit !== undefined) {
            this.applyTwoQubitGate('CZ', controlQubit, targetQubit);
            return;
        }
        if (gateType === 'SWAP' && controlQubit !== undefined) {
            this.applyTwoQubitGate('SWAP', controlQubit, targetQubit);
            return;
        }

        // Single-qubit gates
        const gateMatrix = GATES[gateType as keyof typeof GATES];
        if (!gateMatrix) {
            throw new Error(`Unknown gate type: ${gateType}`);
        }
        this.applySingleQubitGate(gateMatrix as Matrix2x2, targetQubit);
    }

    /**
     * Measure a single qubit, collapsing the state.
     * Returns 0 or 1 based on probability.
     */
    measure(qubit: number): 0 | 1 {
        this.validateQubit(qubit);

        const size = 2 ** this.numQubits;
        const qubitMask = 1 << qubit;

        // Calculate probability of measuring |1⟩
        let prob1 = 0;
        for (let i = 0; i < size; i++) {
            if ((i & qubitMask) !== 0) {
                prob1 += this.stateVector[i].magnitudeSquared();
            }
        }

        // Randomly choose outcome based on probability
        const outcome: 0 | 1 = Math.random() < prob1 ? 1 : 0;
        const normFactor = Math.sqrt(outcome === 1 ? prob1 : 1 - prob1);

        // Collapse state vector
        for (let i = 0; i < size; i++) {
            const bitValue = (i & qubitMask) !== 0 ? 1 : 0;
            if (bitValue === outcome) {
                this.stateVector[i] = this.stateVector[i].scale(1 / normFactor);
            } else {
                this.stateVector[i] = ZERO;
            }
        }

        return outcome;
    }

    /**
     * Measure all qubits, returning classical bit string.
     */
    measureAll(): string {
        const result: number[] = [];
        for (let q = this.numQubits - 1; q >= 0; q--) {
            result.push(this.measure(q));
        }
        return result.join('');
    }

    /**
     * Get probabilities for each basis state.
     */
    getProbabilities(): Map<string, number> {
        const probs = new Map<string, number>();
        const size = 2 ** this.numQubits;

        for (let i = 0; i < size; i++) {
            const prob = this.stateVector[i].magnitudeSquared();
            if (prob > 1e-10) {
                const binaryStr = i.toString(2).padStart(this.numQubits, '0');
                probs.set(binaryStr, prob);
            }
        }

        return probs;
    }

    /**
     * Run circuit multiple times, returning measurement counts.
     */
    sample(shots: number): Map<string, number> {
        const counts = new Map<string, number>();
        const originalState = [...this.stateVector];

        for (let i = 0; i < shots; i++) {
            // Restore original state
            this.stateVector = [...originalState];

            // Measure all qubits
            const result = this.measureAll();
            counts.set(result, (counts.get(result) || 0) + 1);
        }

        // Restore state
        this.stateVector = originalState;
        return counts;
    }

    private validateQubit(qubit: number): void {
        if (qubit < 0 || qubit >= this.numQubits) {
            throw new Error(`Invalid qubit index: ${qubit}. Must be 0-${this.numQubits - 1}`);
        }
    }
}

// ============================================================================
// TEST UTILITIES - Bell State Verification
// ============================================================================

/**
 * Create Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2
 * Used for testing simulator correctness.
 */
export function createBellState(): QuantumSimulator {
    const sim = new QuantumSimulator(2);
    sim.applyGate('H', 0);           // |0⟩ → (|0⟩+|1⟩)/√2
    sim.applyGate('CNOT', 1, 0);     // Entangle: (|00⟩+|11⟩)/√2
    return sim;
}

/**
 * Verify Bell state is correct.
 * Expected: |00⟩ and |11⟩ each with probability 0.5
 */
export function verifyBellState(sim: QuantumSimulator): boolean {
    const probs = sim.getProbabilities();
    const p00 = probs.get('00') || 0;
    const p11 = probs.get('11') || 0;

    return (
        Math.abs(p00 - 0.5) < 0.01 &&
        Math.abs(p11 - 0.5) < 0.01 &&
        probs.size === 2
    );
}

/**
 * Create GHZ state |GHZ⟩ = (|000⟩ + |111⟩)/√2
 */
export function createGHZState(numQubits = 3): QuantumSimulator {
    const sim = new QuantumSimulator(numQubits);
    sim.applyGate('H', 0);
    for (let i = 1; i < numQubits; i++) {
        sim.applyGate('CNOT', i, 0);
    }
    return sim;
}

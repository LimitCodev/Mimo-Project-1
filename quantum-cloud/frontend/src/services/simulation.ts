import { QuantumSimulator } from '@/lib/quantum/quantum-engine';
import { useCircuitStore, type PlacedGate, type SimulationResult } from '@/stores/circuitStore';
import type { GateType } from '@shared/types/gate';

/**
 * Run quantum simulation using the circuit gates
 */
export async function runSimulation(shots: number = 1024): Promise<SimulationResult> {
    const { gates, numQubits, setIsSimulating, setResults, setError } = useCircuitStore.getState();

    setIsSimulating(true);
    setError(null);

    const startTime = performance.now();

    try {
        // Create simulator
        const sim = new QuantumSimulator(numQubits);

        // Sort gates by column (time order)
        const sortedGates = [...gates].sort((a, b) => a.column - b.column);

        // Apply gates in order
        for (const gate of sortedGates) {
            applyGateToSimulator(sim, gate);
        }

        // Sample measurements
        const countsMap = sim.sample(shots);

        // Convert Map to Record
        const counts: Record<string, number> = {};
        const probabilities: Record<string, number> = {};

        countsMap.forEach((count, state) => {
            counts[state] = count;
            probabilities[state] = count / shots;
        });

        // Get state vector for visualization
        const probs = sim.getProbabilities();
        const stateVector = Array.from(probs.entries()).map(([state, prob]) => ({
            state,
            amplitude: `√${prob.toFixed(4)}`,
            probability: prob,
        }));

        const executionTimeMs = performance.now() - startTime;

        const result: SimulationResult = {
            counts,
            probabilities,
            shots,
            executionTimeMs: Math.round(executionTimeMs),
            stateVector,
        };

        setResults(result);
        setIsSimulating(false);

        return result;
    } catch (error: any) {
        setError(error.message || 'Simulation failed');
        setIsSimulating(false);
        throw error;
    }
}

/**
 * Apply a placed gate to the simulator
 */
function applyGateToSimulator(sim: QuantumSimulator, gate: PlacedGate): void {
    const { type, qubit, controlQubit, angle } = gate;

    // Two-qubit gates
    if (type === 'CNOT' && controlQubit !== undefined) {
        sim.applyGate('CNOT', qubit, controlQubit);
        return;
    }
    if (type === 'CZ' && controlQubit !== undefined) {
        sim.applyGate('CZ', qubit, controlQubit);
        return;
    }
    if (type === 'SWAP' && controlQubit !== undefined) {
        sim.applyGate('SWAP', qubit, controlQubit);
        return;
    }

    // Rotation gates
    if ((type === 'Rx' || type === 'Ry' || type === 'Rz') && angle !== undefined) {
        sim.applyGate(type, qubit, undefined, angle);
        return;
    }

    // Single-qubit gates
    sim.applyGate(type as GateType, qubit);
}

/**
 * Generate QASM code from circuit
 */
export function generateQASM(): string {
    const { gates, numQubits, name } = useCircuitStore.getState();

    const lines: string[] = [
        'OPENQASM 3.0;',
        `// ${name}`,
        `qubit[${numQubits}] q;`,
        '',
    ];

    // Sort gates by column
    const sortedGates = [...gates].sort((a, b) => a.column - b.column);

    for (const gate of sortedGates) {
        lines.push(gateToQASM(gate));
    }

    return lines.join('\n');
}

/**
 * Convert a gate to QASM instruction
 */
function gateToQASM(gate: PlacedGate): string {
    const { type, qubit, controlQubit, angle } = gate;

    switch (type) {
        case 'H':
            return `h q[${qubit}];`;
        case 'X':
            return `x q[${qubit}];`;
        case 'Y':
            return `y q[${qubit}];`;
        case 'Z':
            return `z q[${qubit}];`;
        case 'S':
            return `s q[${qubit}];`;
        case 'T':
            return `t q[${qubit}];`;
        case 'I':
            return `id q[${qubit}];`;
        case 'Rx':
            return `rx(${angle || 0}) q[${qubit}];`;
        case 'Ry':
            return `ry(${angle || 0}) q[${qubit}];`;
        case 'Rz':
            return `rz(${angle || 0}) q[${qubit}];`;
        case 'CNOT':
            return `cx q[${controlQubit}], q[${qubit}];`;
        case 'CZ':
            return `cz q[${controlQubit}], q[${qubit}];`;
        case 'SWAP':
            return `swap q[${qubit}], q[${controlQubit}];`;
        default:
            return `// Unknown gate: ${type}`;
    }
}

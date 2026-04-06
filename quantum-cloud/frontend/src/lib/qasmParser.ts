import type { GateType } from '@shared/types/gate';
import type { PlacedGate } from '@/stores/circuitStore';

interface ParsedCircuit {
    numQubits: number;
    gates: Omit<PlacedGate, 'id'>[];
}

/**
 * Parse QASM 3.0 code into circuit gates
 * Supports basic QASM instructions
 */
export function parseQASM(qasm: string): ParsedCircuit {
    const lines = qasm.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

    let numQubits = 2;
    const gates: Omit<PlacedGate, 'id'>[] = [];
    let column = 0;
    const qubitColumns: number[] = []; // Track last column used per qubit

    for (const line of lines) {
        // Skip headers
        if (line.startsWith('OPENQASM') || line.startsWith('include')) {
            continue;
        }

        // Parse qubit declaration
        const qubitMatch = line.match(/qubit\[(\d+)\]\s+\w+;/);
        if (qubitMatch) {
            numQubits = parseInt(qubitMatch[1], 10);
            for (let i = 0; i < numQubits; i++) {
                qubitColumns[i] = -1;
            }
            continue;
        }

        // Parse gate instructions
        const gateMatch = line.match(/^(\w+)(?:\(([^)]+)\))?\s+(.+);$/);
        if (!gateMatch) continue;

        const [, gateName, params, targets] = gateMatch;
        const angle = params ? parseFloat(params) : undefined;

        // Parse qubit indices
        const qubits = targets.match(/q\[(\d+)\]/g)?.map(q => parseInt(q.match(/\d+/)![0], 10)) || [];

        if (qubits.length === 0) continue;

        // Determine column (next free slot for all involved qubits)
        const maxCol = Math.max(...qubits.map(q => qubitColumns[q] ?? -1));
        const gateColumn = maxCol + 1;

        // Update column trackers
        for (const q of qubits) {
            qubitColumns[q] = gateColumn;
        }

        // Map QASM gate names to our GateTypes
        const gateType = mapGateName(gateName);
        if (!gateType) continue;

        if (qubits.length === 1) {
            // Single-qubit gate
            gates.push({
                type: gateType,
                qubit: qubits[0],
                column: gateColumn,
                angle: ['rx', 'ry', 'rz'].includes(gateName.toLowerCase()) ? angle : undefined,
            });
        } else if (qubits.length === 2) {
            // Two-qubit gate
            gates.push({
                type: gateType,
                qubit: qubits[1], // Target
                controlQubit: qubits[0], // Control
                column: gateColumn,
            });
        }
    }

    return { numQubits, gates };
}

/**
 * Map QASM gate names to GateType
 */
function mapGateName(name: string): GateType | null {
    const map: Record<string, GateType> = {
        'h': 'H',
        'x': 'X',
        'y': 'Y',
        'z': 'Z',
        's': 'S',
        't': 'T',
        'id': 'I',
        'rx': 'Rx',
        'ry': 'Ry',
        'rz': 'Rz',
        'cx': 'CNOT',
        'cnot': 'CNOT',
        'cz': 'CZ',
        'swap': 'SWAP',
    };

    return map[name.toLowerCase()] || null;
}

export default parseQASM;

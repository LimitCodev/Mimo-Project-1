/**
 * Quantum gate types and definitions
 */

export type GateType =
    | 'H'     // Hadamard
    | 'X'     // Pauli-X (NOT)
    | 'Y'     // Pauli-Y
    | 'Z'     // Pauli-Z
    | 'S'     // S gate (sqrt(Z))
    | 'T'     // T gate (sqrt(S))
    | 'Rx'    // X-axis rotation
    | 'Ry'    // Y-axis rotation
    | 'Rz'    // Z-axis rotation
    | 'CNOT' // Controlled-NOT
    | 'CZ'   // Controlled-Z
    | 'SWAP' // SWAP gate
    | 'TOFFOLI' // Toffoli (CCX)
    | 'I';   // Identity

export interface Gate {
    id: string;
    type: GateType;
    qubit: number;
    controlQubit?: number;   // For controlled gates
    controlQubit2?: number;  // For 3-qubit gates (Toffoli)
    angle?: number;          // For rotation gates (in radians)
    column: number;          // Position in circuit
}

export interface GateDefinition {
    type: GateType;
    name: string;
    symbol: string;
    description: string;
    numQubits: 1 | 2 | 3;
    hasAngle: boolean;
    category: 'basic' | 'phase' | 'rotation' | 'multi-qubit';
}

/**
 * Standard gate definitions
 */
export const GATE_DEFINITIONS: Record<GateType, GateDefinition> = {
    H: {
        type: 'H',
        name: 'Hadamard',
        symbol: 'H',
        description: 'Creates superposition: |0⟩ → (|0⟩+|1⟩)/√2',
        numQubits: 1,
        hasAngle: false,
        category: 'basic',
    },
    X: {
        type: 'X',
        name: 'Pauli-X',
        symbol: 'X',
        description: 'Bit flip (NOT gate): |0⟩ ↔ |1⟩',
        numQubits: 1,
        hasAngle: false,
        category: 'basic',
    },
    Y: {
        type: 'Y',
        name: 'Pauli-Y',
        symbol: 'Y',
        description: 'Rotation around Y-axis by π',
        numQubits: 1,
        hasAngle: false,
        category: 'basic',
    },
    Z: {
        type: 'Z',
        name: 'Pauli-Z',
        symbol: 'Z',
        description: 'Phase flip: |1⟩ → -|1⟩',
        numQubits: 1,
        hasAngle: false,
        category: 'basic',
    },
    S: {
        type: 'S',
        name: 'S Gate',
        symbol: 'S',
        description: 'Phase gate: π/2 phase shift',
        numQubits: 1,
        hasAngle: false,
        category: 'phase',
    },
    T: {
        type: 'T',
        name: 'T Gate',
        symbol: 'T',
        description: 'Phase gate: π/4 phase shift',
        numQubits: 1,
        hasAngle: false,
        category: 'phase',
    },
    Rx: {
        type: 'Rx',
        name: 'Rotation X',
        symbol: 'Rx',
        description: 'Rotation around X-axis by angle θ',
        numQubits: 1,
        hasAngle: true,
        category: 'rotation',
    },
    Ry: {
        type: 'Ry',
        name: 'Rotation Y',
        symbol: 'Ry',
        description: 'Rotation around Y-axis by angle θ',
        numQubits: 1,
        hasAngle: true,
        category: 'rotation',
    },
    Rz: {
        type: 'Rz',
        name: 'Rotation Z',
        symbol: 'Rz',
        description: 'Rotation around Z-axis by angle θ',
        numQubits: 1,
        hasAngle: true,
        category: 'rotation',
    },
    CNOT: {
        type: 'CNOT',
        name: 'Controlled-NOT',
        symbol: 'CX',
        description: 'Flips target if control is |1⟩',
        numQubits: 2,
        hasAngle: false,
        category: 'multi-qubit',
    },
    CZ: {
        type: 'CZ',
        name: 'Controlled-Z',
        symbol: 'CZ',
        description: 'Applies Z if control is |1⟩',
        numQubits: 2,
        hasAngle: false,
        category: 'multi-qubit',
    },
    SWAP: {
        type: 'SWAP',
        name: 'SWAP',
        symbol: '×',
        description: 'Swaps two qubits',
        numQubits: 2,
        hasAngle: false,
        category: 'multi-qubit',
    },
    TOFFOLI: {
        type: 'TOFFOLI',
        name: 'Toffoli',
        symbol: 'CCX',
        description: 'Flips target if both controls are |1⟩',
        numQubits: 3,
        hasAngle: false,
        category: 'multi-qubit',
    },
    I: {
        type: 'I',
        name: 'Identity',
        symbol: 'I',
        description: 'Identity (no operation)',
        numQubits: 1,
        hasAngle: false,
        category: 'basic',
    },
};

// Alias for backwards compatibility
export const GATE_INFO = GATE_DEFINITIONS;


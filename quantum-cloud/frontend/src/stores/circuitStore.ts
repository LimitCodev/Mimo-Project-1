import { create } from 'zustand';
import type { GateType } from '@shared/types/gate';

/**
 * Represents a gate placed on the circuit canvas
 */
export interface PlacedGate {
    id: string;
    type: GateType;
    qubit: number;           // Target qubit (0-indexed from top)
    controlQubit?: number;   // For CNOT, CZ, SWAP
    column: number;          // Time step (left to right)
    angle?: number;          // For rotation gates (Rx, Ry, Rz)
}

/**
 * Simulation results
 */
export interface SimulationResult {
    counts: Record<string, number>;
    probabilities: Record<string, number>;
    shots: number;
    executionTimeMs: number;
    stateVector?: { state: string; amplitude: string; probability: number }[];
}

/**
 * Circuit store state
 */
interface CircuitState {
    // Circuit configuration
    name: string;
    numQubits: number;
    gates: PlacedGate[];

    // UI state
    selectedGate: GateType | null;
    isDragging: boolean;

    // Simulation state
    isSimulating: boolean;
    results: SimulationResult | null;
    error: string | null;

    // Actions
    setName: (name: string) => void;
    setNumQubits: (n: number) => void;
    addGate: (gate: Omit<PlacedGate, 'id'>) => void;
    removeGate: (id: string) => void;
    updateGate: (id: string, updates: Partial<PlacedGate>) => void;
    clearCircuit: () => void;
    setSelectedGate: (gate: GateType | null) => void;
    setIsDragging: (dragging: boolean) => void;
    setResults: (results: SimulationResult | null) => void;
    setIsSimulating: (simulating: boolean) => void;
    setError: (error: string | null) => void;

    // Computed
    getCircuitDepth: () => number;
    getGatesAtQubit: (qubit: number) => PlacedGate[];
}

/**
 * Generate unique ID for gates
 */
function generateId(): string {
    return `gate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Circuit store - manages circuit state and simulation
 */
export const useCircuitStore = create<CircuitState>((set, get) => ({
    // Initial state
    name: 'New Circuit',
    numQubits: 2,
    gates: [],
    selectedGate: null,
    isDragging: false,
    isSimulating: false,
    results: null,
    error: null,

    // Actions
    setName: (name) => set({ name }),

    setNumQubits: (numQubits) => set((state) => {
        // Remove gates that are on qubits beyond the new limit
        const gates = state.gates.filter(
            (g) => g.qubit < numQubits && (!g.controlQubit || g.controlQubit < numQubits)
        );
        return { numQubits, gates };
    }),

    addGate: (gate) => set((state) => ({
        gates: [...state.gates, { ...gate, id: generateId() }],
        results: null, // Clear results when circuit changes
    })),

    removeGate: (id) => set((state) => ({
        gates: state.gates.filter((g) => g.id !== id),
        results: null,
    })),

    updateGate: (id, updates) => set((state) => ({
        gates: state.gates.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        results: null,
    })),

    clearCircuit: () => set({
        gates: [],
        results: null,
        error: null,
    }),

    setSelectedGate: (selectedGate) => set({ selectedGate }),
    setIsDragging: (isDragging) => set({ isDragging }),
    setResults: (results) => set({ results, error: null }),
    setIsSimulating: (isSimulating) => set({ isSimulating }),
    setError: (error) => set({ error, isSimulating: false }),

    // Computed
    getCircuitDepth: () => {
        const { gates } = get();
        if (gates.length === 0) return 0;
        return Math.max(...gates.map((g) => g.column)) + 1;
    },

    getGatesAtQubit: (qubit) => {
        const { gates } = get();
        return gates.filter((g) => g.qubit === qubit || g.controlQubit === qubit);
    },
}));

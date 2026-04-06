import { describe, it, expect } from 'vitest';
import { Complex, COMPLEX } from '../complex';
import { GATES, isUnitary, createRx, createRy, createRz } from '../gates';
import { QuantumSimulator, createBellState, verifyBellState, createGHZState } from '../quantum-engine';

describe('Complex', () => {
    it('should add complex numbers correctly', () => {
        const a = new Complex(1, 2);
        const b = new Complex(3, 4);
        const result = a.add(b);
        expect(result.real).toBe(4);
        expect(result.imag).toBe(6);
    });

    it('should multiply complex numbers correctly', () => {
        const a = new Complex(1, 2);
        const b = new Complex(3, 4);
        const result = a.multiply(b);
        // (1+2i)(3+4i) = 3+4i+6i+8i² = 3+10i-8 = -5+10i
        expect(result.real).toBe(-5);
        expect(result.imag).toBe(10);
    });

    it('should calculate magnitude correctly', () => {
        const c = new Complex(3, 4);
        expect(c.magnitude()).toBe(5);
    });

    it('should compute conjugate correctly', () => {
        const c = new Complex(3, 4);
        const conj = c.conjugate();
        expect(conj.real).toBe(3);
        expect(conj.imag).toBe(-4);
    });
});

describe('Gates', () => {
    it('should verify all standard gates are unitary', () => {
        expect(isUnitary(GATES.I)).toBe(true);
        expect(isUnitary(GATES.H)).toBe(true);
        expect(isUnitary(GATES.X)).toBe(true);
        expect(isUnitary(GATES.Y)).toBe(true);
        expect(isUnitary(GATES.Z)).toBe(true);
        expect(isUnitary(GATES.S)).toBe(true);
        expect(isUnitary(GATES.T)).toBe(true);
        expect(isUnitary(GATES.SX)).toBe(true);
    });

    it('should verify rotation gates are unitary', () => {
        expect(isUnitary(createRx(Math.PI / 4))).toBe(true);
        expect(isUnitary(createRy(Math.PI / 3))).toBe(true);
        expect(isUnitary(createRz(Math.PI / 2))).toBe(true);
    });

    it('should verify X gate is self-inverse', () => {
        const sim = new QuantumSimulator(1);
        sim.applyGate('X', 0);
        sim.applyGate('X', 0);
        const probs = sim.getProbabilities();
        expect(probs.get('0')).toBeCloseTo(1, 5);
    });

    it('should verify HZH = X', () => {
        const sim = new QuantumSimulator(1);
        sim.applyGate('H', 0);
        sim.applyGate('Z', 0);
        sim.applyGate('H', 0);
        const probs = sim.getProbabilities();
        // After HZH on |0⟩, should get |1⟩
        expect(probs.get('1')).toBeCloseTo(1, 5);
    });
});

describe('QuantumSimulator', () => {
    it('should initialize to |0⟩ state for single qubit', () => {
        const sim = new QuantumSimulator(1);
        const probs = sim.getProbabilities();
        expect(probs.get('0')).toBe(1);
    });

    it('should initialize to |00⟩ state for two qubits', () => {
        const sim = new QuantumSimulator(2);
        const probs = sim.getProbabilities();
        expect(probs.get('00')).toBe(1);
    });

    it('should create superposition with Hadamard', () => {
        const sim = new QuantumSimulator(1);
        sim.applyGate('H', 0);
        const probs = sim.getProbabilities();
        expect(probs.get('0')).toBeCloseTo(0.5, 5);
        expect(probs.get('1')).toBeCloseTo(0.5, 5);
    });

    it('should flip qubit with X gate', () => {
        const sim = new QuantumSimulator(1);
        sim.applyGate('X', 0);
        const probs = sim.getProbabilities();
        expect(probs.get('1')).toBe(1);
    });
});

describe('Bell State', () => {
    it('should create valid Bell state', () => {
        const sim = createBellState();
        expect(verifyBellState(sim)).toBe(true);
    });

    it('should have correlated measurement outcomes', () => {
        const sim = createBellState();
        const counts = sim.sample(1000);

        // Only |00⟩ and |11⟩ should appear
        for (const [state, count] of counts) {
            expect(['00', '11']).toContain(state);
        }

        // Both should appear roughly 50% each
        const p00 = (counts.get('00') || 0) / 1000;
        const p11 = (counts.get('11') || 0) / 1000;
        expect(p00).toBeGreaterThan(0.4);
        expect(p11).toBeGreaterThan(0.4);
    });
});

describe('GHZ State', () => {
    it('should create valid 3-qubit GHZ state', () => {
        const sim = createGHZState(3);
        const probs = sim.getProbabilities();

        expect(probs.get('000')).toBeCloseTo(0.5, 5);
        expect(probs.get('111')).toBeCloseTo(0.5, 5);
        expect(probs.size).toBe(2);
    });
});

describe('Two-qubit gates', () => {
    it('should apply CNOT correctly', () => {
        const sim = new QuantumSimulator(2);
        sim.applyGate('X', 0);  // |00⟩ → |01⟩
        sim.applyGate('CNOT', 1, 0);  // |01⟩ → |11⟩
        const probs = sim.getProbabilities();
        expect(probs.get('11')).toBeCloseTo(1, 5);
    });

    it('should apply SWAP correctly', () => {
        const sim = new QuantumSimulator(2);
        sim.applyGate('X', 0);  // |00⟩ → |01⟩
        sim.applyGate('SWAP', 1, 0);  // |01⟩ → |10⟩
        const probs = sim.getProbabilities();
        expect(probs.get('10')).toBeCloseTo(1, 5);
    });

    it('should apply CZ correctly', () => {
        const sim = new QuantumSimulator(2);
        sim.applyGate('X', 0);
        sim.applyGate('X', 1);  // |00⟩ → |11⟩
        sim.applyGate('H', 1);
        sim.applyGate('CZ', 1, 0);
        sim.applyGate('H', 1);  // CZ with H is equivalent to CNOT
        const probs = sim.getProbabilities();
        expect(probs.get('01')).toBeCloseTo(1, 5);
    });
});

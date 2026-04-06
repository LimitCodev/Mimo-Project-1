import { Complex, COMPLEX } from './complex';

/**
 * 2x2 Matrix type for single-qubit gate operations.
 * Structure: [[a, b], [c, d]] represents matrix:
 * | a  b |
 * | c  d |
 */
export type Matrix2x2 = [[Complex, Complex], [Complex, Complex]];

/**
 * 4x4 Matrix type for two-qubit gate operations.
 */
export type Matrix4x4 = [
    [Complex, Complex, Complex, Complex],
    [Complex, Complex, Complex, Complex],
    [Complex, Complex, Complex, Complex],
    [Complex, Complex, Complex, Complex]
];

const { ZERO, ONE, I, MINUS_I, SQRT2_INV } = COMPLEX;

/**
 * Standard quantum gate matrices.
 * All gates are unitary: U†U = I
 */
export const GATES = {
    /**
     * Identity gate (no operation)
     * | 1  0 |
     * | 0  1 |
     */
    I: [
        [ONE, ZERO],
        [ZERO, ONE],
    ] as Matrix2x2,

    /**
     * Hadamard gate - creates superposition
     * (1/√2) | 1   1 |
     *        | 1  -1 |
     */
    H: [
        [SQRT2_INV, SQRT2_INV],
        [SQRT2_INV, SQRT2_INV.scale(-1)],
    ] as Matrix2x2,

    /**
     * Pauli-X gate (NOT gate) - bit flip
     * | 0  1 |
     * | 1  0 |
     */
    X: [
        [ZERO, ONE],
        [ONE, ZERO],
    ] as Matrix2x2,

    /**
     * Pauli-Y gate
     * | 0  -i |
     * | i   0 |
     */
    Y: [
        [ZERO, MINUS_I],
        [I, ZERO],
    ] as Matrix2x2,

    /**
     * Pauli-Z gate - phase flip
     * | 1   0 |
     * | 0  -1 |
     */
    Z: [
        [ONE, ZERO],
        [ZERO, ONE.scale(-1)],
    ] as Matrix2x2,

    /**
     * S gate (√Z) - π/2 phase
     * | 1  0 |
     * | 0  i |
     */
    S: [
        [ONE, ZERO],
        [ZERO, I],
    ] as Matrix2x2,

    /**
     * T gate (√S) - π/4 phase
     * | 1  0       |
     * | 0  e^(iπ/4)|
     */
    T: [
        [ONE, ZERO],
        [ZERO, Complex.fromPolar(1, Math.PI / 4)],
    ] as Matrix2x2,

    /**
     * S† (S-dagger) gate - inverse of S
     * | 1   0 |
     * | 0  -i |
     */
    SDG: [
        [ONE, ZERO],
        [ZERO, MINUS_I],
    ] as Matrix2x2,

    /**
     * T† (T-dagger) gate - inverse of T
     * | 1  0        |
     * | 0  e^(-iπ/4)|
     */
    TDG: [
        [ONE, ZERO],
        [ZERO, Complex.fromPolar(1, -Math.PI / 4)],
    ] as Matrix2x2,

    /**
     * Square root of X gate (√X)
     * (1/2) | 1+i  1-i |
     *       | 1-i  1+i |
     */
    SX: [
        [new Complex(0.5, 0.5), new Complex(0.5, -0.5)],
        [new Complex(0.5, -0.5), new Complex(0.5, 0.5)],
    ] as Matrix2x2,
} as const;

/**
 * Create rotation gate around X-axis: Rx(θ)
 * | cos(θ/2)    -i*sin(θ/2) |
 * | -i*sin(θ/2)  cos(θ/2)   |
 */
export function createRx(theta: number): Matrix2x2 {
    const cos = new Complex(Math.cos(theta / 2), 0);
    const sin = new Complex(0, -Math.sin(theta / 2));
    return [
        [cos, sin],
        [sin, cos],
    ];
}

/**
 * Create rotation gate around Y-axis: Ry(θ)
 * | cos(θ/2)  -sin(θ/2) |
 * | sin(θ/2)   cos(θ/2) |
 */
export function createRy(theta: number): Matrix2x2 {
    const cos = new Complex(Math.cos(theta / 2), 0);
    const sinPos = new Complex(Math.sin(theta / 2), 0);
    const sinNeg = new Complex(-Math.sin(theta / 2), 0);
    return [
        [cos, sinNeg],
        [sinPos, cos],
    ];
}

/**
 * Create rotation gate around Z-axis: Rz(θ)
 * | e^(-iθ/2)  0        |
 * | 0          e^(iθ/2) |
 */
export function createRz(theta: number): Matrix2x2 {
    return [
        [Complex.fromPolar(1, -theta / 2), ZERO],
        [ZERO, Complex.fromPolar(1, theta / 2)],
    ];
}

/**
 * Create phase gate: P(θ)
 * | 1  0      |
 * | 0  e^(iθ) |
 */
export function createPhase(theta: number): Matrix2x2 {
    return [
        [ONE, ZERO],
        [ZERO, Complex.fromPolar(1, theta)],
    ];
}

/**
 * CNOT gate (Controlled-NOT) - 4x4 matrix
 * Flips target qubit if control is |1⟩
 * | 1 0 0 0 |
 * | 0 1 0 0 |
 * | 0 0 0 1 |
 * | 0 0 1 0 |
 */
export const CNOT: Matrix4x4 = [
    [ONE, ZERO, ZERO, ZERO],
    [ZERO, ONE, ZERO, ZERO],
    [ZERO, ZERO, ZERO, ONE],
    [ZERO, ZERO, ONE, ZERO],
];

/**
 * CZ gate (Controlled-Z) - 4x4 matrix
 * | 1  0  0  0 |
 * | 0  1  0  0 |
 * | 0  0  1  0 |
 * | 0  0  0 -1 |
 */
export const CZ: Matrix4x4 = [
    [ONE, ZERO, ZERO, ZERO],
    [ZERO, ONE, ZERO, ZERO],
    [ZERO, ZERO, ONE, ZERO],
    [ZERO, ZERO, ZERO, ONE.scale(-1)],
];

/**
 * SWAP gate - 4x4 matrix
 * | 1 0 0 0 |
 * | 0 0 1 0 |
 * | 0 1 0 0 |
 * | 0 0 0 1 |
 */
export const SWAP: Matrix4x4 = [
    [ONE, ZERO, ZERO, ZERO],
    [ZERO, ZERO, ONE, ZERO],
    [ZERO, ONE, ZERO, ZERO],
    [ZERO, ZERO, ZERO, ONE],
];

/**
 * iSWAP gate - 4x4 matrix
 * | 1 0 0 0 |
 * | 0 0 i 0 |
 * | 0 i 0 0 |
 * | 0 0 0 1 |
 */
export const ISWAP: Matrix4x4 = [
    [ONE, ZERO, ZERO, ZERO],
    [ZERO, ZERO, I, ZERO],
    [ZERO, I, ZERO, ZERO],
    [ZERO, ZERO, ZERO, ONE],
];

/**
 * Verify that a matrix is unitary (U†U = I).
 * Used for testing gate correctness.
 */
export function isUnitary(matrix: Matrix2x2, epsilon = 1e-10): boolean {
    // Compute U† (conjugate transpose)
    const adjoint: Matrix2x2 = [
        [matrix[0][0].conjugate(), matrix[1][0].conjugate()],
        [matrix[0][1].conjugate(), matrix[1][1].conjugate()],
    ];

    // Compute U†U
    const product: Matrix2x2 = [
        [
            adjoint[0][0].multiply(matrix[0][0]).add(adjoint[0][1].multiply(matrix[1][0])),
            adjoint[0][0].multiply(matrix[0][1]).add(adjoint[0][1].multiply(matrix[1][1])),
        ],
        [
            adjoint[1][0].multiply(matrix[0][0]).add(adjoint[1][1].multiply(matrix[1][0])),
            adjoint[1][0].multiply(matrix[0][1]).add(adjoint[1][1].multiply(matrix[1][1])),
        ],
    ];

    // Check if result is identity matrix
    return (
        product[0][0].equals(ONE, epsilon) &&
        product[0][1].equals(ZERO, epsilon) &&
        product[1][0].equals(ZERO, epsilon) &&
        product[1][1].equals(ONE, epsilon)
    );
}

/**
 * Complex number class for quantum state calculations.
 * Supports all operations needed for quantum gate application.
 */
export class Complex {
    constructor(
        public readonly real: number,
        public readonly imag: number
    ) { }

    /** Create complex number from polar form (r * e^(i*θ)) */
    static fromPolar(r: number, theta: number): Complex {
        return new Complex(
            r * Math.cos(theta),
            r * Math.sin(theta)
        );
    }

    /** Zero complex number */
    static zero(): Complex {
        return new Complex(0, 0);
    }

    /** One (real unit) */
    static one(): Complex {
        return new Complex(1, 0);
    }

    /** Imaginary unit i */
    static i(): Complex {
        return new Complex(0, 1);
    }

    /** Add two complex numbers */
    add(other: Complex): Complex {
        return new Complex(
            this.real + other.real,
            this.imag + other.imag
        );
    }

    /** Subtract two complex numbers */
    subtract(other: Complex): Complex {
        return new Complex(
            this.real - other.real,
            this.imag - other.imag
        );
    }

    /** Multiply two complex numbers */
    multiply(other: Complex): Complex {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }

    /** Multiply by a scalar */
    scale(scalar: number): Complex {
        return new Complex(this.real * scalar, this.imag * scalar);
    }

    /** Complex conjugate (a + bi → a - bi) */
    conjugate(): Complex {
        return new Complex(this.real, -this.imag);
    }

    /** Magnitude |z| = sqrt(a² + b²) */
    magnitude(): number {
        return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }

    /** Magnitude squared |z|² = a² + b² (probability) */
    magnitudeSquared(): number {
        return this.real ** 2 + this.imag ** 2;
    }

    /** Phase angle θ = atan2(b, a) */
    phase(): number {
        return Math.atan2(this.imag, this.real);
    }

    /** Divide by another complex number */
    divide(other: Complex): Complex {
        const denominator = other.magnitudeSquared();
        if (denominator === 0) {
            throw new Error('Division by zero');
        }
        return new Complex(
            (this.real * other.real + this.imag * other.imag) / denominator,
            (this.imag * other.real - this.real * other.imag) / denominator
        );
    }

    /** Check if approximately equal (for floating point comparisons) */
    equals(other: Complex, epsilon = 1e-10): boolean {
        return (
            Math.abs(this.real - other.real) < epsilon &&
            Math.abs(this.imag - other.imag) < epsilon
        );
    }

    /** String representation */
    toString(): string {
        if (this.imag === 0) return `${this.real}`;
        if (this.real === 0) return `${this.imag}i`;
        const sign = this.imag >= 0 ? '+' : '-';
        return `${this.real}${sign}${Math.abs(this.imag)}i`;
    }

    /** Format for display (rounded) */
    toFixed(digits = 3): string {
        const r = this.real.toFixed(digits);
        const i = Math.abs(this.imag).toFixed(digits);
        if (Math.abs(this.imag) < 1e-10) return r;
        if (Math.abs(this.real) < 1e-10) {
            return this.imag >= 0 ? `${i}i` : `-${i}i`;
        }
        const sign = this.imag >= 0 ? '+' : '-';
        return `${r}${sign}${i}i`;
    }
}

/** Common complex number constants */
export const COMPLEX = {
    ZERO: Complex.zero(),
    ONE: Complex.one(),
    I: Complex.i(),
    MINUS_I: new Complex(0, -1),
    HALF: new Complex(0.5, 0),
    SQRT2_INV: new Complex(1 / Math.sqrt(2), 0),
} as const;

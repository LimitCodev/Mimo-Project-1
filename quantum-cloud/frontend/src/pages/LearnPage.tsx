import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import './LearnPage.css';

interface Section {
  id: string;
  title: { en: string; es: string };
  icon: string;
  content: { en: string; es: string };
}

const SECTIONS: Section[] = [
  {
    id: 'intro',
    title: { en: 'Introduction to Quantum Computing', es: 'Introducción a la Computación Cuántica' },
    icon: '🌟',
    content: {
      en: `
# Introduction to Quantum Computing

## What is a Qubit?

A **qubit** (quantum bit) is the fundamental unit of quantum information. Unlike a classical bit which can only be 0 or 1, a qubit can exist in a **superposition** of both states:

**|ψ⟩ = α|0⟩ + β|1⟩**

where α and β are complex numbers called **amplitudes**, and |α|² + |β|² = 1.

## Key Concepts

### Superposition
A qubit can be in multiple states simultaneously until measured. This is what gives quantum computers their power.

### Entanglement
Two or more qubits can be correlated in ways impossible classically. When you measure one entangled qubit, you instantly know the state of the other - no matter how far apart they are!

### Measurement
Observing a qubit collapses its superposition to a definite state (0 or 1). The probability of each outcome depends on the amplitudes.

### Quantum Interference
Quantum states can interfere constructively (amplifying probabilities) or destructively (canceling them out). This is the key to quantum algorithm speedups.
      `,
      es: `
# Introducción a la Computación Cuántica

## ¿Qué es un Qubit?

Un **qubit** (bit cuántico) es la unidad fundamental de información cuántica. A diferencia de un bit clásico que solo puede ser 0 o 1, un qubit puede existir en una **superposición** de ambos estados:

**|ψ⟩ = α|0⟩ + β|1⟩**

donde α y β son números complejos llamados **amplitudes**, y |α|² + |β|² = 1.

## Conceptos Clave

### Superposición
Un qubit puede estar en múltiples estados simultáneamente hasta ser medido. Esto es lo que da poder a las computadoras cuánticas.

### Entrelazamiento
Dos o más qubits pueden estar correlacionados de formas imposibles clásicamente. ¡Cuando mides un qubit entrelazado, instantáneamente conoces el estado del otro - sin importar qué tan lejos estén!

### Medición
Observar un qubit colapsa su superposición a un estado definido (0 o 1). La probabilidad de cada resultado depende de las amplitudes.

### Interferencia Cuántica
Los estados cuánticos pueden interferir constructivamente (amplificando probabilidades) o destructivamente (cancelándolas). Esta es la clave de la aceleración de los algoritmos cuánticos.
      `,
    },
  },
  {
    id: 'single-gates',
    title: { en: 'Single-Qubit Gates', es: 'Compuertas de Un Qubit' },
    icon: '🎛️',
    content: {
      en: `
# Single-Qubit Gates

Single-qubit gates transform the state of one qubit. They are represented by 2×2 unitary matrices.

## Hadamard Gate (H)

The most important gate! Creates superposition from a basis state.

**Matrix:** H = (1/√2) × [[1, 1], [1, -1]]

**Effect:**
- H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩ (equal superposition)
- H|1⟩ = (|0⟩ - |1⟩)/√2 = |-⟩

**Try it:** Add an H gate to qubit 0 and run!

## Pauli Gates (X, Y, Z)

### X Gate (NOT / Bit-flip)
Flips |0⟩ ↔ |1⟩ (like classical NOT)

### Y Gate
Combines bit-flip and phase-flip

### Z Gate (Phase-flip)
Adds a phase of -1 to |1⟩ (no visible effect on measurement probabilities alone)

## Phase Gates (S, T)

### S Gate (√Z)
Quarter turn around Z-axis. S² = Z

### T Gate (√S)
Eighth turn around Z-axis. T² = S

Essential for fault-tolerant quantum computing!

## Rotation Gates (Rx, Ry, Rz)

Rotate the qubit state by angle θ around the X, Y, or Z axis of the Bloch sphere.
      `,
      es: `
# Compuertas de Un Qubit

Las compuertas de un qubit transforman el estado de un qubit. Se representan como matrices unitarias de 2×2.

## Compuerta Hadamard (H)

¡La compuerta más importante! Crea superposición desde un estado base.

**Matriz:** H = (1/√2) × [[1, 1], [1, -1]]

**Efecto:**
- H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩ (superposición igual)
- H|1⟩ = (|0⟩ - |1⟩)/√2 = |-⟩

**¡Pruébalo!** Agrega una compuerta H al qubit 0 y ejecuta.

## Compuertas de Pauli (X, Y, Z)

### Compuerta X (NOT / Inversión de bit)
Invierte |0⟩ ↔ |1⟩ (como NOT clásico)

### Compuerta Y
Combina inversión de bit e inversión de fase

### Compuerta Z (Inversión de fase)
Agrega una fase de -1 a |1⟩

## Compuertas de Fase (S, T)

### Compuerta S (√Z)
Cuarto de vuelta alrededor del eje Z. S² = Z

### Compuerta T (√S)
Octavo de vuelta alrededor del eje Z. T² = S

¡Esencial para computación cuántica tolerante a fallas!

## Compuertas de Rotación (Rx, Ry, Rz)

Rotan el estado del qubit un ángulo θ alrededor del eje X, Y o Z de la esfera de Bloch.
      `,
    },
  },
  {
    id: 'multi-gates',
    title: { en: 'Multi-Qubit Gates', es: 'Compuertas Multi-Qubit' },
    icon: '🔗',
    content: {
      en: `
# Multi-Qubit Gates

Multi-qubit gates act on two or more qubits and can create **entanglement** - the "spooky action at a distance" Einstein talked about.

## CNOT Gate (Controlled-X)

The most important two-qubit gate! Flips the **target** qubit if the **control** qubit is |1⟩.

**Truth table:**
| Input | Output |
|-------|--------|
| |00⟩ | |00⟩ |
| |01⟩ | |01⟩ |
| |10⟩ | |11⟩ ✓ |
| |11⟩ | |10⟩ ✓ |

**Usage:** Essential for creating entanglement!

## Creating a Bell State

The simplest entangled state:

1. Start with |00⟩
2. Apply H to qubit 0 → (|0⟩+|1⟩)/√2 ⊗ |0⟩
3. Apply CNOT(0,1) → (|00⟩+|11⟩)/√2

Now measuring qubit 0 instantly determines qubit 1!

## CZ Gate (Controlled-Z)

Applies Z gate to target if control is |1⟩. Adds a -1 phase to |11⟩.

## SWAP Gate

Exchanges the states of two qubits:
- |01⟩ ↔ |10⟩
      `,
      es: `
# Compuertas Multi-Qubit

Las compuertas multi-qubit actúan sobre dos o más qubits y pueden crear **entrelazamiento** - la "acción espeluznante a distancia" de la que habló Einstein.

## Compuerta CNOT (X Controlada)

¡La compuerta de dos qubits más importante! Invierte el qubit **objetivo** si el qubit de **control** es |1⟩.

**Tabla de verdad:**
| Entrada | Salida |
|---------|--------|
| |00⟩ | |00⟩ |
| |01⟩ | |01⟩ |
| |10⟩ | |11⟩ ✓ |
| |11⟩ | |10⟩ ✓ |

**Uso:** ¡Esencial para crear entrelazamiento!

## Creando un Estado de Bell

El estado entrelazado más simple:

1. Comienza con |00⟩
2. Aplica H al qubit 0 → (|0⟩+|1⟩)/√2 ⊗ |0⟩
3. Aplica CNOT(0,1) → (|00⟩+|11⟩)/√2

¡Ahora medir el qubit 0 determina instantáneamente el qubit 1!

## Compuerta CZ (Z Controlada)

Aplica la compuerta Z al objetivo si el control es |1⟩. Agrega una fase -1 a |11⟩.

## Compuerta SWAP

Intercambia los estados de dos qubits:
- |01⟩ ↔ |10⟩
      `,
    },
  },
  {
    id: 'algorithms',
    title: { en: 'Quantum Algorithms', es: 'Algoritmos Cuánticos' },
    icon: '🧮',
    content: {
      en: `
# Quantum Algorithms

## Grover's Search Algorithm

**Problem:** Find a marked item in an unsorted database of N items.

**Classical:** O(N) queries - check every item
**Quantum:** O(√N) queries - quadratic speedup!

**How it works:**
1. Create superposition of all N states with Hadamard
2. Apply "oracle" that marks the target with a phase flip
3. Apply "diffusion" operator that amplifies marked state
4. Repeat √N times
5. Measure to find target with high probability

**Real-world impact:** Faster search, optimization problems, SAT solving.

## Shor's Algorithm

**Problem:** Factor large numbers (e.g., find p and q given N = p × q)

**Classical:** Exponential time - the basis of RSA encryption
**Quantum:** Polynomial time - breaks RSA!

**Why it matters:**
- RSA-2048 would take classical computers millions of years
- Shor's algorithm could do it in hours (with a large enough quantum computer)
- This is why "quantum-safe" cryptography is being developed

**How it works:**
1. Convert factoring to period-finding problem
2. Use Quantum Fourier Transform to find the period
3. Use classical algorithms to extract factors

**Current state:** Largest number factored: 21 = 3 × 7 (limited by qubit count)

## Deutsch-Jozsa Algorithm

**Problem:** Is function f(x) constant or balanced?

**Classical:** 2^(n-1) + 1 queries (worst case)
**Quantum:** 1 query - exponential speedup!

First algorithm to show quantum advantage.

## Quantum Teleportation

**Goal:** Transfer quantum state |ψ⟩ from Alice to Bob

**Requirements:**
- Pre-shared entanglement (Bell pair)
- 2 classical bits of communication

**Note:** Doesn't violate no-cloning or faster-than-light - original state is destroyed!
      `,
      es: `
# Algoritmos Cuánticos

## Algoritmo de Búsqueda de Grover

**Problema:** Encontrar un elemento marcado en una base de datos desordenada de N elementos.

**Clásico:** O(N) consultas - revisar cada elemento
**Cuántico:** O(√N) consultas - ¡aceleración cuadrática!

**Cómo funciona:**
1. Crear superposición de todos los N estados con Hadamard
2. Aplicar "oráculo" que marca el objetivo con inversión de fase
3. Aplicar operador de "difusión" que amplifica el estado marcado
4. Repetir √N veces
5. Medir para encontrar el objetivo con alta probabilidad

**Impacto real:** Búsqueda más rápida, problemas de optimización, resolución de SAT.

## Algoritmo de Shor

**Problema:** Factorizar números grandes (ej: encontrar p y q dado N = p × q)

**Clásico:** Tiempo exponencial - la base del cifrado RSA
**Cuántico:** Tiempo polinomial - ¡rompe RSA!

**Por qué importa:**
- RSA-2048 tomaría millones de años a computadoras clásicas
- El algoritmo de Shor podría hacerlo en horas (con suficientes qubits)
- Por esto se está desarrollando criptografía "quantum-safe"

**Cómo funciona:**
1. Convertir factorización en problema de búsqueda de período
2. Usar Transformada de Fourier Cuántica para encontrar el período
3. Usar algoritmos clásicos para extraer factores

**Estado actual:** Mayor número factorizado: 21 = 3 × 7 (limitado por cantidad de qubits)

## Algoritmo de Deutsch-Jozsa

**Problema:** ¿Es la función f(x) constante o balanceada?

**Clásico:** 2^(n-1) + 1 consultas (peor caso)
**Cuántico:** 1 consulta - ¡aceleración exponencial!

Primer algoritmo en demostrar ventaja cuántica.

## Teletransportación Cuántica

**Objetivo:** Transferir estado cuántico |ψ⟩ de Alice a Bob

**Requisitos:**
- Entrelazamiento pre-compartido (par de Bell)
- 2 bits clásicos de comunicación

**Nota:** ¡No viola no-clonación ni más-rápido-que-la-luz - el estado original se destruye!
      `,
    },
  },
  {
    id: 'math',
    title: { en: 'Mathematical Foundations', es: 'Fundamentos Matemáticos' },
    icon: '📐',
    content: {
      en: `
# Mathematical Foundations

## Complex Numbers

Quantum amplitudes are complex numbers: α = a + bi

**Why complex?** Because quantum mechanics requires phases, and complex numbers naturally encode both magnitude and phase.

**Key operations:**
- Conjugate: (a + bi)* = a - bi
- Magnitude: |α|² = α*α = a² + b² (this gives probability!)
- Euler's formula: e^(iθ) = cos(θ) + i·sin(θ)

## Matrix Representation

Quantum states are column vectors:
- |0⟩ = [1, 0]ᵀ
- |1⟩ = [0, 1]ᵀ
- |+⟩ = [1/√2, 1/√2]ᵀ

Gates are unitary matrices that transform states.

## Tensor Products

Multi-qubit states use tensor products (⊗):

|00⟩ = |0⟩ ⊗ |0⟩ = [1, 0, 0, 0]ᵀ
|01⟩ = |0⟩ ⊗ |1⟩ = [0, 1, 0, 0]ᵀ
|10⟩ = |1⟩ ⊗ |0⟩ = [0, 0, 1, 0]ᵀ
|11⟩ = |1⟩ ⊗ |1⟩ = [0, 0, 0, 1]ᵀ

State space grows exponentially: n qubits = 2ⁿ amplitudes!

## Unitarity

Quantum gates MUST be unitary: U†U = UU† = I

This ensures:
- **Reversibility:** Every quantum operation can be undone
- **Probability conservation:** |α|² + |β|² = 1 always holds
- **No information loss:** Quantum computing is reversible

## Born Rule (Measurement)

Probability of measuring state |k⟩: P(k) = |⟨k|ψ⟩|²

After measurement, state **collapses** to the measured outcome.
      `,
      es: `
# Fundamentos Matemáticos

## Números Complejos

Las amplitudes cuánticas son números complejos: α = a + bi

**¿Por qué complejos?** Porque la mecánica cuántica requiere fases, y los números complejos codifican naturalmente magnitud y fase.

**Operaciones clave:**
- Conjugado: (a + bi)* = a - bi
- Magnitud: |α|² = α*α = a² + b² (¡esto da la probabilidad!)
- Fórmula de Euler: e^(iθ) = cos(θ) + i·sin(θ)

## Representación Matricial

Los estados cuánticos son vectores columna:
- |0⟩ = [1, 0]ᵀ
- |1⟩ = [0, 1]ᵀ
- |+⟩ = [1/√2, 1/√2]ᵀ

Las compuertas son matrices unitarias que transforman estados.

## Productos Tensoriales

Los estados multi-qubit usan productos tensoriales (⊗):

|00⟩ = |0⟩ ⊗ |0⟩ = [1, 0, 0, 0]ᵀ
|01⟩ = |0⟩ ⊗ |1⟩ = [0, 1, 0, 0]ᵀ
|10⟩ = |1⟩ ⊗ |0⟩ = [0, 0, 1, 0]ᵀ
|11⟩ = |1⟩ ⊗ |1⟩ = [0, 0, 0, 1]ᵀ

¡El espacio de estados crece exponencialmente: n qubits = 2ⁿ amplitudes!

## Unitariedad

Las compuertas cuánticas DEBEN ser unitarias: U†U = UU† = I

Esto asegura:
- **Reversibilidad:** Toda operación cuántica se puede deshacer
- **Conservación de probabilidad:** |α|² + |β|² = 1 siempre se cumple
- **Sin pérdida de información:** La computación cuántica es reversible

## Regla de Born (Medición)

Probabilidad de medir estado |k⟩: P(k) = |⟨k|ψ⟩|²

Después de medir, el estado **colapsa** al resultado medido.
      `,
    },
  },
  {
    id: 'shor',
    title: { en: "Shor's Algorithm Deep Dive", es: 'Algoritmo de Shor en Profundidad' },
    icon: '🔐',
    content: {
      en: `
# Shor's Algorithm: Breaking RSA

## Why Shor's Algorithm Matters

**RSA Encryption** (used by banks, governments, the internet) relies on:
- It's easy to multiply two large primes: p × q = N
- It's nearly impossible to factor N back to p and q

**Shor's algorithm** can factor N in polynomial time, breaking RSA.

## The Math Behind It

### Step 1: Reduce to Period Finding
Factoring N is equivalent to finding the period r of:
f(x) = aˣ mod N

where 'a' is randomly chosen and gcd(a, N) = 1.

### Step 2: Quantum Fourier Transform (QFT)
QFT finds the period r efficiently:
1. Prepare superposition of all x values
2. Compute f(x) in superposition
3. Apply QFT to extract period information
4. Measure to get period r

### Step 3: Extract Factors
Once we have r:
- factors = gcd(a^(r/2) ± 1, N)

## Circuit Complexity

For factoring an n-bit number:
- **Qubits needed:** ~2n
- **Gates needed:** O(n³)

RSA-2048 would need ~4000+ logical qubits (millions of physical qubits with error correction).

## Current State of the Art

| Year | Largest N Factored | Method |
|------|-------------------|--------|
| 2001 | 15 = 3 × 5 | IBM, 7 qubits |
| 2012 | 21 = 3 × 7 | Photonic |
| 2019 | 35 = 5 × 7 | D-Wave (disputed) |

We're still far from breaking RSA-2048!

## Post-Quantum Cryptography

New algorithms being standardized (NIST 2024):
- **CRYSTALS-Kyber** - Key exchange
- **CRYSTALS-Dilithium** - Digital signatures
- **SPHINCS+** - Hash-based signatures

These are resistant to Shor's algorithm!
      `,
      es: `
# Algoritmo de Shor: Rompiendo RSA

## Por Qué Importa el Algoritmo de Shor

**Cifrado RSA** (usado por bancos, gobiernos, internet) se basa en:
- Es fácil multiplicar dos primos grandes: p × q = N
- Es casi imposible factorizar N de vuelta a p y q

**El algoritmo de Shor** puede factorizar N en tiempo polinomial, rompiendo RSA.

## Las Matemáticas Detrás

### Paso 1: Reducir a Búsqueda de Período
Factorizar N es equivalente a encontrar el período r de:
f(x) = aˣ mod N

donde 'a' se elige aleatoriamente y gcd(a, N) = 1.

### Paso 2: Transformada de Fourier Cuántica (QFT)
QFT encuentra el período r eficientemente:
1. Preparar superposición de todos los valores x
2. Calcular f(x) en superposición
3. Aplicar QFT para extraer información del período
4. Medir para obtener período r

### Paso 3: Extraer Factores
Una vez que tenemos r:
- factores = gcd(a^(r/2) ± 1, N)

## Complejidad del Circuito

Para factorizar un número de n bits:
- **Qubits necesarios:** ~2n
- **Compuertas necesarias:** O(n³)

RSA-2048 necesitaría ~4000+ qubits lógicos (millones de qubits físicos con corrección de errores).

## Estado Actual del Arte

| Año | Mayor N Factorizado | Método |
|------|-------------------|--------|
| 2001 | 15 = 3 × 5 | IBM, 7 qubits |
| 2012 | 21 = 3 × 7 | Fotónico |
| 2019 | 35 = 5 × 7 | D-Wave (disputado) |

¡Aún estamos lejos de romper RSA-2048!

## Criptografía Post-Cuántica

Nuevos algoritmos siendo estandarizados (NIST 2024):
- **CRYSTALS-Kyber** - Intercambio de claves
- **CRYSTALS-Dilithium** - Firmas digitales
- **SPHINCS+** - Firmas basadas en hash

¡Estos son resistentes al algoritmo de Shor!
      `,
    },
  },
  {
    id: 'circuits',
    title: { en: 'Quantum Circuits', es: 'Circuitos Cuánticos' },
    icon: '⚡',
    content: {
      en: `
# Quantum Circuits

In computing, *circuits* are computational models where information is carried by wires through a network of *gates*, which represent operations on the information carried by the wires. *Quantum circuits* are a specific model of computation based on this more general concept.

Although the word "circuit" often refers to a circular path, circular paths are actually not allowed in the most frequently studied computational circuit models. We normally consider *acyclic circuits* when thinking about circuits as computational models. Quantum circuits follow this pattern; a quantum circuit represents a finite sequence of operations that cannot contain feedback loops.

## Boolean Circuits

In Boolean (classical) circuits, wires carry binary values and gates represent Boolean logical operations.

The gates are AND gates (labeled ∧), OR gates (labeled ∨), and NOT gates (labeled ¬). The functions computed by these gates:

**NOT gate:** 0 → 1, 1 → 0

**AND gate:**
- 00 → 0
- 01 → 0
- 10 → 0
- 11 → 1

**OR gate:**
- 00 → 0
- 01 → 1
- 10 → 1
- 11 → 1

**XOR gate (⊕):**
- 00 → 0
- 01 → 1
- 10 → 1
- 11 → 0

The two small solid circles on wires represent *fan-out* operations, which simply create a copy of whatever value is carried on the wire. In classical computing, fan-out is often considered "free." However, when Boolean circuits are converted to equivalent quantum circuits, we need to explicitly classify fan-out operations as gates to handle them correctly.

## Quantum Circuit Model

In the quantum circuit model, wires represent qubits and gates represent operations on these qubits. We focus on *unitary operations* and *standard basis measurements*.

### Simple Quantum Circuit

A single qubit named X represented by a horizontal line, with a sequence of gates representing unitary operations. The flow of information goes from left to right:
- First: Hadamard operation (H)
- Second: S operation
- Third: Another Hadamard (H)
- Fourth: T operation

Therefore, applying the complete circuit applies the composition of these operations: **THSH** to qubit X.

### Showing Input/Output States

If we apply the operation THSH to state |0⟩, we get:

**THSH|0⟩ = (1+i)/2 |0⟩ + 1/√2 |1⟩**

Quantum circuits often start with all qubits initialized to |0⟩.

## Creating Bell States

A circuit with two qubits can create entanglement:

1. **First operation:** Hadamard on qubit Y

   When a gate is applied to a single qubit like this, nothing happens to the other qubits (which in this case is just one other qubit). Nothing happening is equivalent to the identity operation being performed.

   **Operation:** I ⊗ H

2. **Second operation:** Controlled-NOT, where Y is control and X is target

   The action of the controlled-NOT gate on standard basis states:
   - |00⟩ → |00⟩
   - |01⟩ → |01⟩
   - |10⟩ → |11⟩ ✓
   - |11⟩ → |10⟩ ✓

The unitary operation implemented by the entire circuit U gives us:
- U|00⟩ = |ϕ⁺⟩ (Bell state)
- U|01⟩ = |ϕ⁻⟩
- U|10⟩ = |ψ⁺⟩
- U|11⟩ = -|ψ⁻⟩

This circuit creates the state |ϕ⁺⟩ = (|00⟩+|11⟩)/√2 if run on two qubits initialized to |00⟩.

## Gate Symbols in Quantum Circuits

- **Single-qubit gates:** Shown as squares with a letter indicating the operation (H, X, Y, Z, S, T, etc.)

- **NOT gates (X gates):** Sometimes indicated with a circle around a plus sign: ⊕

- **SWAP gates:** Denoted with × symbols connected by a vertical line

- **Controlled gates:** Indicated by a filled circle (control) connected by a vertical line to the controlled operation. Examples:
  - Controlled-NOT (CNOT)
  - Controlled-Controlled-NOT (Toffoli)
  - Controlled-SWAP (Fredkin)

- **Arbitrary unitary operations:** Represented by rectangles labeled with the name of the unitary operation

## Adding Measurements

Quantum circuits can include *classical bit* wires (indicated by double lines). Measurement gates represent standard basis measurements: qubits transition to their post-measurement states while measurement results are *overwritten* onto the classical bits the arrows point to.

## Key Takeaways

- Quantum circuits are acyclic (no feedback loops)
- Information flows left to right
- Gates compose right-to-left when reading circuit diagrams
- Multi-qubit gates can create entanglement
- Measurements produce classical bits
      `,
      es: `
# Circuitos Cuánticos

En computación, los *circuitos* son modelos de cálculo en los que la información es transportada por cables a través de una red de *puertas*, que representan operaciones sobre la información transportada por los cables. Los *circuitos cuánticos* son un modelo específico de computación basado en este concepto más general.

Aunque la palabra "circuito" se refiere a menudo a una trayectoria circular, en realidad las trayectorias circulares no están permitidas en los modelos de circuitos de computación más estudiados. Normalmente consideramos *circuitos acíclicos* cuando pensamos en circuitos como modelos computacionales. Los circuitos cuánticos siguen este patrón; un circuito cuántico representa una secuencia finita de operaciones que no puede contener bucles de realimentación.

## Circuitos Booleanos

En los circuitos booleanos (clásicos), los cables transportan valores binarios y las puertas representan operaciones lógicas booleanas.

Las puertas son AND (∧), OR (∨) y NOT (¬). Las funciones calculadas por estas puertas:

**Puerta NOT:** 0 → 1, 1 → 0

**Puerta AND:**
- 00 → 0
- 01 → 0
- 10 → 0
- 11 → 1

**Puerta OR:**
- 00 → 0
- 01 → 1
- 10 → 1
- 11 → 1

**Puerta XOR (⊕):**
- 00 → 0
- 01 → 1
- 10 → 1
- 11 → 0

Los pequeños círculos sólidos en los cables representan operaciones *fan-out*, que simplemente crean una copia del valor transportado por el cable. En computación clásica, el fan-out a menudo se considera "gratuito". Sin embargo, cuando los circuitos booleanos se convierten en circuitos cuánticos equivalentes, necesitamos clasificar explícitamente las operaciones fan-out como puertas para manejarlas correctamente.

## Modelo de Circuito Cuántico

En el modelo de circuito cuántico, los cables representan qubits y las puertas representan operaciones sobre estos qubits. Nos enfocamos en *operaciones unitarias* y *mediciones de base estándar*.

### Circuito Cuántico Simple

Un único qubit llamado X representado por una línea horizontal, con una secuencia de puertas representando operaciones unitarias. El flujo de información va de izquierda a derecha:
- Primero: Operación Hadamard (H)
- Segundo: Operación S
- Tercero: Otro Hadamard (H)
- Cuarto: Operación T

Por lo tanto, aplicar el circuito completo aplica la composición de estas operaciones: **THSH** al qubit X.

### Mostrando Estados de Entrada/Salida

Si aplicamos la operación THSH al estado |0⟩, obtenemos:

**THSH|0⟩ = (1+i)/2 |0⟩ + 1/√2 |1⟩**

Los circuitos cuánticos a menudo comienzan con todos los qubits inicializados a |0⟩.

## Creando Estados de Bell

Un circuito con dos qubits puede crear entrelazamiento:

1. **Primera operación:** Hadamard en el qubit Y

   Cuando una puerta se aplica a un único qubit, no sucede nada con los demás qubits. No suceder nada es equivalente a realizar la operación de identidad.

   **Operación:** I ⊗ H

2. **Segunda operación:** NOT Controlada, donde Y es control y X es objetivo

   La acción de la puerta NOT controlada en estados de base estándar:
   - |00⟩ → |00⟩
   - |01⟩ → |01⟩
   - |10⟩ → |11⟩ ✓
   - |11⟩ → |10⟩ ✓

La operación unitaria implementada por el circuito completo U nos da:
- U|00⟩ = |ϕ⁺⟩ (Estado de Bell)
- U|01⟩ = |ϕ⁻⟩
- U|10⟩ = |ψ⁺⟩
- U|11⟩ = -|ψ⁻⟩

Este circuito crea el estado |ϕ⁺⟩ = (|00⟩+|11⟩)/√2 si se ejecuta en dos qubits inicializados a |00⟩.

## Símbolos de Puertas en Circuitos Cuánticos

- **Puertas de un qubit:** Mostradas como cuadrados con una letra indicando la operación (H, X, Y, Z, S, T, etc.)

- **Puertas NOT (puertas X):** A veces indicadas con un círculo alrededor de un signo más: ⊕

- **Puertas SWAP:** Denotadas con símbolos × conectados por una línea vertical

- **Puertas controladas:** Indicadas por un círculo relleno (control) conectado por una línea vertical a la operación controlada. Ejemplos:
  - NOT Controlada (CNOT)
  - NOT Controlada-Controlada (Toffoli)
  - SWAP Controlada (Fredkin)

- **Operaciones unitarias arbitrarias:** Representadas por rectángulos etiquetados con el nombre de la operación unitaria

## Agregando Mediciones

Los circuitos cuánticos pueden incluir cables de *bits clásicos* (indicados por líneas dobles). Las puertas de medición representan mediciones de base estándar: los qubits transicionan a sus estados post-medición mientras que los resultados de la medición se *sobrescriben* en los bits clásicos a los que apuntan las flechas.

## Puntos Clave

- Los circuitos cuánticos son acíclicos (sin bucles de realimentación)
- La información fluye de izquierda a derecha
- Las puertas se componen de derecha a izquierda al leer diagramas de circuitos
- Las puertas multi-qubit pueden crear entrelazamiento
- Las mediciones producen bits clásicos
      `,
    },
  },
  {
    id: 'teleportation',
    title: { en: 'Quantum Teleportation', es: 'Teletransportación Cuántica' },
    icon: '🚀',
    content: {
      en: `
# Quantum Teleportation

Quantum teleportation is a protocol where a sender (Alice) transmits a qubit to a receiver (Bob) using a shared entangled quantum state (an e-bit) together with two bits of classical communication.

**Important:** Teleportation transmits quantum information, not matter!

## The Setup

1. Alice and Bob share an entangled pair (Bell state |ϕ⁺⟩)
2. Alice has qubit Q she wants to send to Bob (state unknown)
3. Alice cannot send qubits directly to Bob, only classical bits

## Why Classical Communication Alone Fails

If we could send quantum information using only classical communication, then copying that classical message would effectively clone the qubit - violating the **no-cloning theorem**!

## The Protocol

1. **Alice's operations:**
   - Apply CNOT(Q, A) where Q is control, A is target
   - Apply Hadamard to Q
   - Measure both A and Q (gets bits a and b)
   - Send a, b to Bob classically

2. **Bob's corrections:**
   - If a = 1: Apply X gate to his qubit B
   - If b = 1: Apply Z gate to his qubit B

## Key Results

- Each of the 4 measurement outcomes (00, 01, 10, 11) occurs with probability 1/4
- After Bob's correction, his qubit B is in the original state of Q
- The original qubit Q is destroyed (collapsed to |a⟩)
- The e-bit is "burned" - no longer entangled

## Why It Works

Alice's measurements give NO information about α and β (the state). The probabilities are 1/4 for each outcome regardless of the input state.

**Gate Teleportation:** A related technique can apply quantum gates remotely!
      `,
      es: `
# Teletransportación Cuántica

La teletransportación cuántica es un protocolo donde un emisor (Alice) transmite un qubit a un receptor (Bob) usando un estado cuántico entrelazado compartido (un e-bit) junto con dos bits de comunicación clásica.

**Importante:** ¡La teletransportación transmite información cuántica, no materia!

## El Escenario

1. Alice y Bob comparten un par entrelazado (estado de Bell |ϕ⁺⟩)
2. Alice tiene el qubit Q que quiere enviar a Bob (estado desconocido)
3. Alice no puede enviar qubits directamente a Bob, solo bits clásicos

## Por Qué la Comunicación Clásica Sola Falla

Si pudiéramos enviar información cuántica usando solo comunicación clásica, copiar ese mensaje clásico clonaría efectivamente el qubit - ¡violando el **teorema de no-clonación**!

## El Protocolo

1. **Operaciones de Alice:**
   - Aplicar CNOT(Q, A) donde Q es control, A es objetivo
   - Aplicar Hadamard a Q
   - Medir A y Q (obtiene bits a y b)
   - Enviar a, b a Bob clásicamente

2. **Correcciones de Bob:**
   - Si a = 1: Aplicar compuerta X a su qubit B
   - Si b = 1: Aplicar compuerta Z a su qubit B

## Resultados Clave

- Cada uno de los 4 resultados de medición (00, 01, 10, 11) ocurre con probabilidad 1/4
- Después de la corrección de Bob, su qubit B está en el estado original de Q
- El qubit original Q se destruye (colapsa a |a⟩)
- El e-bit se "quema" - ya no está entrelazado

## Por Qué Funciona

¡Las mediciones de Alice no dan información sobre α y β (el estado)! Las probabilidades son 1/4 para cada resultado sin importar el estado de entrada.

**Teletransportación de Compuertas:** ¡Una técnica relacionada puede aplicar compuertas cuánticas remotamente!
      `,
    },
  },
  {
    id: 'superdense',
    title: { en: 'Superdense Coding', es: 'Codificación Superdensa' },
    icon: '📡',
    content: {
      en: `
# Superdense Coding

Superdense coding is a protocol that achieves a complementary goal to teleportation. Instead of transmitting one qubit using two classical bits (teleportation), it transmits **two classical bits using one qubit** of quantum communication.

## Why It's Remarkable

**Holevo's Theorem** implies that without shared entanglement, it's impossible to communicate more than one bit of classical information by sending a single qubit.

Superdense coding **doubles** the classical information transmission capacity using shared entanglement!

## The Protocol

**Setup:** Alice and Bob share e-bit |ϕ⁺⟩ (Alice has A, Bob has B)

**Alice wants to send two bits c and d:**

1. If d = 1: Alice applies Z gate to her qubit A
2. If c = 1: Alice applies X gate to her qubit A
3. Alice sends qubit A to Bob

**Bob receives A:**

1. Apply CNOT with A as control, B as target
2. Apply Hadamard to A
3. Measure B to get c, measure A to get d

## The Magic: Bell State Encoding

Alice's operations transform the shared state:

- I ⊗ I: |ϕ⁺⟩ → |ϕ⁺⟩ (cd = 00)
- I ⊗ Z: |ϕ⁺⟩ → |ϕ⁻⟩ (cd = 01)
- I ⊗ X: |ϕ⁺⟩ → |ψ⁺⟩ (cd = 10)
- I ⊗ XZ: |ϕ⁺⟩ → |ψ⁻⟩ (cd = 11)

Bob's measurements decode which Bell state Alice chose → reveals c and d!

## Summary

- Send 2 classical bits using 1 qubit + 1 e-bit
- Entanglement enables "super-dense" information packing
- Complementary to quantum teleportation
      `,
      es: `
# Codificación Superdensa

La codificación superdensa es un protocolo que logra un objetivo complementario a la teletransportación. En lugar de transmitir un qubit usando dos bits clásicos (teletransportación), transmite **dos bits clásicos usando un qubit** de comunicación cuántica.

## Por Qué Es Notable

El **Teorema de Holevo** implica que sin entrelazamiento compartido, es imposible comunicar más de un bit de información clásica enviando un solo qubit.

¡La codificación superdensa **duplica** la capacidad de transmisión de información clásica usando entrelazamiento!

## El Protocolo

**Configuración:** Alice y Bob comparten e-bit |ϕ⁺⟩ (Alice tiene A, Bob tiene B)

**Alice quiere enviar dos bits c y d:**

1. Si d = 1: Alice aplica compuerta Z a su qubit A
2. Si c = 1: Alice aplica compuerta X a su qubit A
3. Alice envía el qubit A a Bob

**Bob recibe A:**

1. Aplicar CNOT con A como control, B como objetivo
2. Aplicar Hadamard a A
3. Medir B para obtener c, medir A para obtener d

## La Magia: Codificación de Estados de Bell

Las operaciones de Alice transforman el estado compartido:

- I ⊗ I: |ϕ⁺⟩ → |ϕ⁺⟩ (cd = 00)
- I ⊗ Z: |ϕ⁺⟩ → |ϕ⁻⟩ (cd = 01)
- I ⊗ X: |ϕ⁺⟩ → |ψ⁺⟩ (cd = 10)
- I ⊗ XZ: |ϕ⁺⟩ → |ψ⁻⟩ (cd = 11)

¡Las mediciones de Bob decodifican qué estado de Bell eligió Alice → revela c y d!

## Resumen

- Enviar 2 bits clásicos usando 1 qubit + 1 e-bit
- El entrelazamiento permite empaquetar información "super-densa"
- Complementario a la teletransportación cuántica
      `,
    },
  },
  {
    id: 'simon',
    title: { en: "Simon's Algorithm", es: 'Algoritmo de Simon' },
    icon: '🔍',
    content: {
      en: `
# Simon's Algorithm

Simon's algorithm provides an **exponential quantum advantage** over classical algorithms. It inspired Peter Shor's algorithm for integer factorization!

## Simon's Problem

**Input:** Function f: Σⁿ → Σᵐ

**Promise:** There exists a string s ∈ Σⁿ such that:
[f(x) = f(y)] ⟺ [(x = y) ∨ (x ⊕ s = y)]

**Output:** Find the string s

## Two Cases

1. **s = 0ⁿ (all zeros):** f is one-to-one
2. **s ≠ 0ⁿ:** f is two-to-one (each output has exactly 2 inputs: w and w ⊕ s)

## The Algorithm

1. Apply Hadamard to n qubits (top register)
2. Apply query gate Uf
3. Apply Hadamard to top register again
4. Measure top register → get string y

**Key insight:** If s ≠ 0ⁿ, then y · s = 0 (binary dot product)!

## Classical Post-Processing

1. Run the circuit k = n + 10 times
2. Collect strings y¹, y², ..., yᵏ
3. Form matrix M from these strings as rows
4. Find null space of M (mod 2) using Gaussian elimination
5. s is in the null space!

## Complexity Comparison

| Approach | Queries Needed |
|----------|---------------|
| Classical | O(2^(n/2)) exponential! |
| Quantum | O(n) linear |

## Why It Matters

- **Exponential speedup** for this specific problem
- Technique inspired Shor's algorithm
- Demonstrates power of quantum interference + entanglement
- Different from Deutsch-Jozsa (which solves a different promise problem)
      `,
      es: `
# Algoritmo de Simon

¡El algoritmo de Simon proporciona una **ventaja cuántica exponencial** sobre algoritmos clásicos! ¡Inspiró el algoritmo de Shor para factorización de enteros!

## El Problema de Simon

**Entrada:** Función f: Σⁿ → Σᵐ

**Promesa:** Existe una cadena s ∈ Σⁿ tal que:
[f(x) = f(y)] ⟺ [(x = y) ∨ (x ⊕ s = y)]

**Salida:** Encontrar la cadena s

## Dos Casos

1. **s = 0ⁿ (todo ceros):** f es uno-a-uno
2. **s ≠ 0ⁿ:** f es dos-a-uno (cada salida tiene exactamente 2 entradas: w y w ⊕ s)

## El Algoritmo

1. Aplicar Hadamard a n qubits (registro superior)
2. Aplicar compuerta de consulta Uf
3. Aplicar Hadamard al registro superior de nuevo
4. Medir registro superior → obtener cadena y

**Idea clave:** ¡Si s ≠ 0ⁿ, entonces y · s = 0 (producto punto binario)!

## Post-Procesamiento Clásico

1. Ejecutar el circuito k = n + 10 veces
2. Recolectar cadenas y¹, y², ..., yᵏ
3. Formar matriz M con estas cadenas como filas
4. Encontrar espacio nulo de M (mod 2) usando eliminación gaussiana
5. ¡s está en el espacio nulo!

## Comparación de Complejidad

| Enfoque | Consultas Necesarias |
|---------|---------------------|
| Clásico | O(2^(n/2)) ¡exponencial! |
| Cuántico | O(n) lineal |

## Por Qué Importa

- **Aceleración exponencial** para este problema específico
- La técnica inspiró el algoritmo de Shor
- Demuestra el poder de interferencia cuántica + entrelazamiento
- Diferente de Deutsch-Jozsa (que resuelve un problema de promesa diferente)
      `,
    },
  },
];

interface RoadmapStep {
  id: number;
  title: { en: string; es: string };
  desc: { en: string; es: string };
  icon: string;
  color: string;
  sections: string[];
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: { en: 'Fundamentals', es: 'Fundamentos' },
    desc: { en: 'Start here! Learn qubits, superposition, and entanglement.', es: '¡Empieza aquí! Aprende qubits, superposición y entrelazamiento.' },
    icon: '🌟',
    color: '#6366f1',
    sections: ['intro'],
  },
  {
    id: 2,
    title: { en: 'Single-Qubit Gates', es: 'Compuertas de Un Qubit' },
    desc: { en: 'Master H, X, Y, Z, S, T and rotation gates.', es: 'Domina H, X, Y, Z, S, T y compuertas de rotación.' },
    icon: '🎛️',
    color: '#8b5cf6',
    sections: ['single-gates'],
  },
  {
    id: 3,
    title: { en: 'Multi-Qubit Gates', es: 'Compuertas Multi-Qubit' },
    desc: { en: 'Learn CNOT, CZ, SWAP and create entanglement!', es: '¡Aprende CNOT, CZ, SWAP y crea entrelazamiento!' },
    icon: '🔗',
    color: '#ec4899',
    sections: ['multi-gates'],
  },
  {
    id: 4,
    title: { en: 'Quantum Circuits', es: 'Circuitos Cuánticos' },
    desc: { en: 'Understand how gates combine into circuits.', es: 'Entiende cómo las compuertas se combinan en circuitos.' },
    icon: '⚡',
    color: '#06b6d4',
    sections: ['circuits'],
  },
  {
    id: 5,
    title: { en: 'Quantum Algorithms', es: 'Algoritmos Cuánticos' },
    desc: { en: "Grover's, Shor's, Simon's and more!", es: '¡Grover, Shor, Simon y más!' },
    icon: '🧮',
    color: '#10b981',
    sections: ['algorithms', 'shor', 'simon'],
  },
  {
    id: 6,
    title: { en: 'Quantum Protocols', es: 'Protocolos Cuánticos' },
    desc: { en: 'Teleportation, superdense coding & applications.', es: 'Teletransportación, codificación superdensa y aplicaciones.' },
    icon: '🚀',
    color: '#f43f5e',
    sections: ['teleportation', 'superdense'],
  },
  {
    id: 7,
    title: { en: 'Mathematical Foundations', es: 'Fundamentos Matemáticos' },
    desc: { en: 'Deep dive: complex numbers, matrices, unitarity.', es: 'Profundiza: números complejos, matrices, unitariedad.' },
    icon: '📐',
    color: '#f59e0b',
    sections: ['math'],
  },
];

export const LearnPage: React.FC = () => {
  const { language } = useI18n();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const currentSection = activeSection ? SECTIONS.find(s => s.id === activeSection) : null;

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        return <h1 key={i} className="learn-h1">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={i} className="learn-h2">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={i} className="learn-h3">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return <p key={i} className="learn-formula">{trimmed.slice(2, -2)}</p>;
      }
      if (trimmed.startsWith('- ')) {
        return <li key={i} className="learn-li">{trimmed.slice(2)}</li>;
      }
      if (trimmed.startsWith('|')) {
        // Table row
        const cells = trimmed.split('|').filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^-+$/))) {
          return null; // Skip separator row
        }
        return (
          <div key={i} className="learn-table-row">
            {cells.map((cell, j) => (
              <span key={j} className="learn-table-cell">{cell.trim()}</span>
            ))}
          </div>
        );
      }
      if (trimmed === '') {
        return <br key={i} />;
      }
      return <p key={i} className="learn-p">{trimmed}</p>;
    });
  };

  return (
    <div className="learn-page">
      {/* Animated Background */}
      <div className="learn-bg">
        <div className="learn-bg-grid"></div>
        <div className="learn-bg-glow"></div>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="learn-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Roadmap Section */}
      {!activeSection && (
        <div className="roadmap-container">
          <div className="roadmap-header">
            <h1 className="roadmap-title">
              {language === 'en' ? '🎓 Learning Roadmap' : '🎓 Ruta de Aprendizaje'}
            </h1>
            <p className="roadmap-subtitle">
              {language === 'en'
                ? 'Your path to mastering quantum computing'
                : 'Tu camino para dominar la computación cuántica'}
            </p>
          </div>

          <div className="roadmap-timeline">
            {ROADMAP_STEPS.map((step, index) => (
              <div
                key={step.id}
                className="roadmap-step"
                style={{ '--step-color': step.color } as React.CSSProperties}
              >
                <div className="roadmap-step-number">{step.id}</div>
                <div className="roadmap-step-content">
                  <div className="roadmap-step-icon">{step.icon}</div>
                  <h3 className="roadmap-step-title">{step.title[language]}</h3>
                  <p className="roadmap-step-desc">{step.desc[language]}</p>
                  <div className="roadmap-step-actions">
                    {step.sections.map(sectionId => {
                      const section = SECTIONS.find(s => s.id === sectionId);
                      if (!section) return null;
                      return (
                        <button
                          key={sectionId}
                          className="roadmap-step-link"
                          onClick={() => setActiveSection(sectionId)}
                        >
                          {section.icon} {section.title[language]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {index < ROADMAP_STEPS.length - 1 && (
                  <div className="roadmap-connector">
                    <svg viewBox="0 0 24 24" className="roadmap-arrow">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="learn-sections-grid">
            <h2 className="learn-sections-title">
              {language === 'en' ? '📚 All Topics' : '📚 Todos los Temas'}
            </h2>
            <div className="learn-sections-cards">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  className="learn-section-card"
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="learn-section-card-icon">{section.icon}</span>
                  <span className="learn-section-card-title">{section.title[language]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      {activeSection && currentSection && (
        <div className="learn-content-container">
          <button
            className="learn-back-btn"
            onClick={() => setActiveSection(null)}
          >
            ← {language === 'en' ? 'Back to Roadmap' : 'Volver al Roadmap'}
          </button>

          <div className="learn-content">
            {renderContent(currentSection.content[language])}
          </div>

          {/* Navigation */}
          <div className="learn-nav-footer">
            {SECTIONS.map((section, i) => (
              <button
                key={section.id}
                className={`learn-nav-dot ${section.id === activeSection ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                title={section.title[language]}
              >
                {section.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;

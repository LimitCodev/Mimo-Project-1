import { initializeDatabase, getDb, closeDatabase } from './connection.js';
import type { NewCircuit, NewAlgorithm } from './schema.js';

/**
 * Seed database with example circuits and algorithms
 */
async function seed(): Promise<void> {
    console.log('🌱 Starting database seed...');

    await initializeDatabase();
    const db = getDb();

    // Check if already seeded
    const existing = await db
        .selectFrom('circuits')
        .select('id')
        .limit(1)
        .execute();

    if (existing.length > 0) {
        console.log('⚠️ Database already seeded, skipping...');
        await closeDatabase();
        return;
    }

    const now = new Date().toISOString();

    // ============================================================================
    // Seed Circuits
    // ============================================================================

    const circuits: NewCircuit[] = [
        {
            name: 'Bell State',
            description: 'Creates quantum entanglement: (|00⟩+|11⟩)/√2',
            qasm: 'OPENQASM 3.0;\nqubit[2] q;\nh q[0];\ncx q[0], q[1];',
            num_qubits: 2,
            num_gates: 2,
            depth: 2,
            category: 'tutorial',
            tags: JSON.stringify(['entanglement', 'beginner', 'bell']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 156,
            created_at: now,
            updated_at: now,
        },
        {
            name: 'GHZ State (3 qubits)',
            description: 'Greenberger–Horne–Zeilinger state: (|000⟩+|111⟩)/√2',
            qasm: 'OPENQASM 3.0;\nqubit[3] q;\nh q[0];\ncx q[0], q[1];\ncx q[0], q[2];',
            num_qubits: 3,
            num_gates: 3,
            depth: 3,
            category: 'tutorial',
            tags: JSON.stringify(['entanglement', 'intermediate', 'ghz']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 89,
            created_at: now,
            updated_at: now,
        },
        {
            name: 'Hadamard Superposition',
            description: 'Creates equal superposition of all basis states',
            qasm: 'OPENQASM 3.0;\nqubit[2] q;\nh q[0];\nh q[1];',
            num_qubits: 2,
            num_gates: 2,
            depth: 1,
            category: 'tutorial',
            tags: JSON.stringify(['superposition', 'beginner']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 234,
            created_at: now,
            updated_at: now,
        },
        {
            name: 'Grover Search (2 qubits)',
            description: 'Quantum search algorithm - finds marked item in O(√N)',
            qasm: 'OPENQASM 3.0;\nqubit[2] q;\nh q[0];\nh q[1];\ncz q[0], q[1];\nh q[0];\nh q[1];\nx q[0];\nx q[1];\ncz q[0], q[1];\nx q[0];\nx q[1];\nh q[0];\nh q[1];',
            num_qubits: 2,
            num_gates: 12,
            depth: 8,
            category: 'algorithm',
            tags: JSON.stringify(['grover', 'search', 'advanced']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 189,
            created_at: now,
            updated_at: now,
        },
        {
            name: 'Quantum Random Number',
            description: 'Generates truly random bits using quantum superposition',
            qasm: 'OPENQASM 3.0;\nqubit[4] q;\nh q[0];\nh q[1];\nh q[2];\nh q[3];',
            num_qubits: 4,
            num_gates: 4,
            depth: 1,
            category: 'tutorial',
            tags: JSON.stringify(['random', 'beginner', 'practical']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 278,
            created_at: now,
            updated_at: now,
        },
        {
            name: 'Quantum Teleportation',
            description: 'Teleports quantum state using entanglement',
            qasm: 'OPENQASM 3.0;\nqubit[3] q;\nh q[1];\ncx q[1], q[2];\ncx q[0], q[1];\nh q[0];\ncx q[1], q[2];\ncz q[0], q[2];',
            num_qubits: 3,
            num_gates: 6,
            depth: 5,
            category: 'algorithm',
            tags: JSON.stringify(['teleportation', 'advanced', 'entanglement']),
            is_public: 1,
            author_name: 'QuantumCloud',
            downloads: 145,
            created_at: now,
            updated_at: now,
        },
    ];

    for (const circuit of circuits) {
        await db.insertInto('circuits').values(circuit).execute();
    }
    console.log(`✅ Inserted ${circuits.length} circuits`);

    // ============================================================================
    // Seed Algorithms
    // ============================================================================

    // Get circuit IDs for algorithms
    const bellCircuit = await db
        .selectFrom('circuits')
        .select('id')
        .where('name', '=', 'Bell State')
        .executeTakeFirst();

    const groverCircuit = await db
        .selectFrom('circuits')
        .select('id')
        .where('name', 'like', '%Grover%')
        .executeTakeFirst();

    const algorithms: NewAlgorithm[] = [
        {
            name: 'Bell State Preparation',
            slug: 'bell-state',
            description: 'Create maximally entangled two-qubit state',
            circuit_id: bellCircuit?.id || 1,
            complexity: 'O(1)',
            explanation: `
# Bell State Preparation

The Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2 is one of the four maximally entangled Bell states.

## Steps:
1. **Hadamard on qubit 0**: Creates superposition |0⟩ → (|0⟩+|1⟩)/√2
2. **CNOT(0→1)**: Entangles the qubits

## Properties:
- Measuring one qubit instantly determines the other
- Cannot be factored into individual qubit states
- Fundamental building block for quantum communication
      `.trim(),
            created_at: now,
        },
        {
            name: "Grover's Search Algorithm",
            slug: 'grover-search',
            description: 'Quadratic speedup for unstructured search',
            circuit_id: groverCircuit?.id || 4,
            complexity: 'O(√N)',
            explanation: `
# Grover's Search Algorithm

Grover's algorithm provides quadratic speedup for searching unsorted databases.

## Classical vs Quantum:
- Classical: O(N) queries
- Quantum: O(√N) queries

## Key Components:
1. **Initialization**: Apply H gates to create superposition
2. **Oracle**: Mark the target state with a phase flip
3. **Diffusion**: Amplify probability of marked states
4. **Iterate**: Repeat √N times

## Applications:
- Database search
- Satisfiability problems
- Cryptographic key search
      `.trim(),
            created_at: now,
        },
    ];

    for (const algo of algorithms) {
        await db.insertInto('algorithms').values(algo).execute();
    }
    console.log(`✅ Inserted ${algorithms.length} algorithms`);

    await closeDatabase();
    console.log('🎉 Database seeding complete!');
}

// Run seed
seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});

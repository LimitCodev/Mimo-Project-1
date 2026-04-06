# QuantumCloud - Arquitectura Técnica Completa

## 📋 Información General

**Proyecto:** Simulador de Computación Cuántica Educativo  
**Plataforma:** Mimo (React 18 + Node.js + Express 5 + SQLite)  
**Tiempo estimado:** 5 semanas (1 persona, medio tiempo)  
**Nivel de complejidad:** 🔥🔥🔥🔥 (Alta)

---

## 🎯 Objetivos del Proyecto

1. Simulador de circuitos cuánticos con hasta 12 qubits
2. Marketplace de circuitos para compartir algoritmos
3. Visualización interactiva (Bloch sphere, state vector)
4. Implementación de algoritmos cuánticos clásicos (Grover, Deutsch-Jozsa)
5. Simulación de ruido cuántico (depolarizing, bit-flip)
6. Sistema educativo con challenges

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React 18)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Circuit    │  │    Bloch     │  │  Marketplace │  │
│  │   Builder    │  │   Sphere     │  │   Browser    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                          │                              │
│                  ┌───────▼────────┐                     │
│                  │   API Routes   │                     │
│                  └───────┬────────┘                     │
└──────────────────────────┼──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                  BACKEND (Express 5)                    │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ Quantum Engine   │  │ Circuit Registry │            │
│  │ - State Vector   │  │ - QASM Parser    │            │
│  │ - Gate Library   │  │ - Transpiler     │            │
│  │ - Measurement    │  │ - Optimizer      │            │
│  └──────────────────┘  └──────────────────┘            │
│           │                      │                      │
│           └──────────┬───────────┘                      │
│                      │                                  │
│              ┌───────▼────────┐                         │
│              │ SQLite Database│                         │
│              │ /data/quantum.db│                        │
│              └────────────────┘                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas Completa

```
quantum-cloud/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── circuit/
│   │   │   │   ├── CircuitBuilder.tsx          # Drag & drop canvas
│   │   │   │   ├── GatePalette.tsx             # Paleta de gates
│   │   │   │   ├── QuantumGate.tsx             # Componente individual gate
│   │   │   │   ├── QubitWire.tsx               # Líneas de qubits
│   │   │   │   └── MeasurementBox.tsx          # Measurement indicators
│   │   │   │
│   │   │   ├── visualization/
│   │   │   │   ├── BlochSphere.tsx             # Three.js Bloch sphere
│   │   │   │   ├── StateVectorTable.tsx        # Tabla de amplitudes
│   │   │   │   ├── ProbabilityHistogram.tsx    # Chart.js histogram
│   │   │   │   └── DensityMatrix.tsx           # Heatmap visualization
│   │   │   │
│   │   │   ├── marketplace/
│   │   │   │   ├── CircuitBrowser.tsx          # Grid de circuitos
│   │   │   │   ├── CircuitCard.tsx             # Preview card
│   │   │   │   ├── CircuitDetail.tsx           # Vista detallada
│   │   │   │   └── UploadCircuit.tsx           # Form de upload
│   │   │   │
│   │   │   ├── algorithms/
│   │   │   │   ├── AlgorithmLibrary.tsx        # Catálogo
│   │   │   │   ├── GroverVisualizer.tsx        # Grover step-by-step
│   │   │   │   └── DeutschJozsaDemo.tsx        # DJ interactive demo
│   │   │   │
│   │   │   ├── noise/
│   │   │   │   ├── NoiseConfigurator.tsx       # UI para configurar ruido
│   │   │   │   └── ErrorRateChart.tsx          # Visualización de errores
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── Layout.tsx                  # Layout responsive
│   │   │       ├── Navigation.tsx              # Nav bar
│   │   │       ├── BottomSheet.tsx             # Mobile drawer
│   │   │       └── CommandPalette.tsx          # Keyboard shortcuts
│   │   │
│   │   ├── lib/
│   │   │   ├── quantum/
│   │   │   │   ├── quantum-engine.ts           # Core simulator
│   │   │   │   ├── complex.ts                  # Complex number class
│   │   │   │   ├── gates.ts                    # Gate matrices library
│   │   │   │   ├── state-vector.ts             # StateVector class
│   │   │   │   ├── measurement.ts              # Measurement logic
│   │   │   │   └── noise-models.ts             # Noise implementations
│   │   │   │
│   │   │   ├── algorithms/
│   │   │   │   ├── grover.ts                   # Grover's algorithm
│   │   │   │   ├── deutsch-jozsa.ts            # Deutsch-Jozsa
│   │   │   │   ├── qft.ts                      # Quantum Fourier Transform
│   │   │   │   └── teleportation.ts            # Quantum teleportation
│   │   │   │
│   │   │   ├── qasm/
│   │   │   │   ├── parser.ts                   # OpenQASM 3.0 parser
│   │   │   │   ├── compiler.ts                 # QASM → Circuit
│   │   │   │   └── exporter.ts                 # Circuit → QASM
│   │   │   │
│   │   │   ├── visualization/
│   │   │   │   ├── bloch-math.ts               # Cálculos Bloch sphere
│   │   │   │   └── three-helpers.ts            # Three.js utilities
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── matrix-ops.ts               # Operaciones matriciales
│   │   │       ├── tensor-product.ts           # Producto tensorial
│   │   │       └── validators.ts               # Validaciones
│   │   │
│   │   ├── stores/
│   │   │   ├── circuit-store.ts                # Zustand: Circuit state
│   │   │   ├── simulation-store.ts             # Simulation state
│   │   │   ├── marketplace-store.ts            # Marketplace state
│   │   │   └── ui-store.ts                     # UI state (mobile, theme)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useQuantumSimulation.ts         # Hook principal
│   │   │   ├── useCircuitBuilder.ts            # Circuit editing
│   │   │   ├── useBlochSphere.ts               # 3D visualization
│   │   │   ├── useWindowSize.ts                # Responsive
│   │   │   └── useKeyboardShortcuts.ts         # Shortcuts
│   │   │
│   │   ├── workers/
│   │   │   ├── simulation.worker.ts            # Heavy quantum compute
│   │   │   └── transpiler.worker.ts            # Circuit optimization
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css                     # Tailwind base
│   │   │   ├── quantum-theme.css               # Tema cuántico
│   │   │   └── responsive.css                  # Media queries
│   │   │
│   │   ├── types/
│   │   │   ├── circuit.types.ts
│   │   │   ├── gate.types.ts
│   │   │   ├── quantum.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   │   ├── algorithms/                         # JSON pre-cargados
│   │   │   ├── grover-3qubits.json
│   │   │   ├── deutsch-jozsa.json
│   │   │   └── bell-state.json
│   │   └── assets/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── circuits.ts                     # CRUD circuits
│   │   │   ├── simulations.ts                  # Run simulations
│   │   │   ├── marketplace.ts                  # Browse/upload
│   │   │   ├── algorithms.ts                   # Pre-built algorithms
│   │   │   └── benchmarks.ts                   # Performance tests
│   │   │
│   │   ├── services/
│   │   │   ├── circuit-service.ts              # Business logic circuits
│   │   │   ├── simulation-service.ts           # Simulation orchestration
│   │   │   ├── transpiler-service.ts           # Circuit optimization
│   │   │   └── marketplace-service.ts          # Marketplace logic
│   │   │
│   │   ├── db/
│   │   │   ├── schema.ts                       # Kysely schema types
│   │   │   ├── migrations/
│   │   │   │   ├── 001_initial.ts              # Tablas base
│   │   │   │   ├── 002_marketplace.ts          # Marketplace features
│   │   │   │   └── 003_benchmarks.ts           # Benchmarking
│   │   │   ├── queries/
│   │   │   │   ├── circuits.queries.ts
│   │   │   │   ├── simulations.queries.ts
│   │   │   │   └── marketplace.queries.ts
│   │   │   └── connection.ts                   # SQLite connection
│   │   │
│   │   ├── quantum/
│   │   │   ├── simulator/
│   │   │   │   ├── state-vector-simulator.ts   # Main simulator
│   │   │   │   ├── measurement.ts              # Measurement collapse
│   │   │   │   └── noise-simulator.ts          # Noisy simulation
│   │   │   │
│   │   │   ├── transpiler/
│   │   │   │   ├── optimizer.ts                # Gate cancellation
│   │   │   │   ├── router.ts                   # Qubit routing
│   │   │   │   └── decomposer.ts               # Gate synthesis
│   │   │   │
│   │   │   └── gates/
│   │   │       ├── gate-library.ts             # All gate matrices
│   │   │       └── custom-gates.ts             # User-defined gates
│   │   │
│   │   ├── middleware/
│   │   │   ├── error-handler.ts
│   │   │   ├── validation.ts                   # Zod schemas
│   │   │   └── rate-limiter.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── math-utils.ts
│   │   │   └── qasm-utils.ts
│   │   │
│   │   └── server.ts                           # Express app
│   │
│   └── package.json
│
├── shared/
│   ├── types/
│   │   ├── circuit.ts                          # Shared types
│   │   ├── gate.ts
│   │   └── api.ts
│   │
│   └── constants/
│       ├── gates.ts                            # Gate definitions
│       └── errors.ts                           # Error codes
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── QUANTUM_BASICS.md                       # Tutorial cuántica
│   ├── API.md                                  # API documentation
│   └── ALGORITHMS.md                           # Algoritmos implementados
│
├── scripts/
│   ├── seed-algorithms.ts                      # Poblar DB
│   └── benchmark.ts                            # Performance tests
│
├── .env.example
├── package.json                                # Root monorepo
├── tsconfig.json
├── turbo.json                                  # Turborepo config (opcional)
└── README.md
```

---

## 🗄️ Schema SQLite Detallado

```typescript
// db/schema.ts
import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// ============================================================================
// CIRCUITS TABLE
// ============================================================================
export interface CircuitsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // Circuit data
  qasm: string;                    // OpenQASM 3.0 format
  num_qubits: number;              // 1-12
  num_gates: number;               // Total gates
  depth: number;                   // Circuit depth
  
  // Metadata
  category: 'algorithm' | 'tutorial' | 'benchmark' | 'custom';
  tags: string;                    // JSON array: ["grover", "search"]
  
  // Optimization
  optimized_qasm: string | null;   // After transpilation
  optimized_depth: number | null;
  
  // Noise configuration
  noise_model: string | null;      // JSON config
  
  // Marketplace
  is_public: boolean;
  author_name: string | null;
  downloads: number;
  rating: number | null;           // 1-5 stars
  rating_count: number;
  
  // Timestamps
  created_at: string;              // ISO 8601
  updated_at: string;
}

// ============================================================================
// EXECUTIONS TABLE
// ============================================================================
export interface ExecutionsTable {
  id: Generated<number>;
  circuit_id: number;              // FK to circuits
  
  // Execution parameters
  shots: number;                   // Number of measurements (1-10000)
  initial_state: string | null;    // JSON array of complex amplitudes
  
  // Results
  counts: string;                  // JSON: {"00": 512, "11": 488}
  state_vector: string | null;     // JSON (if num_qubits <= 10)
  probabilities: string;           // JSON: {"00": 0.51, "11": 0.49}
  
  // Performance
  execution_time_ms: number;
  memory_usage_mb: number | null;
  
  // Noise
  noise_applied: boolean;
  error_rate: number | null;       // Calculated error rate
  
  // Backend
  backend: 'simulator' | 'noisy_simulator';
  
  created_at: string;
}

// ============================================================================
// ALGORITHMS TABLE
// ============================================================================
export interface AlgorithmsTable {
  id: Generated<number>;
  name: string;                    // "Grover's Search"
  slug: string;                    // "grover-search" (unique)
  description: string;
  
  // Algorithm details
  circuit_id: number;              // FK to circuits
  complexity: 'beginner' | 'intermediate' | 'advanced';
  time_complexity: string;         // "O(√N)"
  space_complexity: string;        // "O(log N)"
  
  // Educational
  explanation: string;             // Markdown
  use_cases: string;               // JSON array
  references: string;              // JSON array of URLs
  
  // Interactive
  has_visualizer: boolean;
  visualizer_component: string | null;
  
  created_at: string;
}

// ============================================================================
// MARKETPLACE TABLE
// ============================================================================
export interface MarketplaceTable {
  id: Generated<number>;
  circuit_id: number;              // FK to circuits (unique)
  
  // Metadata
  title: string;
  short_description: string;
  long_description: string | null;
  thumbnail_url: string | null;
  
  // Stats
  view_count: number;
  download_count: number;
  fork_count: number;
  
  // Featured
  is_featured: boolean;
  featured_at: string | null;
  
  // Moderation
  status: 'pending' | 'approved' | 'rejected';
  moderation_notes: string | null;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// BENCHMARKS TABLE
// ============================================================================
export interface BenchmarksTable {
  id: Generated<number>;
  circuit_id: number;              // FK to circuits
  
  // Test configuration
  num_qubits: number;
  num_gates: number;
  shots: number;
  
  // Results
  avg_execution_time_ms: number;
  min_execution_time_ms: number;
  max_execution_time_ms: number;
  std_dev_ms: number;
  
  // Accuracy (if comparing to theoretical)
  fidelity: number | null;         // 0-1
  
  // System info
  browser: string;                 // User agent
  cpu_cores: number | null;
  
  created_at: string;
}

// ============================================================================
// NOISE_MODELS TABLE
// ============================================================================
export interface NoiseModelsTable {
  id: Generated<number>;
  name: string;
  description: string;
  
  // Configuration
  type: 'depolarizing' | 'bit_flip' | 'phase_flip' | 'amplitude_damping' | 'custom';
  parameters: string;              // JSON: {"p": 0.01} for depolarizing
  
  // Gate-specific errors
  gate_errors: string;             // JSON: {"hadamard": 0.001, "cnot": 0.01}
  
  // Metadata
  is_default: boolean;
  created_at: string;
}

// ============================================================================
// CHALLENGES TABLE (Educational)
// ============================================================================
export interface ChallengesTable {
  id: Generated<number>;
  title: string;
  description: string;
  
  // Challenge details
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;                // "algorithms", "optimization", etc.
  
  // Requirements
  max_qubits: number | null;
  max_gates: number | null;
  target_fidelity: number | null;  // 0-1
  
  // Validation
  validation_circuit_id: number | null;  // FK to circuits (solution)
  test_cases: string;              // JSON array of inputs/outputs
  
  // Rewards
  points: number;
  
  created_at: string;
}

// ============================================================================
// LEADERBOARD TABLE
// ============================================================================
export interface LeaderboardTable {
  id: Generated<number>;
  challenge_id: number;            // FK to challenges
  
  // Submission
  user_name: string;
  circuit_id: number;              // FK to circuits (user's solution)
  
  // Metrics
  score: number;                   // Based on gates, depth, fidelity
  execution_time_ms: number;
  circuit_depth: number;
  fidelity: number;
  
  // Ranking
  rank: number | null;
  
  submitted_at: string;
}

// ============================================================================
// DATABASE INTERFACE
// ============================================================================
export interface Database {
  circuits: CircuitsTable;
  executions: ExecutionsTable;
  algorithms: AlgorithmsTable;
  marketplace: MarketplaceTable;
  benchmarks: BenchmarksTable;
  noise_models: NoiseModelsTable;
  challenges: ChallengesTable;
  leaderboard: LeaderboardTable;
}

// Type helpers
export type Circuit = Selectable<CircuitsTable>;
export type NewCircuit = Insertable<CircuitsTable>;
export type CircuitUpdate = Updateable<CircuitsTable>;

export type Execution = Selectable<ExecutionsTable>;
export type NewExecution = Insertable<ExecutionsTable>;

export type Algorithm = Selectable<AlgorithmsTable>;
export type Benchmark = Selectable<BenchmarksTable>;
export type Challenge = Selectable<ChallengesTable>;
```

### Índices para Performance

```sql
-- circuits table
CREATE INDEX idx_circuits_category ON circuits(category);
CREATE INDEX idx_circuits_is_public ON circuits(is_public);
CREATE INDEX idx_circuits_rating ON circuits(rating DESC);
CREATE INDEX idx_circuits_created_at ON circuits(created_at DESC);

-- executions table
CREATE INDEX idx_executions_circuit_id ON executions(circuit_id);
CREATE INDEX idx_executions_created_at ON executions(created_at DESC);

-- marketplace table
CREATE INDEX idx_marketplace_status ON marketplace(status);
CREATE INDEX idx_marketplace_featured ON marketplace(is_featured);
CREATE INDEX idx_marketplace_downloads ON marketplace(download_count DESC);

-- algorithms table
CREATE UNIQUE INDEX idx_algorithms_slug ON algorithms(slug);
CREATE INDEX idx_algorithms_complexity ON algorithms(complexity);

-- challenges table
CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);

-- leaderboard table
CREATE INDEX idx_leaderboard_challenge ON leaderboard(challenge_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);
```

---

## 📦 Stack Tecnológico Exacto

### Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    
    "zustand": "^4.4.7",
    "zod": "^3.22.4",
    
    "@tanstack/react-query": "^5.14.0",
    "axios": "^1.6.2",
    
    "three": "^0.159.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    
    "reactflow": "^11.10.0",
    "framer-motion": "^10.16.0",
    
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    
    "mathjs": "^12.2.0",
    
    "react-dropzone": "^14.2.3",
    "react-hot-toast": "^2.4.1",
    "react-use": "^17.4.0",
    
    "cmdk": "^0.2.0",
    "vaul": "^0.9.0",
    
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/three": "^0.159.0",
    
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    
    "typescript": "^5.3.3",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    
    "vitest": "^1.0.4",
    "@testing-library/react": "^14.1.2"
  }
}
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^5.0.0",
    
    "kysely": "^0.27.0",
    "better-sqlite3": "^9.2.0",
    
    "zod": "^3.22.4",
    
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    
    "dotenv": "^16.3.1",
    
    "mathjs": "^12.2.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/better-sqlite3": "^7.6.8",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "nodemon": "^3.0.2",
    
    "vitest": "^1.0.4"
  }
}
```

---

## 🎨 Diseño Responsive - Breakpoints

```typescript
// styles/responsive.ts
export const breakpoints = {
  mobile: '320px',    // Min mobile
  tablet: '768px',    // iPad
  desktop: '1024px',  // Laptop
  wide: '1440px',     // Desktop
  ultra: '1920px'     // Ultra-wide
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`
};
```

### Layout por Dispositivo

**Desktop (1024px+):**
- Sidebar con gate palette (300px)
- Circuit canvas (flex-1)
- Visualization panel (400px)
- Layout: `grid-cols-[300px_1fr_400px]`

**Tablet (768px - 1024px):**
- Circuit canvas (fullwidth)
- Bottom drawer para gates
- Bloch sphere más pequeño (300x300)
- Layout: `flex-col`

**Mobile (<768px):**
- Circuit canvas (fullscreen)
- Bottom sheet para gates
- Bloch sphere 2D fallback
- Navigation: hamburger menu

---

## 🚀 Features por Fase de Desarrollo

### Fase 1: MVP Core (Semanas 1-2)

**Backend:**
- ✅ SQLite setup con Kysely
- ✅ CRUD básico de circuits
- ✅ Quantum simulator (8 qubits)
- ✅ 10 gates básicos (H, X, Y, Z, CNOT, T, S, Rx, Ry, Rz)
- ✅ Measurement system
- ✅ State vector calculation

**Frontend:**
- ✅ Circuit builder básico (ReactFlow)
- ✅ Gate palette
- ✅ Drag & drop gates
- ✅ Run simulation button
- ✅ Probability histogram (Chart.js)
- ✅ Basic responsive layout

**Testing:**
- ✅ Verificar matrices unitarias
- ✅ Bell state: (|00⟩ + |11⟩)/√2
- ✅ GHZ state: (|000⟩ + |111⟩)/√2

---

### Fase 2: Advanced Features (Semanas 3-4)

**Backend:**
- ✅ Aumentar a 12 qubits
- ✅ +10 gates (total 20)
- ✅ QASM parser (OpenQASM 3.0)
- ✅ Noise models (depolarizing, bit-flip)
- ✅ Marketplace CRUD
- ✅ Algorithm library

**Frontend:**
- ✅ Bloch sphere (Three.js)
- ✅ State vector table
- ✅ Marketplace browser
- ✅ Upload circuit form
- ✅ Algorithm library UI
- ✅ Grover's algorithm pre-built
- ✅ Deutsch-Jozsa pre-built

**Algorithms:**
- ✅ Grover's search (3 qubits)
- ✅ Deutsch-Jozsa
- ✅ Quantum teleportation
- ✅ Bell state preparation

---

### Fase 3: Polish & Optimization (Semana 5)

**Backend:**
- ✅ Transpiler básico (gate cancellation)
- ✅ Circuit optimizer
- ✅ Benchmarking system
- ✅ Rate limiting

**Frontend:**
- ✅ UI/UX refinement
- ✅ Animations (Framer Motion)
- ✅ Command palette (Cmd+K)
- ✅ Keyboard shortcuts
- ✅ Dark mode
- ✅ Loading states
- ✅ Error handling

**Documentation:**
- ✅ API documentation
- ✅ Tutorial básico de cuántica
- ✅ README completo
- ✅ Code comments

---

## 🧮 Implementación del Quantum Engine

### Complex Number Class

```typescript
// lib/quantum/complex.ts
export class Complex {
  constructor(
    public real: number,
    public imag: number
  ) {}

  static fromPolar(r: number, theta: number): Complex {
    return new Complex(
      r * Math.cos(theta),
      r * Math.sin(theta)
    );
  }

  add(other: Complex): Complex {
    return new Complex(
      this.real + other.real,
      this.imag + other.imag
    );
  }

  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  conjugate(): Complex {
    return new Complex(this.real, -this.imag);
  }

  magnitude(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  phase(): number {
    return Math.atan2(this.imag, this.real);
  }

  toString(): string {
    if (this.imag >= 0) {
      return `${this.real.toFixed(4)} + ${this.imag.toFixed(4)}i`;
    }
    return `${this.real.toFixed(4)} - ${Math.abs(this.imag).toFixed(4)}i`;
  }
}
```

### Gate Library

```typescript
// lib/quantum/gates.ts
import { Complex } from './complex';

export type Matrix = Complex[][];

export const GATES = {
  // Pauli gates
  I: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(1, 0)]
  ] as Matrix,

  X: [
    [new Complex(0, 0), new Complex(1, 0)],
    [new Complex(1, 0), new Complex(0, 0)]
  ] as Matrix,

  Y: [
    [new Complex(0, 0), new Complex(0, -1)],
    [new Complex(0, 1), new Complex(0, 0)]
  ] as Matrix,

  Z: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(-1, 0)]
  ] as Matrix,

  // Hadamard
  H: [
    [new Complex(1/Math.sqrt(2), 0), new Complex(1/Math.sqrt(2), 0)],
    [new Complex(1/Math.sqrt(2), 0), new Complex(-1/Math.sqrt(2), 0)]
  ] as Matrix,

  // Phase gates
  S: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(0, 1)]
  ] as Matrix,

  T: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), Complex.fromPolar(1, Math.PI/4)]
  ] as Matrix,

  // CNOT (2-qubit gate)
  CNOT: [
    [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(0, 0), new Complex(0, 0), new Complex(1, 0)],
    [new Complex(0, 0), new Complex(0, 0), new Complex(1, 0), new Complex(0, 0)]
  ] as Matrix
};

// Rotation gates (parametrized)
export function Rx(theta: number): Matrix {
  const cos = Math.cos(theta / 2);
  const sin = Math.sin(theta / 2);
  return [
    [new Complex(cos, 0), new Complex(0, -sin)],
    [new Complex(0, -sin), new Complex(cos, 0)]
  ];
}

export function Ry(theta: number): Matrix {
  const cos = Math.cos(theta / 2);
  const sin = Math.sin(theta / 2);
  return [
    [new Complex(cos, 0), new Complex(-sin, 0)],
    [new Complex(sin, 0), new Complex(cos, 0)]
  ];
}

export function Rz(theta: number): Matrix {
  return [
    [Complex.fromPolar(1, -theta/2), new Complex(0, 0)],
    [new Complex(0, 0), Complex.fromPolar(1, theta/2)]
  ];
}
```

### Quantum Simulator

```typescript
// lib/quantum/quantum-engine.ts
import { Complex } from './complex';
import { Matrix, GATES } from './gates';

export class QuantumSimulator {
  private stateVector: Complex[];
  private numQubits: number;
  private dimension: number;

  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.dimension = Math.pow(2, numQubits);
    
    // Initialize to |0...0⟩
    this.stateVector = new Array(this.dimension)
      .fill(null)
      .map((_, i) => i === 0 ? new Complex(1, 0) : new Complex(0, 0));
  }

  // Apply single-qubit gate
  applyGate(gate: Matrix, targetQubit: number): void {
    const newState: Complex[] = new Array(this.dimension)
      .fill(null)
      .map(() => new Complex(0, 0));

    for (let i = 0; i < this.dimension; i++) {
      const bit = (i >> targetQubit) & 1;
      
      for (let j = 0; j < 2; j++) {
        const newBit = j;
        const newIndex = (i & ~(1 << targetQubit)) | (newBit << targetQubit);
        
        newState[newIndex] = newState[newIndex].add(
          gate[newBit][bit].multiply(this.stateVector[i])
        );
      }
    }

    this.stateVector = newState;
  }

  // Apply two-qubit gate (CNOT, etc.)
  applyTwoQubitGate(gate: Matrix, control: number, target: number): void {
    const newState: Complex[] = new Array(this.dimension)
      .fill(null)
      .map(() => new Complex(0, 0));

    for (let i = 0; i < this.dimension; i++) {
      const controlBit = (i >> control) & 1;
      const targetBit = (i >> target) & 1;
      const oldIndex = (controlBit << 1) | targetBit;

      for (let newIndex = 0; newIndex < 4; newIndex++) {
        const newControlBit = (newIndex >> 1) & 1;
        const newTargetBit = newIndex & 1;
        
        const newStateIndex = (i & ~((1 << control) | (1 << target)))
          | (newControlBit << control)
          | (newTargetBit << target);

        newState[newStateIndex] = newState[newStateIndex].add(
          gate[newIndex][oldIndex].multiply(this.stateVector[i])
        );
      }
    }

    this.stateVector = newState;
  }

  // Measure a qubit
  measure(qubit: number): 0 | 1 {
    // Calculate probabilities
    let prob0 = 0;
    let prob1 = 0;

    for (let i = 0; i < this.dimension; i++) {
      const bit = (i >> qubit) & 1;
      const prob = this.stateVector[i].magnitude() ** 2;
      
      if (bit === 0) {
        prob0 += prob;
      } else {
        prob1 += prob;
      }
    }

    // Collapse state
    const result = Math.random() < prob0 ? 0 : 1;
    const norm = Math.sqrt(result === 0 ? prob0 : prob1);

    for (let i = 0; i < this.dimension; i++) {
      const bit = (i >> qubit) & 1;
      if (bit !== result) {
        this.stateVector[i] = new Complex(0, 0);
      } else {
        this.stateVector[i] = new Complex(
          this.stateVector[i].real / norm,
          this.stateVector[i].imag / norm
        );
      }
    }

    return result;
  }

  // Measure all qubits multiple times (shots)
  measureAll(shots: number): Record<string, number> {
    const counts: Record<string, number> = {};

    for (let shot = 0; shot < shots; shot++) {
      // Calculate probabilities
      const probs = this.stateVector.map(c => c.magnitude() ** 2);
      
      // Sample from distribution
      const rand = Math.random();
      let cumulative = 0;
      let outcome = 0;

      for (let i = 0; i < this.dimension; i++) {
        cumulative += probs[i];
        if (rand < cumulative) {
          outcome = i;
          break;
        }
      }

      // Convert to binary string
      const binary = outcome.toString(2).padStart(this.numQubits, '0');
      counts[binary] = (counts[binary] || 0) + 1;
    }

    return counts;
  }

  getStateVector(): Complex[] {
    return [...this.stateVector];
  }

  getProbabilities(): number[] {
    return this.stateVector.map(c => c.magnitude() ** 2);
  }

  reset(): void {
    this.stateVector = new Array(this.dimension)
      .fill(null)
      .map((_, i) => i === 0 ? new Complex(1, 0) : new Complex(0, 0));
  }
}
```

---

## 🎨 Tema Visual - Estilo "Quantum"

```css
/* styles/quantum-theme.css */

:root {
  /* Quantum Color Palette */
  --quantum-primary: #00D9FF;      /* Cyan brillante */
  --quantum-secondary: #9D4EDD;    /* Purple cuántico */
  --quantum-accent: #FF006E;       /* Pink energético */
  --quantum-success: #06FFA5;      /* Green neón */
  --quantum-warning: #FFD60A;      /* Yellow eléctrico */
  
  /* Dark theme base */
  --bg-primary: #0A0E27;           /* Deep space blue */
  --bg-secondary: #141B3D;
  --bg-tertiary: #1E2749;
  
  --text-primary: #E8F0FF;
  --text-secondary: #A0AEC0;
  --text-muted: #68768A;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: 20px;
  
  /* Shadows & Glows */
  --glow-quantum: 0 0 20px rgba(0, 217, 255, 0.5);
  --glow-purple: 0 0 20px rgba(157, 78, 221, 0.5);
  --shadow-elevated: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Quantum Grid Background */
body {
  background: var(--bg-primary);
  background-image: 
    linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  color: var(--text-primary);
}

/* Glassmorphism Cards */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--shadow-elevated);
}

/* Quantum Glow Effects */
.quantum-glow {
  box-shadow: var(--glow-quantum);
  transition: box-shadow 0.3s ease;
}

.quantum-glow:hover {
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.8);
}

/* Circuit Wire */
.qubit-wire {
  stroke: var(--quantum-primary);
  stroke-width: 2;
  filter: drop-shadow(0 0 4px var(--quantum-primary));
}

/* Gates */
.quantum-gate {
  fill: var(--bg-secondary);
  stroke: var(--quantum-secondary);
  stroke-width: 2;
  filter: drop-shadow(var(--glow-purple));
  transition: all 0.2s ease;
}

.quantum-gate:hover {
  stroke: var(--quantum-accent);
  transform: scale(1.05);
}

/* Typography */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@500;700&display=swap');

h1, h2, h3 {
  font-family: 'Space Grotesk', sans-serif;
  background: linear-gradient(135deg, var(--quantum-primary), var(--quantum-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

code, .monospace {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## 📊 API Routes

```typescript
// routes/circuits.ts

// GET /api/circuits - List all circuits
// Query params: ?category=algorithm&limit=10&offset=0
interface ListCircuitsQuery {
  category?: string;
  is_public?: boolean;
  limit?: number;
  offset?: number;
  sort?: 'created_at' | 'rating' | 'downloads';
}

// POST /api/circuits - Create circuit
interface CreateCircuitBody {
  name: string;
  description?: string;
  qasm: string;
  num_qubits: number;
  category: string;
  tags?: string[];
  is_public?: boolean;
}

// GET /api/circuits/:id - Get circuit details
// PATCH /api/circuits/:id - Update circuit
// DELETE /api/circuits/:id - Delete circuit

// POST /api/circuits/:id/simulate - Run simulation
interface SimulateCircuitBody {
  shots: number;              // 1-10000
  noise_model?: string;       // JSON config
  initial_state?: Complex[];  // Optional custom initial state
}

interface SimulationResponse {
  execution_id: number;
  counts: Record<string, number>;
  probabilities: Record<string, number>;
  state_vector?: Complex[];   // Only if num_qubits <= 10
  execution_time_ms: number;
}

// GET /api/marketplace - Browse marketplace
// POST /api/marketplace - Publish circuit
// GET /api/marketplace/:id - Get details
// POST /api/marketplace/:id/download - Download circuit

// GET /api/algorithms - List algorithms
// GET /api/algorithms/:slug - Get algorithm details

// POST /api/benchmarks - Run benchmark
// GET /api/benchmarks/:id - Get results
```

---

## 🧪 Testing Strategy

```typescript
// tests/quantum-engine.test.ts
describe('QuantumSimulator', () => {
  it('should create Bell state', () => {
    const sim = new QuantumSimulator(2);
    
    // Apply H to qubit 0
    sim.applyGate(GATES.H, 0);
    
    // Apply CNOT (control: 0, target: 1)
    sim.applyTwoQubitGate(GATES.CNOT, 0, 1);
    
    const state = sim.getStateVector();
    const probs = sim.getProbabilities();
    
    // Should be (|00⟩ + |11⟩)/√2
    expect(probs[0]).toBeCloseTo(0.5);  // |00⟩
    expect(probs[3]).toBeCloseTo(0.5);  // |11⟩
    expect(probs[1]).toBeCloseTo(0);    // |01⟩
    expect(probs[2]).toBeCloseTo(0);    // |10⟩
  });

  it('should verify gate unitarity', () => {
    const gates = [GATES.H, GATES.X, GATES.Y, GATES.Z];
    
    gates.forEach(gate => {
      const product = multiplyMatrices(gate, adjoint(gate));
      expect(isIdentity(product)).toBe(true);
    });
  });
});
```

---

## 📚 Algoritmos Pre-construidos

### Grover's Search Algorithm

```typescript
// lib/algorithms/grover.ts
export function createGroverCircuit(numQubits: number, targetState: number): Circuit {
  const circuit = new Circuit(numQubits);
  
  // 1. Inicializar en superposición
  for (let i = 0; i < numQubits; i++) {
    circuit.addGate('H', [i]);
  }
  
  // 2. Iteraciones de Grover
  const iterations = Math.floor(Math.PI / 4 * Math.sqrt(Math.pow(2, numQubits)));
  
  for (let iter = 0; iter < iterations; iter++) {
    // Oracle (marca el estado objetivo)
    circuit.addOracle(targetState);
    
    // Diffusion operator
    for (let i = 0; i < numQubits; i++) {
      circuit.addGate('H', [i]);
    }
    for (let i = 0; i < numQubits; i++) {
      circuit.addGate('X', [i]);
    }
    circuit.addMultiControlledZ(numQubits);
    for (let i = 0; i < numQubits; i++) {
      circuit.addGate('X', [i]);
    }
    for (let i = 0; i < numQubits; i++) {
      circuit.addGate('H', [i]);
    }
  }
  
  return circuit;
}
```

---

## 🎯 Métricas de Éxito

- [ ] Simulador funcional de 12 qubits
- [ ] 20+ gates cuánticos implementados
- [ ] 4+ algoritmos pre-construidos
- [ ] Marketplace con 30+ circuitos
- [ ] Bloch sphere 3D funcional
- [ ] Responsive en mobile/tablet/desktop
- [ ] <100ms latency en simulaciones (8 qubits)
- [ ] SQLite con 1000+ circuits
- [ ] Documentación completa
- [ ] Tests coverage >70%

---

## 🚀 Deploy a Mimo

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Deploy
# (Mimo maneja esto automáticamente)
```

---

## 📖 Referencias y Recursos

**Quantum Computing:**
- Nielsen & Chuang: "Quantum Computation and Quantum Information"
- IBM Qiskit Textbook: https://qiskit.org/textbook/
- Microsoft Q#: https://docs.microsoft.com/quantum/

**OpenQASM:**
- OpenQASM 3.0 Spec: https://github.com/openqasm/openqasm

**Visualización:**
- Bloch Sphere Math: https://en.wikipedia.org/wiki/Bloch_sphere
- Three.js Docs: https://threejs.org/docs/

---

## ✅ Checklist de Implementación

### Semana 1
- [ ] Setup proyecto (Turborepo/monorepo)
- [ ] SQLite schema + migrations
- [ ] Complex number class
- [ ] Gate library (10 gates)
- [ ] QuantumSimulator class básico
- [ ] API routes CRUD circuits
- [ ] CircuitBuilder UI básico

### Semana 2
- [ ] Drag & drop gates (ReactFlow)
- [ ] Run simulation endpoint
- [ ] Probability histogram
- [ ] Responsive layout mobile/desktop
- [ ] Testing: Bell state, GHZ state

### Semana 3
- [ ] Aumentar a 12 qubits
- [ ] +10 gates (total 20)
- [ ] Bloch sphere (Three.js)
- [ ] State vector table
- [ ] QASM parser básico

### Semana 4
- [ ] Marketplace CRUD
- [ ] Algorithm library
- [ ] Grover's algorithm
- [ ] Deutsch-Jozsa algorithm
- [ ] Noise models (depolarizing)

### Semana 5
- [ ] UI/UX polish
- [ ] Animations (Framer Motion)
- [ ] Dark mode
- [ ] Documentation
- [ ] Deploy a Mimo

---

**FIN DE ARQUITECTURA QUANTUMCLOUD**

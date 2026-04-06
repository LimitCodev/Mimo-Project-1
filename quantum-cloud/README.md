# QuantumCloud

A modern educational quantum computing simulator built with React 18 and Node.js.

## Features

- **Circuit Builder**: Drag & drop interface to build quantum circuits
- **Quantum Simulation**: Simulate up to 12 qubits with state vector computation
- **Visualization**: Bloch sphere, probability histograms, state vectors
- **Gate Library**: 20+ quantum gates (H, X, Y, Z, CNOT, T, S, Rx, Ry, Rz, etc.)
- **Dark/Light Theme**: Toggle with persisted preference
- **Multi-language**: English and Spanish support
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express 5, SQLite, Kysely
- **Visualization**: Chart.js, Three.js (Bloch sphere)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
quantum-cloud/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── lib/           # Quantum engine
│   │   ├── stores/        # State management
│   │   ├── hooks/         # React hooks
│   │   └── i18n/          # Translations
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   ├── db/            # Database
│   │   └── quantum/       # Backend engine
├── shared/            # Shared types
└── docs/              # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/circuits` | List all circuits |
| POST | `/api/circuits` | Create a circuit |
| GET | `/api/circuits/:id` | Get circuit by ID |
| POST | `/api/simulations` | Run simulation |
| GET | `/api/algorithms` | List pre-built algorithms |

## Quantum Gates

| Gate | Symbol | Description |
|------|--------|-------------|
| Hadamard | H | Creates superposition |
| Pauli-X | X | Bit flip (NOT) |
| Pauli-Y | Y | Y rotation |
| Pauli-Z | Z | Phase flip |
| CNOT | CX | Controlled NOT |
| T | T | π/4 phase |
| S | S | π/2 phase |
| Rx(θ) | Rx | X-axis rotation |
| Ry(θ) | Ry | Y-axis rotation |
| Rz(θ) | Rz | Z-axis rotation |

## License

MIT

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface AlgorithmCard {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
  numQubits: number;
  numGates: number;
  qasm: string;
  explanation: { en: string; es: string };
}

const ALGORITHMS: AlgorithmCard[] = [
  {
    id: 'bell-state',
    name: { en: 'Bell State', es: 'Estado de Bell' },
    description: { en: 'Creates entanglement: (|00⟩+|11⟩)/√2', es: 'Crea entrelazamiento: (|00⟩+|11⟩)/√2' },
    icon: '🔔',
    numQubits: 2,
    numGates: 2,
    qasm: 'OPENQASM 3.0;\nqubit[2] q;\nh q[0];\ncx q[0], q[1];',
    explanation: {
      en: 'The Bell state is the simplest example of quantum entanglement. Measuring one qubit instantly determines the other.',
      es: 'El estado de Bell es el ejemplo más simple de entrelazamiento cuántico. Medir un qubit determina instantáneamente el otro.'
    },
  },
  {
    id: 'ghz-state',
    name: { en: 'GHZ State (3 qubits)', es: 'Estado GHZ (3 qubits)' },
    description: { en: 'Creates 3-qubit entanglement: (|000⟩+|111⟩)/√2', es: 'Crea entrelazamiento de 3 qubits: (|000⟩+|111⟩)/√2' },
    icon: '🌐',
    numQubits: 3,
    numGates: 3,
    qasm: 'OPENQASM 3.0;\nqubit[3] q;\nh q[0];\ncx q[0], q[1];\ncx q[0], q[2];',
    explanation: {
      en: 'The GHZ state extends Bell state entanglement to 3+ qubits, named after Greenberger, Horne, and Zeilinger.',
      es: 'El estado GHZ extiende el entrelazamiento del estado de Bell a 3+ qubits, nombrado por Greenberger, Horne y Zeilinger.'
    },
  },
  {
    id: 'grover-2',
    name: { en: "Grover's Search (2 qubits)", es: 'Búsqueda de Grover (2 qubits)' },
    description: { en: 'Quantum search with √N speedup', es: 'Búsqueda cuántica con aceleración √N' },
    icon: '🔍',
    numQubits: 2,
    numGates: 12,
    qasm: 'OPENQASM 3.0;\nqubit[2] q;\nh q[0];\nh q[1];\ncz q[0], q[1];\nh q[0];\nh q[1];\nx q[0];\nx q[1];\ncz q[0], q[1];\nx q[0];\nx q[1];\nh q[0];\nh q[1];',
    explanation: {
      en: "Grover's algorithm finds a marked item in an unsorted database quadratically faster than classical search.",
      es: 'El algoritmo de Grover encuentra un elemento marcado en una base de datos desordenada cuadráticamente más rápido que la búsqueda clásica.'
    },
  },
  {
    id: 'teleportation',
    name: { en: 'Quantum Teleportation', es: 'Teletransportación Cuántica' },
    description: { en: 'Transfer quantum state using entanglement', es: 'Transferir estado cuántico usando entrelazamiento' },
    icon: '📡',
    numQubits: 3,
    numGates: 6,
    qasm: 'OPENQASM 3.0;\nqubit[3] q;\nh q[1];\ncx q[1], q[2];\ncx q[0], q[1];\nh q[0];\ncx q[1], q[2];\ncz q[0], q[2];',
    explanation: {
      en: 'Teleportation transfers a quantum state using classical communication and pre-shared entanglement.',
      es: 'La teletransportación transfiere un estado cuántico usando comunicación clásica y entrelazamiento pre-compartido.'
    },
  },
  {
    id: 'superposition',
    name: { en: 'Equal Superposition', es: 'Superposición Igual' },
    description: { en: 'All basis states with equal probability', es: 'Todos los estados base con probabilidad igual' },
    icon: '⚖️',
    numQubits: 4,
    numGates: 4,
    qasm: 'OPENQASM 3.0;\nqubit[4] q;\nh q[0];\nh q[1];\nh q[2];\nh q[3];',
    explanation: {
      en: 'Applying Hadamard to all qubits creates an equal superposition of all 2^n basis states.',
      es: 'Aplicar Hadamard a todos los qubits crea una superposición igual de todos los 2^n estados base.'
    },
  },
  {
    id: 'deutsch-jozsa',
    name: { en: 'Deutsch-Jozsa', es: 'Deutsch-Jozsa' },
    description: { en: 'Determine if function is constant or balanced', es: 'Determinar si función es constante o balanceada' },
    icon: '➗',
    numQubits: 3,
    numGates: 7,
    qasm: 'OPENQASM 3.0;\nqubit[3] q;\nx q[2];\nh q[0];\nh q[1];\nh q[2];\ncx q[0], q[2];\ncx q[1], q[2];\nh q[0];\nh q[1];',
    explanation: {
      en: 'Deutsch-Jozsa determines in one query whether a function is constant or balanced, exponentially faster than classical.',
      es: 'Deutsch-Jozsa determina en una consulta si una función es constante o balanceada, exponencialmente más rápido que clásico.'
    },
  },
];

interface AlgorithmsPageProps {
  onLoadCircuit: (algorithm: { name: string; numQubits: number; qasm: string }) => void;
}

export const AlgorithmsPage: React.FC<AlgorithmsPageProps> = ({ onLoadCircuit }) => {
  const { language, t } = useI18n();

  const handleLoad = (algo: AlgorithmCard) => {
    onLoadCircuit({
      name: algo.name[language],
      numQubits: algo.numQubits,
      qasm: algo.qasm,
    });
  };

  return (
    <div className="algorithms-page">
      <div className="algorithms-header">
        <h1>{t('algorithms.title')}</h1>
        <p>{t('algorithms.subtitle')}</p>
      </div>

      <div className="algorithms-grid">
        {ALGORITHMS.map((algo) => (
          <div key={algo.id} className="algorithm-card">
            <div className="algorithm-card__icon">{algo.icon}</div>
            <div className="algorithm-card__content">
              <h3 className="algorithm-card__name">{algo.name[language]}</h3>
              <p className="algorithm-card__desc">{algo.description[language]}</p>
              <div className="algorithm-card__meta">
                <span>{algo.numQubits} qubits</span>
                <span>{algo.numGates} {t('editor.gates_count')}</span>
              </div>
              <p className="algorithm-card__explanation">{algo.explanation[language]}</p>
            </div>
            <button
              className="btn btn--primary algorithm-card__load"
              onClick={() => handleLoad(algo)}
            >
              {t('algorithms.load')}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .algorithms-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .algorithms-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .algorithms-header h1 {
          font-size: 2rem;
          margin-bottom: var(--space-md);
          background: var(--gradient-quantum);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .algorithms-header p {
          color: var(--color-text-muted);
        }
        
        .algorithms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-lg);
        }
        
        .algorithm-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }
        
        .algorithm-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .algorithm-card__icon {
          font-size: 2.5rem;
          margin-bottom: var(--space-md);
        }
        
        .algorithm-card__name {
          font-size: 1.25rem;
          margin-bottom: var(--space-sm);
        }
        
        .algorithm-card__desc {
          color: var(--color-primary);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          margin-bottom: var(--space-md);
        }
        
        .algorithm-card__meta {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        
        .algorithm-card__meta span {
          padding: var(--space-xs) var(--space-sm);
          background: var(--color-surface-2);
          border-radius: var(--radius-sm);
        }
        
        .algorithm-card__explanation {
          color: var(--color-text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          flex: 1;
          margin-bottom: var(--space-lg);
        }
        
        .algorithm-card__load {
          align-self: flex-start;
        }
        
        @media (max-width: 768px) {
          .algorithms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export type { AlgorithmCard };
export default AlgorithmsPage;

import React, { useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GatePalette } from './components/circuit/GatePalette';
import { CircuitCanvas } from './components/circuit/CircuitCanvas';
import { ResultsPanel } from './components/results/ResultsPanel';
import { AlgorithmsPage } from './pages/AlgorithmsPage';
import { LearnPage } from './pages/LearnPage';
import { notify } from './components/common/Toast';
import { useCircuitStore } from '@/stores/circuitStore';
import { runSimulation, generateQASM } from '@/services/simulation';
import { parseQASM } from '@/lib/qasmParser';
import type { GateType } from '@shared/types/gate';

interface LoadCircuitData {
  name: string;
  numQubits: number;
  qasm: string;
}

/**
 * Editor Page - Main circuit builder
 */
const EditorPage: React.FC = () => {
  const {
    name,
    setName,
    numQubits,
    gates,
    isSimulating,
    clearCircuit,
    setNumQubits,
  } = useCircuitStore();

  const handleGateDragStart = useCallback((gateType: GateType) => {
    console.log(`Dragging gate: ${gateType}`);
  }, []);

  const handleRunSimulation = useCallback(async () => {
    if (gates.length === 0) {
      notify.warning('Add some gates to your circuit first!');
      return;
    }

    notify.loading('Running simulation...');

    try {
      const result = await runSimulation(1024);
      notify.simulationComplete(result.shots, result.executionTimeMs);
    } catch (error: any) {
      notify.error(`Simulation failed: ${error.message}`);
    }
  }, [gates]);

  const handleShowQASM = useCallback(() => {
    if (gates.length === 0) {
      notify.warning('Add some gates first!');
      return;
    }

    const qasm = generateQASM();

    // Copy to clipboard
    navigator.clipboard.writeText(qasm).then(() => {
      notify.success('QASM code copied to clipboard!');
    }).catch(() => {
      notify.info('QASM generated - check console');
      console.log('QASM:\n', qasm);
    });
  }, [gates]);

  const handleSave = useCallback(() => {
    if (gates.length === 0) {
      notify.warning('Add some gates first!');
      return;
    }

    const qasm = generateQASM();

    // Create download file
    const blob = new Blob([qasm], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}.qasm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    notify.success(`Circuit "${name}" downloaded!`);
  }, [name, gates]);

  const handleClear = useCallback(() => {
    clearCircuit();
    notify.info('Circuit cleared');
  }, [clearCircuit]);

  return (
    <div className="editor">
      <aside className="editor__sidebar">
        <h2 className="editor__sidebar-title">Gates</h2>
        <GatePalette onGateDragStart={handleGateDragStart} />
      </aside>

      <main className="editor__canvas">
        <div className="editor__toolbar">
          <div className="editor__circuit-info">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="editor__circuit-name"
              placeholder="Circuit name"
            />
            <span className="editor__qubit-count">{numQubits} qubits</span>
            {gates.length > 0 && (
              <span className="editor__gate-count">{gates.length} gates</span>
            )}
          </div>
          <div className="editor__actions">
            <button
              className="btn btn--ghost"
              onClick={handleClear}
              disabled={gates.length === 0}
            >
              🗑️ Clear
            </button>
            <button
              className="btn btn--secondary"
              onClick={handleShowQASM}
              disabled={gates.length === 0}
            >
              📋 QASM
            </button>
            <button
              className="btn btn--secondary"
              onClick={handleSave}
              disabled={gates.length === 0}
            >
              💾 Save
            </button>
            <button
              className="btn btn--primary"
              onClick={handleRunSimulation}
              disabled={isSimulating || gates.length === 0}
            >
              {isSimulating ? '⏳ Running...' : '▶️ Run'}
            </button>
          </div>
        </div>

        <div className="editor__circuit-area">
          <CircuitCanvas />
        </div>
      </main>

      <aside className="editor__results">
        <h2 className="editor__results-title">Results</h2>
        <ResultsPanel />
      </aside>

      <style>{`
        .editor {
          display: grid;
          grid-template-columns: 280px 1fr 320px;
          gap: var(--space-lg);
          height: calc(100vh - 180px);
        }
        
        .editor__sidebar {
          overflow-y: auto;
        }
        
        .editor__sidebar-title,
        .editor__results-title {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: var(--space-md);
        }
        
        .editor__canvas {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .editor__toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) var(--space-lg);
          border-bottom: 1px solid var(--color-border);
          flex-wrap: wrap;
          gap: var(--space-md);
        }
        
        .editor__circuit-info {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        
        .editor__circuit-name {
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: 1.125rem;
          font-weight: 600;
          padding: var(--space-sm);
          border-radius: var(--radius-sm);
          max-width: 200px;
        }
        
        .editor__circuit-name:hover {
          background: var(--color-surface-2);
        }
        
        .editor__circuit-name:focus {
          outline: 2px solid var(--color-primary);
          background: var(--color-surface-2);
        }
        
        .editor__qubit-count,
        .editor__gate-count {
          color: var(--color-text-muted);
          font-size: 0.875rem;
          padding: var(--space-xs) var(--space-sm);
          background: var(--color-surface-2);
          border-radius: var(--radius-sm);
        }
        
        .editor__gate-count {
          color: var(--color-primary);
        }
        
        .editor__actions {
          display: flex;
          gap: var(--space-sm);
        }
        
        .editor__circuit-area {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        
        .editor__results {
          overflow-y: auto;
        }
        
        .btn--ghost {
          background: transparent;
          color: var(--color-text-muted);
        }
        
        .btn--ghost:hover:not(:disabled) {
          background: var(--color-surface-2);
          color: var(--color-text);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 1200px) {
          .editor {
            grid-template-columns: 240px 1fr;
          }
          .editor__results {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .editor {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          .editor__sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * QuantumCloud App - Main component with routing
 */
function App() {
  const navigate = useNavigate();
  const { setName, setNumQubits, clearCircuit, addGate } = useCircuitStore();

  // Handle loading algorithm into editor
  const handleLoadAlgorithm = useCallback((algorithm: LoadCircuitData) => {
    clearCircuit();
    setName(algorithm.name);

    // Parse QASM and add gates
    const parsed = parseQASM(algorithm.qasm);
    setNumQubits(parsed.numQubits);

    // Add each gate to the circuit
    for (const gate of parsed.gates) {
      addGate(gate);
    }

    notify.success(`Loaded "${algorithm.name}" - ${parsed.numQubits} qubits, ${parsed.gates.length} gates`);
    navigate('/');
  }, [clearCircuit, setName, setNumQubits, addGate, navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/algorithms" element={<AlgorithmsPage onLoadCircuit={handleLoadAlgorithm} />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

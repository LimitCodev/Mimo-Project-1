import React, { useCallback, useState, useMemo } from 'react';
import { useCircuitStore, type PlacedGate } from '@/stores/circuitStore';
import { GATE_DEFINITIONS, type GateType } from '@shared/types/gate';
import './CircuitCanvas.css';

interface CircuitCanvasProps {
    className?: string;
}

/**
 * CircuitCanvas - Visual quantum circuit builder
 * Supports drag & drop gate placement
 */
export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({ className }) => {
    const {
        numQubits,
        gates,
        addGate,
        removeGate,
        setNumQubits,
    } = useCircuitStore();

    const [hoveredCell, setHoveredCell] = useState<{ qubit: number; column: number } | null>(null);
    const [showQubitMenu, setShowQubitMenu] = useState(false);

    // Calculate circuit depth (number of columns)
    const circuitDepth = useMemo(() => {
        if (gates.length === 0) return 8; // Default visible columns
        return Math.max(8, Math.max(...gates.map(g => g.column)) + 3);
    }, [gates]);

    // Handle drop on cell
    const handleDrop = useCallback((e: React.DragEvent, qubitIndex: number, column: number) => {
        e.preventDefault();
        const gateType = e.dataTransfer.getData('gateType') as GateType;

        if (!gateType) return;

        const gateDef = GATE_DEFINITIONS[gateType];
        if (!gateDef) return;

        // For two-qubit gates, need to specify control
        if (gateDef.numQubits === 2) {
            const controlQubit = qubitIndex === 0 ? 1 : 0;
            addGate({
                type: gateType,
                qubit: qubitIndex,
                controlQubit,
                column,
            });
        } else if (gateDef.hasAngle) {
            // Default angle for rotation gates
            addGate({
                type: gateType,
                qubit: qubitIndex,
                column,
                angle: Math.PI / 4, // Default to π/4
            });
        } else {
            addGate({
                type: gateType,
                qubit: qubitIndex,
                column,
            });
        }

        setHoveredCell(null);
    }, [addGate]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    const handleDragEnter = useCallback((qubit: number, column: number) => {
        setHoveredCell({ qubit, column });
    }, []);

    const handleDragLeave = useCallback(() => {
        setHoveredCell(null);
    }, []);

    // Get gate at specific position
    const getGateAt = useCallback((qubit: number, column: number): PlacedGate | undefined => {
        return gates.find(g =>
            g.column === column &&
            (g.qubit === qubit || g.controlQubit === qubit)
        );
    }, [gates]);

    // Render gate cell
    const renderGateCell = (gate: PlacedGate, qubit: number) => {
        const isTarget = gate.qubit === qubit;
        const isControl = gate.controlQubit === qubit;
        const gateDef = GATE_DEFINITIONS[gate.type];

        if (isControl) {
            // Render control dot
            return (
                <div
                    className="gate-cell gate-cell--control"
                    onClick={() => removeGate(gate.id)}
                    title="Control qubit (click to remove)"
                >
                    <div className="control-dot" />
                </div>
            );
        }

        // Render gate box
        return (
            <div
                className={`gate-cell gate-cell--gate gate-cell--${gate.type.toLowerCase()}`}
                onClick={() => removeGate(gate.id)}
                title={`${gateDef?.name || gate.type} (click to remove)`}
            >
                <span className="gate-symbol">{gateDef?.symbol || gate.type}</span>
                {gate.angle !== undefined && (
                    <span className="gate-angle">{(gate.angle / Math.PI).toFixed(2)}π</span>
                )}
            </div>
        );
    };

    return (
        <div className={`circuit-canvas ${className || ''}`}>
            <div className="circuit-header">
                <div className="qubit-controls">
                    <button
                        className="qubit-btn"
                        onClick={() => setNumQubits(Math.max(1, numQubits - 1))}
                        disabled={numQubits <= 1}
                    >
                        −
                    </button>
                    <span className="qubit-count">{numQubits} qubits</span>
                    <button
                        className="qubit-btn"
                        onClick={() => setNumQubits(Math.min(8, numQubits + 1))}
                        disabled={numQubits >= 8}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="circuit-grid-container">
                <div className="circuit-grid">
                    {/* Qubit labels */}
                    <div className="qubit-labels">
                        {Array.from({ length: numQubits }, (_, i) => (
                            <div key={i} className="qubit-label">
                                |q<sub>{i}</sub>⟩
                            </div>
                        ))}
                    </div>

                    {/* Circuit wires and gates */}
                    <div className="circuit-wires">
                        {Array.from({ length: numQubits }, (_, qubitIndex) => (
                            <div key={qubitIndex} className="qubit-wire">
                                {/* Wire line */}
                                <div className="wire-line" />

                                {/* Gate cells */}
                                <div className="gate-cells">
                                    {Array.from({ length: circuitDepth }, (_, column) => {
                                        const gate = getGateAt(qubitIndex, column);
                                        const isHovered = hoveredCell?.qubit === qubitIndex &&
                                            hoveredCell?.column === column;

                                        return (
                                            <div
                                                key={column}
                                                className={`gate-slot ${isHovered ? 'gate-slot--hover' : ''} ${gate ? 'gate-slot--occupied' : ''}`}
                                                onDrop={(e) => handleDrop(e, qubitIndex, column)}
                                                onDragOver={handleDragOver}
                                                onDragEnter={() => handleDragEnter(qubitIndex, column)}
                                                onDragLeave={handleDragLeave}
                                            >
                                                {gate ? (
                                                    renderGateCell(gate, qubitIndex)
                                                ) : (
                                                    <div className="gate-placeholder" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Vertical lines for two-qubit gates */}
                        <svg className="gate-connections">
                            {gates
                                .filter(g => g.controlQubit !== undefined)
                                .map(gate => {
                                    const minQubit = Math.min(gate.qubit, gate.controlQubit!);
                                    const maxQubit = Math.max(gate.qubit, gate.controlQubit!);
                                    const x = 50 + gate.column * 50;
                                    const y1 = 25 + minQubit * 50;
                                    const y2 = 25 + maxQubit * 50;

                                    return (
                                        <line
                                            key={gate.id}
                                            x1={x}
                                            y1={y1}
                                            x2={x}
                                            y2={y2}
                                            className="gate-connection-line"
                                        />
                                    );
                                })}
                        </svg>
                    </div>
                </div>
            </div>

            {gates.length === 0 && (
                <div className="circuit-empty">
                    <div className="empty-icon">⚛️</div>
                    <p>Drag gates from the palette to build your circuit</p>
                    <p className="empty-hint">Or load an example from Algorithms</p>
                </div>
            )}
        </div>
    );
};

export default CircuitCanvas;

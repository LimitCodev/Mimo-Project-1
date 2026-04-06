import React, { useState } from 'react';
import { GATE_DEFINITIONS, type GateType } from '@shared/types/gate';
import { useI18n } from '@/lib/i18n';

interface GatePaletteProps {
    onGateDragStart: (gateType: GateType) => void;
    category?: 'all' | 'single' | 'two-qubit' | 'rotation';
}

/**
 * Gate palette component for drag-and-drop circuit building.
 * Displays available quantum gates organized by category.
 */
export const GatePalette: React.FC<GatePaletteProps> = ({
    onGateDragStart,
    category = 'all',
}) => {
    const { t } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const singleQubitGates: GateType[] = ['H', 'X', 'Y', 'Z', 'S', 'T', 'I'];
    const twoQubitGates: GateType[] = ['CNOT', 'CZ', 'SWAP'];
    const rotationGates: GateType[] = ['Rx', 'Ry', 'Rz'];

    const getGatesForCategory = (): GateType[] => {
        switch (category) {
            case 'single':
                return singleQubitGates;
            case 'two-qubit':
                return twoQubitGates;
            case 'rotation':
                return rotationGates;
            default:
                return [...singleQubitGates, ...twoQubitGates, ...rotationGates];
        }
    };

    const gates = getGatesForCategory().filter((gate) => {
        if (!searchQuery) return true;
        const info = GATE_DEFINITIONS[gate];
        return (
            gate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            info?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleDragStart = (
        e: React.DragEvent<HTMLButtonElement>,
        gateType: GateType
    ) => {
        e.dataTransfer.setData('gateType', gateType);
        e.dataTransfer.effectAllowed = 'copy';
        onGateDragStart(gateType);
    };

    const renderGateButton = (gate: GateType) => (
        <button
            key={gate}
            className={`gate-palette__gate gate-palette__gate--${gate.toLowerCase()}`}
            draggable
            onDragStart={(e) => handleDragStart(e, gate)}
            title={GATE_DEFINITIONS[gate]?.description || gate}
        >
            <span className="gate-palette__gate-symbol">
                {GATE_DEFINITIONS[gate]?.symbol || gate}
            </span>
            <span className="gate-palette__gate-name">{gate}</span>
        </button>
    );

    return (
        <div className="gate-palette">
            <div className="gate-palette__search">
                <input
                    type="text"
                    placeholder={t('editor.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="gate-palette__search-input"
                />
            </div>

            <div className="gate-palette__section">
                <h3 className="gate-palette__section-title">{t('editor.single_qubit')}</h3>
                <div className="gate-palette__grid">
                    {gates
                        .filter((g) => singleQubitGates.includes(g))
                        .map(renderGateButton)}
                </div>
            </div>

            <div className="gate-palette__section">
                <h3 className="gate-palette__section-title">{t('editor.two_qubit')}</h3>
                <div className="gate-palette__grid">
                    {gates
                        .filter((g) => twoQubitGates.includes(g))
                        .map(renderGateButton)}
                </div>
            </div>

            <div className="gate-palette__section">
                <h3 className="gate-palette__section-title">{t('editor.rotation')}</h3>
                <div className="gate-palette__grid">
                    {gates
                        .filter((g) => rotationGates.includes(g))
                        .map(renderGateButton)}
                </div>
            </div>
        </div>
    );
};

export default GatePalette;


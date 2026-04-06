import React, { useMemo } from 'react';
import { useCircuitStore } from '@/stores/circuitStore';
import { useI18n } from '@/lib/i18n';
import './ResultsPanel.css';

interface ResultsPanelProps {
    className?: string;
}

/**
 * ResultsPanel - Displays simulation results with histogram
 */
export const ResultsPanel: React.FC<ResultsPanelProps> = ({ className }) => {
    const { results, isSimulating, error } = useCircuitStore();
    const { t } = useI18n();

    // Sort results by probability (descending)
    const sortedResults = useMemo(() => {
        if (!results) return [];
        return Object.entries(results.probabilities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 16); // Show top 16 states
    }, [results]);

    // Find max probability for scaling
    const maxProb = useMemo(() => {
        if (sortedResults.length === 0) return 1;
        return Math.max(...sortedResults.map(([_, p]) => p));
    }, [sortedResults]);

    if (isSimulating) {
        return (
            <div className={`results-panel ${className || ''}`}>
                <div className="results-loading">
                    <div className="loading-spinner" />
                    <p>{t('editor.running')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`results-panel ${className || ''}`}>
                <div className="results-error">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className={`results-panel ${className || ''}`}>
                <div className="results-empty">
                    <span className="empty-icon">📊</span>
                    <p>{t('results.empty')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`results-panel ${className || ''}`}>
            <div className="results-header">
                <h3>{t('results.title')}</h3>
                <span className="results-meta">
                    {results.shots} {t('results.shots')} • {results.executionTimeMs}ms
                </span>
            </div>

            <div className="results-histogram">
                {sortedResults.map(([state, probability]) => (
                    <div key={state} className="histogram-bar">
                        <div className="bar-label">
                            <span className="state-label">|{state}⟩</span>
                            <span className="prob-label">{(probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="bar-container">
                            <div
                                className="bar-fill"
                                style={{ width: `${(probability / maxProb) * 100}%` }}
                            />
                            <span className="bar-count">
                                {results.counts[state] || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {results.stateVector && results.stateVector.length > 0 && (
                <div className="state-vector-section">
                    <h4>{t('results.state_vector')}</h4>
                    <div className="state-vector-list">
                        {results.stateVector.map(({ state, probability }) => (
                            <div key={state} className="state-entry">
                                <span className="state-ket">|{state}⟩</span>
                                <span className="state-prob">
                                    {(Math.sqrt(probability)).toFixed(4)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsPanel;


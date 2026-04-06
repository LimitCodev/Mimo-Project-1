import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { ToastProvider } from '../common/Toast';
import { useI18n } from '@/lib/i18n';

interface LayoutProps {
    children: ReactNode;
}

type Theme = 'dark' | 'light';

/**
 * Main application layout with responsive design.
 * Implements dark mode and language switching.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const { language, setLanguage, t } = useI18n();
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as Theme) || 'dark';
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <ErrorBoundary>
            <div className="layout">
                <header className="layout__header">
                    <Link to="/" className="layout__logo">
                        <span className="layout__logo-icon">⚛️</span>
                        <span className="layout__logo-text">QuantumCloud</span>
                    </Link>
                    <nav className="layout__nav">
                        <Link
                            to="/"
                            className={`layout__nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            {t('nav.editor')}
                        </Link>
                        <Link
                            to="/algorithms"
                            className={`layout__nav-link ${isActive('/algorithms') ? 'active' : ''}`}
                        >
                            {t('nav.algorithms')}
                        </Link>
                        <Link
                            to="/learn"
                            className={`layout__nav-link ${isActive('/learn') ? 'active' : ''}`}
                        >
                            {t('nav.learn')}
                        </Link>
                    </nav>
                    <div className="layout__actions">
                        <button
                            className="layout__theme-toggle"
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            title={theme === 'dark' ? t('theme.dark') : t('theme.light')}
                        >
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </button>
                        <button
                            className="layout__lang-toggle"
                            aria-label="Toggle language"
                            onClick={toggleLanguage}
                            title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                        >
                            {language.toUpperCase()}
                        </button>
                    </div>
                </header>

                <main className="layout__main">
                    {children}
                </main>

                <footer className="layout__footer">
                    <p>{t('footer.copyright')}</p>
                </footer>

                <ToastProvider />
            </div>
        </ErrorBoundary>
    );
};

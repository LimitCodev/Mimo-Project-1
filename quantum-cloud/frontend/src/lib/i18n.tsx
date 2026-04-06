import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

// Translation dictionary
const translations = {
    en: {
        // Navigation
        'nav.editor': 'Editor',
        'nav.algorithms': 'Algorithms',
        'nav.learn': 'Learn',

        // Footer
        'footer.copyright': 'QuantumCloud © 2026 | Educational Quantum Computing Simulator',

        // Editor
        'editor.gates': 'Gates',
        'editor.results': 'Results',
        'editor.clear': 'Clear',
        'editor.save': 'Save',
        'editor.run': 'Run',
        'editor.running': 'Running...',
        'editor.qubits': 'qubits',
        'editor.gates_count': 'gates',
        'editor.search': 'Search gates...',
        'editor.single_qubit': 'Single Qubit',
        'editor.two_qubit': 'Two Qubit',
        'editor.rotation': 'Rotation',
        'editor.new_circuit': 'New Circuit',

        // Results
        'results.title': 'Results',
        'results.shots': 'shots',
        'results.empty': 'Run a simulation to see results',
        'results.state_vector': 'State Vector',

        // Algorithms page
        'algorithms.title': 'Quantum Algorithms',
        'algorithms.subtitle': 'Pre-built circuits for famous quantum algorithms. Click to load in the editor.',
        'algorithms.load': 'Load Circuit →',

        // Learn page
        'learn.title': 'Learn Quantum Computing',
        'learn.contents': 'Contents',
        'learn.roadmap': 'Learning Roadmap',
        'learn.roadmap_subtitle': 'Your path to mastering quantum computing',

        // Roadmap
        'roadmap.fundamentals': 'Fundamentals',
        'roadmap.fundamentals_desc': 'Start here! Learn the basic concepts.',
        'roadmap.gates': 'Quantum Gates',
        'roadmap.gates_desc': 'Master single and multi-qubit operations.',
        'roadmap.algorithms': 'Algorithms',
        'roadmap.algorithms_desc': 'Explore famous quantum algorithms.',
        'roadmap.advanced': 'Advanced Topics',
        'roadmap.advanced_desc': 'Deep dive into quantum theory.',

        // Toasts
        'toast.circuit_cleared': 'Circuit cleared',
        'toast.qasm_copied': 'QASM code copied to clipboard!',
        'toast.circuit_downloaded': 'Circuit downloaded!',
        'toast.add_gates': 'Add some gates first!',
        'toast.simulation_failed': 'Simulation failed',
        'toast.circuit_loaded': 'Circuit loaded',

        // Theme
        'theme.dark': 'Switch to light mode',
        'theme.light': 'Switch to dark mode',
    },
    es: {
        // Navegación
        'nav.editor': 'Editor',
        'nav.algorithms': 'Algoritmos',
        'nav.learn': 'Aprender',

        // Footer
        'footer.copyright': 'QuantumCloud © 2026 | Simulador de Computación Cuántica Educativo',

        // Editor
        'editor.gates': 'Compuertas',
        'editor.results': 'Resultados',
        'editor.clear': 'Limpiar',
        'editor.save': 'Guardar',
        'editor.run': 'Ejecutar',
        'editor.running': 'Ejecutando...',
        'editor.qubits': 'qubits',
        'editor.gates_count': 'compuertas',
        'editor.search': 'Buscar compuertas...',
        'editor.single_qubit': 'Un Qubit',
        'editor.two_qubit': 'Dos Qubits',
        'editor.rotation': 'Rotación',
        'editor.new_circuit': 'Nuevo Circuito',

        // Resultados
        'results.title': 'Resultados',
        'results.shots': 'disparos',
        'results.empty': 'Ejecuta una simulación para ver resultados',
        'results.state_vector': 'Vector de Estado',

        // Página de algoritmos
        'algorithms.title': 'Algoritmos Cuánticos',
        'algorithms.subtitle': 'Circuitos pre-construidos de algoritmos cuánticos famosos. Haz clic para cargar en el editor.',
        'algorithms.load': 'Cargar Circuito →',

        // Página de aprendizaje
        'learn.title': 'Aprende Computación Cuántica',
        'learn.contents': 'Contenido',
        'learn.roadmap': 'Ruta de Aprendizaje',
        'learn.roadmap_subtitle': 'Tu camino para dominar la computación cuántica',

        // Roadmap
        'roadmap.fundamentals': 'Fundamentos',
        'roadmap.fundamentals_desc': '¡Empieza aquí! Aprende los conceptos básicos.',
        'roadmap.gates': 'Compuertas Cuánticas',
        'roadmap.gates_desc': 'Domina operaciones de uno y múltiples qubits.',
        'roadmap.algorithms': 'Algoritmos',
        'roadmap.algorithms_desc': 'Explora algoritmos cuánticos famosos.',
        'roadmap.advanced': 'Temas Avanzados',
        'roadmap.advanced_desc': 'Profundiza en la teoría cuántica.',

        // Toasts
        'toast.circuit_cleared': 'Circuito limpiado',
        'toast.qasm_copied': '¡Código QASM copiado!',
        'toast.circuit_downloaded': '¡Circuito descargado!',
        'toast.add_gates': '¡Agrega algunas compuertas primero!',
        'toast.simulation_failed': 'Simulación fallida',
        'toast.circuit_loaded': 'Circuito cargado',

        // Tema
        'theme.dark': 'Cambiar a modo claro',
        'theme.light': 'Cambiar a modo oscuro',
    },
} as const;

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

export { translations };

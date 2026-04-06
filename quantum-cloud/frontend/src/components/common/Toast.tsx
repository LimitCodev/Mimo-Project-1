import { Toaster, toast } from 'react-hot-toast';

/**
 * Toast notification configuration and utilities
 */
export const ToastProvider = () => (
    <Toaster
        position="bottom-right"
        toastOptions={{
            duration: 4000,
            style: {
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
                iconTheme: {
                    primary: 'var(--color-success)',
                    secondary: 'var(--color-surface)',
                },
            },
            error: {
                iconTheme: {
                    primary: 'var(--color-error)',
                    secondary: 'var(--color-surface)',
                },
                duration: 5000,
            },
        }}
    />
);

/**
 * Pre-configured toast notifications
 */
export const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    loading: (message: string) => toast.loading(message),
    warning: (message: string) => toast(message, { icon: '⚠️' }),
    info: (message: string) => toast(message, { icon: 'ℹ️' }),

    simulationComplete: (shots: number, timeMs: number) =>
        toast.success(`Simulation complete! ${shots} shots in ${timeMs}ms`),

    circuitSaved: (name: string) =>
        toast.success(`Circuit "${name}" saved successfully`),

    circuitDeleted: () =>
        toast.success('Circuit deleted'),

    apiError: (error: string) =>
        toast.error(`API Error: ${error}`),

    validationError: (field: string) =>
        toast.error(`Invalid ${field}`),

    clipboard: () =>
        toast.success('Copied to clipboard'),
};

export { toast };

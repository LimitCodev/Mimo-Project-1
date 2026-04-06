/**
 * API request/response types
 */

import { Circuit, SimulationResult } from './circuit';

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

/**
 * Circuit list response
 */
export type CircuitListResponse = ApiResponse<PaginatedResponse<Circuit>>;

/**
 * Circuit detail response
 */
export type CircuitResponse = ApiResponse<Circuit>;

/**
 * Simulation response
 */
export type SimulationResponse = ApiResponse<SimulationResult>;

/**
 * Algorithm info
 */
export interface Algorithm {
    id: string;
    name: string;
    slug: string;
    description: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    timeComplexity: string;
    spaceComplexity: string;
    circuitId: string;
}

/**
 * Algorithm list response
 */
export type AlgorithmListResponse = ApiResponse<Algorithm[]>;

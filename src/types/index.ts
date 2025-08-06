// Central export file for all types
export * from './user';
export * from './api';

// Common utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}
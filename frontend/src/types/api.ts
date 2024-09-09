
export interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  executionTime: number;
}
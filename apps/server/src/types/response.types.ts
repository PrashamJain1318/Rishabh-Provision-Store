// Standardized API Response Interface Definitions

export interface ApiResponseSuccess<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ApiResponseError<E = any> {
  success: false;
  message: string;
  error?: E;
}

export type ApiResponse<T = any, E = any> = ApiResponseSuccess<T> | ApiResponseError<E>;

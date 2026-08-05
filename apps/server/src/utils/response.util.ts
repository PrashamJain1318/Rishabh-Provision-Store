// Standardized API Response Helper Utilities
import { ApiResponseSuccess, ApiResponseError } from "../types/response.types";

/**
 * Generates a standardized success API response object.
 * @param message Human-readable success message
 * @param data Response payload
 */
export function successResponse<T = any>(message: string, data: T = {} as T): ApiResponseSuccess<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Generates a standardized error API response object.
 * @param message Human-readable error message
 * @param error Details object or stack information
 */
export function errorResponse<E = any>(message: string, error: E = {} as E): ApiResponseError<E> {
  return {
    success: false,
    message,
    error,
  };
}

import { NextFunction, Request, Response } from "express";

/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * The asyncHandler function wraps API routes and propagates promise errors into an error handler. 
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

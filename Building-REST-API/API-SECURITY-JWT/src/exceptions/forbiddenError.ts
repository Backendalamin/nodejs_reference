//handles 403 errors
import { CustomError } from "./customError";
export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

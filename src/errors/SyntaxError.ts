import { KexraError } from './KexraError';

export class SyntaxError extends KexraError {
  constructor(message: string, file?: string, line?: number, column?: number, hint?: string) {
    super(message, file, line, column, hint);
    this.name = 'SyntaxError';
  }
}
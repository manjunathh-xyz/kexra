"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxError = void 0;
const KexraError_1 = require("./KexraError");
class SyntaxError extends KexraError_1.KexraError {
    constructor(message, file, line, column, hint) {
        super(message, file, line, column, hint);
        this.name = 'SyntaxError';
    }
}
exports.SyntaxError = SyntaxError;

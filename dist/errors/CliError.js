"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliError = void 0;
const KexraError_1 = require("./KexraError");
class CliError extends KexraError_1.KexraError {
    constructor(message, file, line, column, hint) {
        super(message, file, line, column, hint);
        this.name = 'CliError';
    }
}
exports.CliError = CliError;

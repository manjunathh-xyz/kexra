// Runtime bridge for browser - bundles Kexra runtime for in-browser execution
import { KexraRuntime } from '../../src/runtime/runtime';
import { Value } from '../../src/runtime/values';

export class BrowserRuntime {
  private runtime: KexraRuntime;
  private output: string[] = [];
  private errors: string[] = [];
  private traces: string[] = [];

  constructor(options: { debug?: boolean; trace?: boolean } = {}) {
    this.runtime = new KexraRuntime(options);

    this.runtime.on('call', (data) => {
      this.traces.push(`call ${data.function}(${data.args.join(', ')})`);
    });

    this.runtime.on('return', (data) => {
      this.traces.push(`return ${data.value}`);
    });

    this.runtime.on('error', (data) => {
      this.errors.push(data.message);
    });
  }

  eval(code: string): { success: boolean; output?: string; error?: string } {
    this.output = [];
    this.errors = [];
    this.traces = [];

    // Override console.log for output capture
    const originalLog = console.log;
    console.log = (...args) => {
      this.output.push(args.join(' '));
    };

    try {
      const result = this.runtime.eval(code);
      return {
        success: result.success,
        output: this.output.join('\n'),
        error: result.error,
      };
    } finally {
      console.log = originalLog;
    }
  }

  getTraces(): string[] {
    return [...this.traces];
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  reset(): void {
    this.output = [];
    this.errors = [];
    this.traces = [];
  }
}
# Kexra Studio

Kexra Studio is a web-based integrated development environment (IDE) for writing, running, and debugging Kexra code directly in your browser.

## Features

- **Code Editor**: Syntax-highlighted editing with Monaco Editor
- **Run / Reset Buttons**: Execute code instantly or clear output
- **Output Panel**: View program output
- **Error Panel**: Display runtime errors
- **Trace Panel**: Show execution traces (calls and returns)
- **REPL Panel**: Interactive code evaluation
- **Examples**: Pre-built code samples to get started
- **Trace Toggle**: Enable/disable execution tracing

## Getting Started

1. Visit the hosted Kexra Studio at [studio.kexra.dev](https://studio.kexra.dev) (or open `studio/index.html` locally)
2. Write or load example code in the editor
3. Click "Run" to execute
4. View output, errors, and traces in the panels
5. Use the REPL for quick experiments
6. Toggle trace mode to see execution flow

## Interface

```
┌─────────────────┬─────────────────┐
│ Code Editor     │ Output / Error  │
├─────────────────┴─────────────────┤
│ REPL                              │
└───────────────────────────────────┘
```

## Examples

Kexra Studio includes several example programs:

- **Hello World**: Basic output and variables
- **Functions**: Defining and calling functions
- **Loops**: For loops and while loops

## Browser Compatibility

Kexra Studio works in modern browsers that support:

- ES6 modules
- Monaco Editor
- Modern JavaScript APIs

## Development

The studio uses the same Kexra Runtime as the CLI and REPL, ensuring consistent behavior across all platforms.

## Limitations

- MVP version uses mock runtime
- Full runtime integration planned for future releases
- No file system access (browser security)
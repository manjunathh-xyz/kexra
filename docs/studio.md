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

## Interface

Kexra Studio features a VS Code–inspired interface:

```
┌─────────────────────────────────────────────────┐
│ Toolbar: Run | Reset                           │
├─────────┬───────────────────────────────────────┤
│ Explorer│ Code Editor                           │
│         │                                       │
│         │                                       │
├─────────┴─────────────────────┬─────────────────┤
│ Output / Errors / Trace       │ REPL            │
└───────────────────────────────┴─────────────────┘
```

## Getting Started

1. Visit the hosted Kexra Studio at [studio.kexra.dev](https://studio.kexra.dev)
2. Browse examples in the sidebar
3. Edit code in the Monaco editor
4. Run with toolbar button or `Ctrl+Enter`
5. View results in bottom panels
6. Use REPL for interactive coding

## Features

### Editor
- Monaco Editor with syntax highlighting
- Dark theme (VS Code–like)
- Line numbers and bracket matching
- Code folding and auto-indentation

### Panels
- **Output**: Program execution results
- **Errors**: Runtime errors and diagnostics
- **Trace**: Function call/return tracing

### REPL
- Interactive command execution
- Command history (arrow keys)
- Clear button

### Keyboard Shortcuts
- `Ctrl+Enter`: Run code
- `Ctrl+S`: Virtual save
- `Ctrl+/`: Toggle line comment
- `Ctrl+Shift+P`: Command palette
- `Esc`: Close palette/panel

### Command Palette
Access with `Ctrl+Shift+P`:
- Run File
- Reset Runtime
- Clear Output
- Switch Theme
- Open Docs

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
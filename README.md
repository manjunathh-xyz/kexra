# 🚀 Yolang

> A playful, beginner-friendly scripting language built with TypeScript

[![npm version](https://img.shields.io/npm/v/yolang.svg)](https://www.npmjs.com/package/yolang)
[![GitHub license](https://img.shields.io/github/license/manjunathh-xyz/yolang)](https://github.com/manjunathh-xyz/yolang/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/manjunathh-xyz/yolang/ci.yml)](https://github.com/manjunathh-xyz/yolang/actions)

Yolang is a simple interpreted scripting language designed for beginners, hobbyists, and anyone interested in language design. It's built with TypeScript and runs on Node.js, offering a fun way to explore programming language concepts.

## ✨ Features

- 🎯 **Easy Syntax**: Inspired by casual developer English
- ⚡ **Interpreted**: Instant feedback with no compilation step
- 🖥️ **Interactive REPL**: Experiment in real-time
- 🔧 **Extensible**: Open-source and built for learning
- 📚 **Educational**: Perfect for understanding language internals

## 📦 Installation

### From npm (Recommended)

```bash
npm install -g yolang
```

### From Source

```bash
git clone https://github.com/manjunathh-xyz/yolang.git
cd yolang
npm install
npm run build
```

## 🚀 Quick Start

### Hello World

Create a file `hello.yo`:

```yo
say "Hello, Yolang!"
```

Run it:

```bash
yo run hello.yo
```

Output:
```
🚀 Yolang v0.2.0
Running: hello.yo
──────────────────────────
Hello, Yolang!
```

### Interactive REPL

```bash
yo repl
```

```
🎧 Yolang REPL v0.2.0
Type 'help' for commands, 'exit' to quit
yo> set x = 42
yo> say x
42
yo> exit
Goodbye!
```

## 📖 Syntax

### Variables

```yo
set name = "Yolang"
set age = 25
```

### Output

```yo
say "Hello World"
say name + " is " + age + " years old"
```

### Math

```yo
set result = (10 + 5) * 2 / 3
say result
```

### Conditionals

```yo
check age >= 18 {
  say "Adult"
} else {
  say "Minor"
}
```

### Loops

```yo
set i = 0
loop i < 5 {
  say i
  set i = i + 1
}
```

### Comments

```yo
# This is a comment
set x = 10  # Inline comment
```

## 🛠️ CLI Reference

### Commands

| Command | Description | Example |
|---------|-------------|---------|
| `yo run <file>` | Execute a Yolang file | `yo run script.yo` |
| `yo repl` | Start interactive REPL | `yo repl` |
| `yo version` | Show version | `yo version` |
| `yo help` | Show help | `yo help` |

### Aliases

- `yo -v` → `yo version`
- `yo -h` → `yo help`

## 🎮 REPL Features

The REPL provides an interactive environment with:

- **Persistent Variables**: Variables persist across commands
- **Multi-line Support**: Automatic handling of `{ ... }` blocks
- **Built-in Commands**:
  - `help` - Show available commands
  - `vars` - Display current variables
  - `clear` - Clear the terminal
  - `exit` - Quit the REPL

### Multi-line Example

```
yo> check x > 10 {
...   say "Big number"
... } else {
...   say "Small number"
... }
```

## 📚 Examples

Check the `examples/` directory:

- `hello.yo` - Basic greeting
- `test.yo` - Comprehensive syntax demo
- `error.yo` - Error handling example

Run examples:

```bash
yo run examples/hello.yo
yo run examples/test.yo
```

## 🏗️ Architecture

Yolang consists of three main components:

1. **Lexer** (`src/lexer/`): Tokenizes source code
2. **Parser** (`src/parser/`): Builds AST from tokens
3. **Interpreter** (`src/runtime/`): Executes the AST

```
Source Code → Lexer → Tokens → Parser → AST → Interpreter → Output
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/manjunathh-xyz/yolang.git
cd yolang
npm install
npm run build
npm test
```

### Project Structure

```
yolang/
├── src/
│   ├── cli.ts           # Command-line interface
│   ├── repl/            # REPL implementation
│   ├── lexer/           # Lexical analysis
│   ├── parser/          # Syntax parsing
│   ├── runtime/         # Interpretation
│   └── errors/          # Error handling
├── examples/            # Sample programs
├── dist/                # Compiled JavaScript
└── package.json         # Dependencies and scripts
```

## 🐛 Error Handling

Yolang provides friendly error messages:

```bash
yo run broken.yo
```

```
❌ SyntaxError
File: broken.yo
Line: 3

  set x == 10
        ^^

Hint: Use "=" for assignment, not "=="
```

## 🛣️ Roadmap

- [ ] Functions and procedures
- [ ] Arrays and objects
- [ ] File I/O operations
- [ ] Standard library
- [ ] Web playground
- [ ] VS Code extension
- [ ] Package manager

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using TypeScript
- Inspired by the joy of programming
- Thanks to the open-source community

---

**Ready to build your own language?** Yolang is a great starting point! 🌟
import { BrowserRuntime } from './runtime-bridge';

let runtime: BrowserRuntime;
let traceEnabled = false;

const examples: { [key: string]: string } = {
  hello: `say "Hello, Kexra!"

set name = "World"
say "Hello, " + name + "!"

set age = 25
say "Age: " + age`,
  functions: `fn greet(name) {
  say "Hello, " + name + "!"
}

greet("Alice")
greet("Bob")`,
  loops: `for i in 1..5 {
  say i
}

set count = 0
loop count < 3 {
  say "Count: " + count
  set count = count + 1
}`
};

function initRuntime() {
  runtime = new BrowserRuntime({ trace: traceEnabled });
}

function runCode() {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  const code = editor.value;
  const result = runtime.eval(code);

  const output = document.getElementById('output')!;
  const errorPanel = document.getElementById('error')!;
  const tracePanel = document.getElementById('trace')!;

  output.textContent = result.output || '';
  errorPanel.textContent = result.error || '';
  tracePanel.textContent = runtime.getTraces().join('\n');
}

function reset() {
  runtime.reset();
  const output = document.getElementById('output')!;
  const errorPanel = document.getElementById('error')!;
  const tracePanel = document.getElementById('trace')!;
  output.textContent = '';
  errorPanel.textContent = '';
  tracePanel.textContent = '';
}

function loadExample() {
  const select = document.getElementById('examples') as HTMLSelectElement;
  const example = examples[select.value];
  if (example) {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    editor.value = example;
  }
}

function toggleTrace() {
  traceEnabled = !traceEnabled;
  initRuntime(); // Reinitialize with new trace setting
  const traceBtn = document.getElementById('trace-btn') as HTMLButtonElement;
  traceBtn.textContent = traceEnabled ? 'Disable Trace' : 'Enable Trace';
}

function initREPL() {
  const replInput = document.getElementById('repl-input') as HTMLInputElement;
  replInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const code = replInput.value;
      const result = runtime.eval(code);
      const output = document.getElementById('output')!;
      output.textContent += '\n> ' + code + '\n' + (result.output || result.error || '');
      replInput.value = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initRuntime();
  initREPL();

  const runBtn = document.getElementById('run-btn')!;
  runBtn.addEventListener('click', runCode);

  const resetBtn = document.getElementById('reset-btn')!;
  resetBtn.addEventListener('click', reset);

  const traceBtn = document.getElementById('trace-btn')!;
  traceBtn.addEventListener('click', toggleTrace);

  const examplesSelect = document.getElementById('examples')!;
  examplesSelect.addEventListener('change', loadExample);
});
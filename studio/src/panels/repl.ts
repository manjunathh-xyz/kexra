// REPL panel component
export class ReplPanel {
  private element: HTMLElement;
  private input: HTMLInputElement;
  private history: string[] = [];
  private historyIndex = -1;

  constructor(container: HTMLElement, onCommand: (cmd: string) => void) {
    this.element = document.createElement('div');
    this.element.className = 'repl-panel';
    this.element.id = 'repl-panel';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Type Kexra code...';
    this.input.className = 'repl-input';

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.className = 'repl-clear-btn';
    clearBtn.onclick = () => this.clear();

    this.element.appendChild(this.input);
    this.element.appendChild(clearBtn);
    container.appendChild(this.element);

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          onCommand(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });
  }

  clear(): void {
    this.input.value = '';
  }

  focus(): void {
    this.input.focus();
  }
}
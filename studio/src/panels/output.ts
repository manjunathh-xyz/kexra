// Output panel component
export class OutputPanel {
  private element: HTMLElement;

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'panel-content';
    this.element.id = 'output-panel';
    container.appendChild(this.element);
  }

  append(text: string): void {
    this.element.textContent += text + '\n';
    this.element.scrollTop = this.element.scrollHeight;
  }

  clear(): void {
    this.element.textContent = '';
  }

  setContent(text: string): void {
    this.element.textContent = text;
  }
}
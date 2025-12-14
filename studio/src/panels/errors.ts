// Errors panel component
export class ErrorsPanel {
  private element: HTMLElement;

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'panel-content';
    this.element.id = 'errors-panel';
    container.appendChild(this.element);
  }

  append(error: string): void {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-item';
    errorDiv.textContent = error;
    this.element.appendChild(errorDiv);
    this.element.scrollTop = this.element.scrollHeight;
  }

  clear(): void {
    this.element.innerHTML = '';
  }

  setContent(errors: string[]): void {
    this.clear();
    errors.forEach(error => this.append(error));
  }
}
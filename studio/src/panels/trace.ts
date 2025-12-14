// Trace panel component
export class TracePanel {
  private element: HTMLElement;

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'panel-content';
    this.element.id = 'trace-panel';
    container.appendChild(this.element);
  }

  append(trace: string): void {
    const traceDiv = document.createElement('div');
    traceDiv.className = 'trace-item';
    traceDiv.textContent = trace;
    this.element.appendChild(traceDiv);
    this.element.scrollTop = this.element.scrollHeight;
  }

  clear(): void {
    this.element.innerHTML = '';
  }

  setContent(traces: string[]): void {
    this.clear();
    traces.forEach(trace => this.append(trace));
  }
}
// Sidebar explorer component
export class SidebarExplorer {
  private element: HTMLElement;
  private examples: { [key: string]: string };

  constructor(container: HTMLElement, examples: { [key: string]: string }, onSelect: (name: string, code: string) => void) {
    this.element = document.createElement('div');
    this.element.className = 'sidebar';
    this.element.id = 'sidebar';

    const header = document.createElement('div');
    header.className = 'sidebar-header';
    header.textContent = 'Explorer';
    this.element.appendChild(header);

    const list = document.createElement('ul');
    list.className = 'file-list';

    for (const [name, code] of Object.entries(examples)) {
      const item = document.createElement('li');
      item.className = 'file-item';
      item.textContent = `${name}.kx`;
      item.onclick = () => onSelect(name, code);
      list.appendChild(item);
    }

    this.element.appendChild(list);
    container.appendChild(this.element);
  }
}
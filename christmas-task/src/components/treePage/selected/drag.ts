interface IDrag {
  addListener(): void;
  setTreeMap(): void;
}

class Drag implements IDrag {
  private toysList: HTMLElement;
  private treeMap: HTMLElement;
  private treeWrapper: HTMLElement;

  constructor() {
    this.toysList = document.querySelector('.selected-toys_list') as HTMLElement;
    this.treeMap = document.querySelector('.map') as HTMLElement;
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
  }

  addListener(): void {
    this.toysList.addEventListener('dragstart', this.dragStart);
    window.addEventListener('dragend', (e) => this.dragEnd(e));
  }

  setTreeMap(): void {
    this.treeMap = document.querySelector('.map') as HTMLElement;
    this.treeMap.addEventListener('drop', (e) => this.drop(e));
    this.treeMap.addEventListener('dragover', (e) => this.drop(e));
  }

  private dragStart(e: DragEvent): void {
    if (!(e.target as HTMLElement).classList.contains('selected-toys_item__img')) return;
    (e.dataTransfer as DataTransfer).setData('image', (e.target as HTMLElement).id);
  }

  private drop(e: DragEvent): void {
    e.preventDefault();
    if (e.type != 'drop') return;
    const toyId = (e.dataTransfer as DataTransfer).getData('image');
    const toy = document.getElementById(toyId);
    const toyWidth = toy!.offsetWidth;
    const toyHeight = toy!.offsetHeight;
    const treeWrapperLeft = this.treeWrapper.offsetLeft;
    const treeWrapperTop = this.treeWrapper.offsetTop;
    const eventLeft = e.clientX;
    const eventTop = e.clientY;
    toy?.remove();
    toy!.style.left = eventLeft - treeWrapperLeft - toyWidth / 2 + 'px';
    toy!.style.top = eventTop - treeWrapperTop - toyHeight / 2 + 'px';
    toy!.addEventListener('dragstart', this.dragStart);
    this.treeWrapper.append(toy as HTMLElement);
  }

  dragEnd(e: DragEvent) {
    console.log(e.dataTransfer?.dropEffect);
  }
}

export { Drag, IDrag };

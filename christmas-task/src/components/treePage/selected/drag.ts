interface IDrag {
  addListener(): void;
  setTreeMap(): void;
}

class Drag implements IDrag {
  private toysList: HTMLElement;
  private treeMap: HTMLElement;
  private treeWrapper: HTMLElement;
  private selectedToysList: HTMLElement;
  private treeColumn: HTMLElement;

  constructor() {
    this.toysList = document.querySelector('.selected-toys_list') as HTMLElement;
    this.treeMap = document.querySelector('.map') as HTMLElement;
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
    this.selectedToysList = document.querySelector('.selected-toys_list') as HTMLElement;
    this.treeColumn = document.querySelector('.tree-column') as HTMLElement;
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
    const treeColumnLeft = this.treeColumn.offsetLeft;
    const treeColumnTop = this.treeColumn.offsetTop;
    const treeWrapperLeft = this.treeWrapper.offsetLeft;
    const treeWrapperTop = this.treeWrapper.offsetTop;
    const eventLeft = e.clientX;
    const eventTop = e.clientY;
    toy?.remove();
    toy!.style.left = eventLeft - treeColumnLeft - treeWrapperLeft - toyWidth / 2 + 'px';
    toy!.style.top = eventTop - treeColumnTop - treeWrapperTop - toyHeight / 2 + 'px';
    toy!.addEventListener('dragstart', this.dragStart);
    this.treeWrapper.append(toy as HTMLElement);
  }

  dragEnd(e: DragEvent): void {
    if (!(e.target as HTMLElement).classList.contains('selected-toys_item__img')) return;
    const selectedToysList = this.selectedToysList.querySelectorAll('.selected-toys_item');
    const draggableImg: HTMLElement = e.target as HTMLElement;
    const selectedToyCard: HTMLElement = Array.from(selectedToysList).find(
      (item) => (item as HTMLElement).dataset.num === draggableImg.dataset.imgnum
    ) as HTMLElement;
    if (e.dataTransfer?.dropEffect === 'none') {
      draggableImg.remove();
      draggableImg.style.left = '0px';
      draggableImg.style.top = '0px';
      selectedToyCard.append(draggableImg);
    }
    this.checkToyCount(draggableImg, selectedToyCard);
  }

  private checkToyCount(img: HTMLElement, selectedToyCard: HTMLElement): void {
    const imagesInCard = selectedToyCard.querySelectorAll('.selected-toys_item__img');
    const count: HTMLParagraphElement = selectedToyCard.querySelector(
      '.selected-toys_item__number'
    ) as HTMLParagraphElement;
    count.textContent = String(imagesInCard.length);
  }
}

export { Drag, IDrag };

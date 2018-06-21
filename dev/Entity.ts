const LEFT_LANE: number = 0;
const CENTER_LANE: number = 1;
const RIGHT_LANE: number = 2;

class Entity {
  protected element: HTMLElement;
  protected lanes: Array<number>;
  protected currentLane: number;

  constructor(element: string) {
    this.element = document.createElement(element);

    this.lanes = [LEFT_LANE, CENTER_LANE, RIGHT_LANE];
    this.currentLane = CENTER_LANE;

    this._createEntity();
  }

  private _createEntity(): void {
    document.body.appendChild(this.element);
  }

  public getBoundingBox(): ClientRect {
    return this.element.getBoundingClientRect();
  }
}

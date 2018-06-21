const LEFT_LANE: number = 0;
const CENTER_LANE: number = 1;
const RIGHT_LANE: number = 2;

class Entity {
  _element: HTMLElement;
  _lanes: Array<number>;
  _currentLane: number;

  constructor(element: string) {
    this._element = document.createElement(element);

    this._lanes = [LEFT_LANE, CENTER_LANE, RIGHT_LANE];
    this._currentLane = CENTER_LANE;

    this._createEntity();
  }

  private _createEntity(): void {
    document.body.appendChild(this._element);
  }

  public getBoundingBox(): ClientRect {
    return this._element.getBoundingClientRect();
  }
}

/// <reference path="Entity.ts"/>

const MOVE_LEFT_KEY: number = 37;
const MOVE_RIGHT_KEY: number = 39;

class Player extends Entity {
  _mc: HammerManager;

  constructor() {
    super('player');
    this._mc = new Hammer(document.body);
    this._addEventListeners();
    this._panLeft();
    this._panRight();
  }

  private _panLeft(): void {
    this._mc.on('panleft', e => this._movePlayerLeft(e));
  }

  private _panRight(): void {
    this._mc.on('panright', e => this._movePlayerRight(e));
  }

  private _addEventListeners(): void {
    document.addEventListener('keydown', e => this._movePlayerLeft(e));
    document.addEventListener('keydown', e => this._movePlayerRight(e));
  }

  private _movePlayerLeft(e: any): void {
    if (
      this._currentLane === LEFT_LANE ||
      (typeof e.keyCode !== 'undefined' && e.keyCode != MOVE_LEFT_KEY)
    )
      return;
    this._currentLane--;
  }

  private _movePlayerRight(e: any): void {
    if (
      this._currentLane === RIGHT_LANE ||
      (typeof e.keyCode !== 'undefined' && e.keyCode != MOVE_RIGHT_KEY)
    )
      return;
    this._currentLane++;
  }

  private _setLane(): void {
    switch (this._currentLane) {
      case LEFT_LANE:
        this._element.style.transform = `translateX(-${4}em)`;
        break;

      case CENTER_LANE:
        this._element.style.transform = `translateX(${0}%)`;
        break;

      case RIGHT_LANE:
        this._element.style.transform = `translateX(${4}em)`;
        break;
    }
  }

  public update() {
    this._setLane();
  }
}

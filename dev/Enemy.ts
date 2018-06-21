/// <reference path="Entity.ts"/>

class Enemy extends Entity {
  private _game: PlayScreen;
  private _xPos: number;
  private _yPos: number;
  private _ySpeed: number;

  constructor(game: PlayScreen) {
    super('enemy');

    this._game = game;
    this._xPos = 0;
    this._yPos = 0;
    this._ySpeed = 4;

    this._setEnemyPosition();
  }

  private _setEnemyPosition(): void {
    this._xPos =
      (Math.floor(Math.random() * (RIGHT_LANE + 1)) + (LEFT_LANE - 1)) * 100;
  }

  private _moveEnemy(): void {
    this.element.style.transform = `translate(${
      this._xPos
    }%, ${(this._yPos += this._ySpeed)}px)`;
  }

  private _removeEnemy(): void {
    if (this._yPos < window.innerHeight) return;
    this._game.addScore();
    this._game.enemyArray.shift();
    this.element.remove();
  }

  public update(): void {
    this._moveEnemy();
    this._removeEnemy();
  }
}

class GameOverScreen {
  private _game: Game;
  private _finalMsg: HTMLElement;
  private _restartBtn: HTMLElement;
  private _score: number;

  constructor(game: Game, score: number) {
    this._game = game;
    this._score = score;

    this._restartBtn = document.createElement('button');
    this._restartBtn.innerHTML = 'Restart';

    this._finalMsg = document.createElement('p');
    this._finalMsg.innerHTML = `Game over, you score final score is ${
      this._score
    }`;
    document.body.appendChild(this._finalMsg);
    document.body.appendChild(this._restartBtn);

    this._addEventListiners();
  }

  private _addEventListiners() {
    this._restartBtn.addEventListener('click', () => this._game.startGame());
  }
}

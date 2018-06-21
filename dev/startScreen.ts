class StartScreen {
  private _game: Game;
  private _element: HTMLElement;

  constructor(game: Game) {
    this._game = game;
    this._element = document.createElement('button');
    this._element.innerHTML = 'Start game';
    document.body.appendChild(this._element);

    this._addEventListiners();
  }

  private _addEventListiners() {
    this._element.addEventListener('click', () => this._game.startGame());
  }
}

class Game {
  _screen: PlayScreen | StartScreen | GameOverScreen;

  constructor() {
    this._screen = new StartScreen(this);
  }

  public mainMenu() {
    document.body.innerHTML = '';
    this._screen = new StartScreen(this);
  }

  public startGame() {
    document.body.innerHTML = '';
    this._screen = new PlayScreen(this);
  }

  public gameOver(score: number) {
    document.body.innerHTML = '';
    this._screen = new GameOverScreen(this, score);
  }
}

window.addEventListener('load', () => new Game());

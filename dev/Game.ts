class Game {
  public screen: PlayScreen | StartScreen | GameOverScreen;

  constructor() {
    this.screen = new StartScreen(this);
  }

  public mainMenu() {
    document.body.innerHTML = '';
    this.screen = new StartScreen(this);
  }

  public startGame() {
    document.body.innerHTML = '';
    this.screen = new PlayScreen(this);
  }

  public gameOver(score: number) {
    document.body.innerHTML = '';
    this.screen = new GameOverScreen(this, score);
  }
}

window.addEventListener('load', () => new Game());

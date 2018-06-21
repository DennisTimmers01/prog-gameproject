class PlayScreen {
  private _game: Game;
  private _player: Player;
  private _ui: Ui;
  public enemyArray: Array<Enemy>;
  private _score: number;
  private _spawnEnemyInterval: any;

  constructor(game: Game) {
    this._game = game;
    this._player = new Player();
    this.enemyArray = [];
    this._score = 0;
    this._ui = new Ui();

    this._spawnEnemy();
    this.gameLoop();
  }

  private gameLoop(): void {
    this._player.update();
    this.enemyArray.forEach(x => x.update());
    this._ui.update(this._score);

    this._didCollide();

    requestAnimationFrame(() => this.gameLoop());
  }

  private _checkCollision(a: ClientRect, b: ClientRect): boolean {
    return (
      a.left <= b.right &&
      b.left <= a.right &&
      a.top <= b.bottom &&
      b.top <= a.bottom
    );
  }

  private _didCollide(): void {
    this.enemyArray.forEach(enemy => {
      if (
        this._checkCollision(
          this._player.getBoundingBox(),
          enemy.getBoundingBox()
        )
      ) {
        this.enemyArray.splice(0, this.enemyArray.length);
        window.clearInterval(this._spawnEnemyInterval);
        this._game.gameOver(this._score);
      }
    });
  }

  private _spawnEnemy(): void {
    this._spawnEnemyInterval = setInterval(
      () => this.enemyArray.push(new Enemy(this)),
      1000
    );
  }

  public addScore(): void {
    this._score++;
  }
}

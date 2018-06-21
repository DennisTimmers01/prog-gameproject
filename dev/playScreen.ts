class PlayScreen {
  _game: Game;
  _player: Player;
  _ui: Ui;
  _enemyArray: Array<Enemy>;
  _score: number;
  _spawnEnemyInterval: any;

  constructor(game: Game) {
    this._game = game;
    this._player = new Player();
    this._enemyArray = [];
    this._score = 0;
    this._ui = new Ui();

    this._spawnEnemy();
    this.gameLoop();
  }

  private gameLoop(): void {
    this._player.update();
    this._enemyArray.forEach(x => x.update());
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
    this._enemyArray.forEach(enemy => {
      if (
        this._checkCollision(
          this._player.getBoundingBox(),
          enemy.getBoundingBox()
        )
      ) {
        this._enemyArray.splice(0, this._enemyArray.length);
        window.clearInterval(this._spawnEnemyInterval);
        this._game.gameOver(this._score);
      }
    });
  }

  private _spawnEnemy(): void {
    this._spawnEnemyInterval = setInterval(
      () => this._enemyArray.push(new Enemy(this)),
      1000
    );
  }

  public addScore(): void {
    this._score++;
  }
}

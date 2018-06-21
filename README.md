# Pepe Run

## PlayScreen Bouwen

Hieronder zie je een voorbeeld waarbij de paddle al is overgezet naar de PlayScreen class. Je moet hier de ball nog aan toevoegen.

```
class playScreen {

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

    public update(): void {
        this._player.update();
        this.enemyArray.forEach(x => x.update());
        this._ui.update(this._score);

        this._didCollide();

        requestAnimationFrame(() => this.gameLoop());
    }
}
```

### Game

**Game.ts**

```
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
```

### Van startscreen naar playScreen

**Game.ts**

```
class Game {
  public startGame() {
    document.body.innerHTML = '';
    this.screen = new PlayScreen(this);
  }
}
```

Kijk nu zelf hoe je vanuit StartScreen deze functie kan aanroepen!

### GameOverScreen

- Kijk of je de bovenstaande oefening ook kan doen voor een Game Over screen.
- Het Game Over screen wordt getoond als je teveel ballen het scherm uit laat gaan.
- Het Game Over screen toont een score, en een knop om terug naar het startscreen of playscreen te gaan.

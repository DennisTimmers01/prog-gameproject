# Pepe Run

## Play

### how-to

Gebruik de pijltjes toetsen of swipe links/rights op je mobiel om de pepe te sturen.
Probeer de spike ballen te ontwijken.

### Live demo

[Pepe run](https://dennistimmers01.github.io/prog-gameproject/)

### Installatie

Als je de game zelf locaal wilt spelen kun je deze repo clonen. De typescript bestanden bevinden zich in de dev map.
De complete game, inclusief javascript bestand bevind zich in Docs

## Toelichting OOP

### Classes

De game is onderverdeeld in verschillende classes. Dit zorgt voor herbruikbaarheid en makkelijk leesbaren code.

Variabelen zijn onderverdeeld in public, protected of private. Alleen variable die public zijn kunnen direct aangepast worden.
Protected is alleen bereikbaar door classes die extend worden. Private is alleen bereikbaar door de class zelf.

```typescript
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

```typescript
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

```typescript
class Game {
  public startGame() {
    document.body.innerHTML = '';
    this.screen = new PlayScreen(this);
  }
}
```

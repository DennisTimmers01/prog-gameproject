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
Protected is alleen bereikbaar voor de children van de parent class. Private is alleen bereikbaar door de class zelf.

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

### Van startScreen naar playScreen

**Game.ts**

De game bevat een functie die de game start.

```typescript
class Game {
  public startGame() {
    document.body.innerHTML = '';
    this.screen = new PlayScreen(this);
  }
}
```

### Inheritance

Beide Enemy en Player maken gebruik van de Entity class. Dit is omdat beide classes HTML elementen maken en appenden aan de body.
Ook hebben bijde classes een bounding box die opgevraagd moet kunnen worden voor collision detection.
De classes die inheriten van Entity moeten een naam mee geven via Super(), deze is nodig om het HTML element een naam te geven.

#### Entity

```typescript
class Entity {
  protected element: HTMLElement;
  protected lanes: Array<number>;
  protected currentLane: number;

  constructor(element: string) {
    this.element = document.createElement(element);

    this.lanes = [LEFT_LANE, CENTER_LANE, RIGHT_LANE];
    this.currentLane = CENTER_LANE;

    this._createEntity();
  }

  private _createEntity(): void {
    document.body.appendChild(this.element);
  }

  public getBoundingBox(): ClientRect {
    return this.element.getBoundingClientRect();
  }
}
```

#### Player

```typescript
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
}
```

#### Player

```typescript
class Player extends Entity {
  _mc: HammerManager;

  constructor() {
    super('player');
    this._mc = new Hammer(document.body);
    this._addEventListeners();
    this._panLeft();
    this._panRight();
  }
}
```

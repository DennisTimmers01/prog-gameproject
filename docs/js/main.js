"use strict";
const LEFT_LANE = 0;
const CENTER_LANE = 1;
const RIGHT_LANE = 2;
class Entity {
    constructor(element) {
        this._element = document.createElement(element);
        this._lanes = [LEFT_LANE, CENTER_LANE, RIGHT_LANE];
        this._currentLane = CENTER_LANE;
        this._createEntity();
    }
    _createEntity() {
        document.body.appendChild(this._element);
    }
    getBoundingBox() {
        return this._element.getBoundingClientRect();
    }
}
class Enemy extends Entity {
    constructor(game) {
        super('enemy');
        this._game = game;
        this._xPos = 0;
        this._yPos = 0;
        this._ySpeed = 4;
        this._setEnemyPosition();
    }
    _setEnemyPosition() {
        this._xPos =
            (Math.floor(Math.random() * (RIGHT_LANE + 1)) + (LEFT_LANE - 1)) * 100;
    }
    _moveEnemy() {
        this._element.style.transform = `translate(${this._xPos}%, ${(this._yPos += this._ySpeed)}px)`;
    }
    _removeEnemy() {
        if (this._yPos < window.innerHeight)
            return;
        this._game.addScore();
        this._game._enemyArray.shift();
        this._element.remove();
    }
    update() {
        this._moveEnemy();
        this._removeEnemy();
    }
}
class Game {
    constructor() {
        this._screen = new StartScreen(this);
    }
    mainMenu() {
        document.body.innerHTML = '';
        this._screen = new StartScreen(this);
    }
    startGame() {
        document.body.innerHTML = '';
        this._screen = new PlayScreen(this);
    }
    gameOver(score) {
        document.body.innerHTML = '';
        this._screen = new GameOverScreen(this, score);
    }
}
window.addEventListener('load', () => new Game());
const MOVE_LEFT_KEY = 37;
const MOVE_RIGHT_KEY = 39;
class Player extends Entity {
    constructor() {
        super('player');
        this._mc = new Hammer(document.body);
        this._addEventListeners();
        this._panLeft();
        this._panRight();
    }
    _panLeft() {
        this._mc.on('panleft', e => this._movePlayerLeft(e));
    }
    _panRight() {
        this._mc.on('panright', e => this._movePlayerRight(e));
    }
    _addEventListeners() {
        document.addEventListener('keydown', e => this._movePlayerLeft(e));
        document.addEventListener('keydown', e => this._movePlayerRight(e));
    }
    _movePlayerLeft(e) {
        if (this._currentLane === LEFT_LANE ||
            (typeof e.keyCode !== 'undefined' && e.keyCode != MOVE_LEFT_KEY))
            return;
        this._currentLane--;
    }
    _movePlayerRight(e) {
        if (this._currentLane === RIGHT_LANE ||
            (typeof e.keyCode !== 'undefined' && e.keyCode != MOVE_RIGHT_KEY))
            return;
        this._currentLane++;
    }
    _setLane() {
        switch (this._currentLane) {
            case LEFT_LANE:
                this._element.style.transform = `translateX(-${4}em)`;
                break;
            case CENTER_LANE:
                this._element.style.transform = `translateX(${0}%)`;
                break;
            case RIGHT_LANE:
                this._element.style.transform = `translateX(${4}em)`;
                break;
        }
    }
    update() {
        this._setLane();
    }
}
class Ui {
    constructor() {
        this._element = document.createElement('score');
        this._createScoreElement();
    }
    _createScoreElement() {
        document.body.appendChild(this._element);
    }
    update(score) {
        this._element.innerHTML = `Score: ${score}`;
    }
}
class GameOverScreen {
    constructor(game, score) {
        this._game = game;
        this._score = score;
        this._restartBtn = document.createElement('button');
        this._restartBtn.innerHTML = 'Restart';
        this._finalMsg = document.createElement('p');
        this._finalMsg.innerHTML = `Game over, you score final score is ${this._score}`;
        document.body.appendChild(this._finalMsg);
        document.body.appendChild(this._restartBtn);
        this._addEventListiners();
    }
    _addEventListiners() {
        this._restartBtn.addEventListener('click', () => this._game.startGame());
    }
}
class PlayScreen {
    constructor(game) {
        this._game = game;
        this._player = new Player();
        this._enemyArray = [];
        this._score = 0;
        this._ui = new Ui();
        this._spawnEnemy();
        this.gameLoop();
    }
    gameLoop() {
        this._player.update();
        this._enemyArray.forEach(x => x.update());
        this._ui.update(this._score);
        this._didCollide();
        requestAnimationFrame(() => this.gameLoop());
    }
    _checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    _didCollide() {
        this._enemyArray.forEach(enemy => {
            if (this._checkCollision(this._player.getBoundingBox(), enemy.getBoundingBox())) {
                this._enemyArray.splice(0, this._enemyArray.length);
                window.clearInterval(this._spawnEnemyInterval);
                this._game.gameOver(this._score);
            }
        });
    }
    _spawnEnemy() {
        this._spawnEnemyInterval = setInterval(() => this._enemyArray.push(new Enemy(this)), 1000);
    }
    addScore() {
        this._score++;
    }
}
class StartScreen {
    constructor(game) {
        this._game = game;
        this._element = document.createElement('button');
        this._element.innerHTML = 'Start game';
        document.body.appendChild(this._element);
        this._addEventListiners();
    }
    _addEventListiners() {
        this._element.addEventListener('click', () => this._game.startGame());
    }
}
//# sourceMappingURL=main.js.map
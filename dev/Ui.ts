class Ui {
  _element: HTMLElement;

  constructor() {
    this._element = document.createElement('score');
    this._createScoreElement();
  }

  private _createScoreElement() {
    document.body.appendChild(this._element);
  }

  public update(score: number) {
    this._element.innerHTML = `Score: ${score}`;
  }
}

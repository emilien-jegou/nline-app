import { getID } from './id';
import { Path } from './path';

const sizePx = 10;

/* Control points of a stroke */
export class ControlPoints {
  domElement: SVGGElement;

  readonly id = getID();

  private path: Path;

  constructor(path: Path) {
    const domElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    domElement.setAttribute('width', `${sizePx}px`);
    domElement.setAttribute('height', `${sizePx}px`);
    domElement.dataset.SvgKey = this.id;

    this.path = path;
    this.domElement = domElement;
  }

  static create = (path: Path) => new ControlPoints(path);

  render(): ControlPoints {
    this.path.points.forEach(({ x, y }) => {
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      rectElement.setAttribute('x', `calc(${x}px - ${sizePx / 2}px)`);
      rectElement.setAttribute('y', `calc(${y}px - ${sizePx / 2}px)`);
      rectElement.setAttribute('width', '2%');
      rectElement.setAttribute('height', '2%');
      rectElement.setAttribute('fill', 'lightgreen');

      this.domElement.append(rectElement);
    });

    this.path.domElement.append(this.domElement);
    return this;
  }

  clear() {
    this.domElement.remove();
  }
}

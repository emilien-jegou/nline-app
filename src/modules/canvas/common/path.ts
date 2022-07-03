import * as O from 'fp-ts/Option';
import { Option } from 'fp-ts/Option';
import { zip } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

import { Canvas } from './canvas';
import { getID } from './id';
import { Position } from './position';

const moveToPoint = ({ x, y }: Position) => `M${x},${y}`;
const cubicBezierToPoint = ({ x, y }: Position, { x: x2, y: y2 }: Position) => {
  const dx = x + (x2 - x) / 2;
  const dy = y + (y2 - y) / 2;

  return `S${dx},${dy} ${x2},${y2}`;
};

const d = (points: Position[]) => {
  const moveTo = points[0];
  const lineTo = points.slice(1);
  if (!moveTo) return '';

  return [
    moveToPoint(moveTo),
    pipe(lineTo.slice(0, -1), zip(lineTo.slice(1))).map(([element, next]) =>
      cubicBezierToPoint(element, next),
    ),
    //lineTo.slice(0, -1).map((elem) => lineToPoint(elem)),
  ].join(' ');
};

export class Path {
  domElement: SVGPathElement;

  readonly _entityType = self.name;
  readonly id = getID();

  points: Position[];
  private canvas: Option<Canvas> = O.none;

  constructor(points: Position[]) {
    const domElement = document.createElement('path') as unknown as SVGPathElement;

    domElement.setAttribute('fill', 'white');
    domElement.setAttribute('stroke', 'black');
    domElement.setAttribute('stroke-width', '3');
    domElement.dataset.SvgKey = this.id;

    this.domElement = domElement;
    this.points = points;
  }

  static create = (points: Position[]) => new Path(points);

  render() {
    this.domElement.setAttributeNS(null, 'd', d(this.points));
  }

  setCanvas(canvas: Option<Canvas>) {
    this.canvas = canvas;
    pipe(
      canvas,
      O.match(
        () => this.domElement.remove(),
        ({ svgElement }) =>
          pipe(
            svgElement,
            O.map((svgElement) => {
              const parentElement = this.domElement
                .parentElement as unknown as SVGSVGElement | null;
              if (svgElement === parentElement) {
                svgElement.append(this.domElement);
              }
            }),
          ),
      ),
    );
  }
}

import * as O from 'fp-ts/Option';
import { Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

import { Canvas } from './canvas';
import { getID } from './id';

export abstract class Entity {
  readonly _entityType = self.name;
  readonly id = getID();

  private canvas: Option<Canvas> = O.none;

  abstract render(): void;
  abstract removeNode(): void;
  abstract addNode(parent: SVGSVGElement): void;

  setCanvas(canvas: Option<Canvas>): void {
    this.canvas = canvas;
    pipe(
      canvas,
      O.map((canvas: Canvas) => canvas.svgElement),
      O.flatten,
      O.match(
        () => this.removeNode(),
        (svgElement: SVGSVGElement) => this.addNode(svgElement),
      ),
    );
  }
}

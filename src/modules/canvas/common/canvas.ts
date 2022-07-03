import { some, none, Option } from 'fp-ts/Option';

import { ID } from './id';
import { Path } from './path';

// https://www.w3.org/TR/SVG/paths.html

type Entity = Path;

export class Canvas {
  entities: Record<ID, Entity> = {};
  svgElement: Option<SVGSVGElement> = none;

  setSVGElement(domSVGElement: SVGSVGElement) {
    this.svgElement = some(domSVGElement);
    // Refresh childs dom element
    Object.values(domSVGElement).forEach((entity) => entity.setCanvas(some(this)));
  }

  static create = (...args: ConstructorParameters<typeof Canvas>) => new Canvas(...args);

  addEntity(entity: Entity): Canvas {
    entity.setCanvas(some(this));
    this.entities[entity.id] = entity;
    return this;
  }

  removeEntity(entity: Entity): Canvas {
    entity.setCanvas(none);
    delete this.entities[entity.id];
    return this;
  }
}

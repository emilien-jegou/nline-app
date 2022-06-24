
export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static create = (x: number, y: number) => new Position(x, y);
};

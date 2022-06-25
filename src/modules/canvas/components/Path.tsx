import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import { zip } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

import { Position } from '../common/position';

type PathProps = {
  points: Position[];
};

// https://www.w3.org/TR/SVG/paths.html
const moveToPoint = ({ x, y }: Position) => `M${x},${y}`;
const cubicBezierToPoint = ({ x, y }: Position, { x: x2, y: y2 }: Position) => {
  const dx = x + (x2 - x) / 2;
  const dy = y + (y2 - y) / 2;

  return `S${dx},${dy} ${x2},${y2}`;
};

//const lineToPoint = ({ x, y }: Position) => `L${x} ${y}`;

export const Path: Component = (props: PathProps) => {
  const d = createMemo(() => {
    const moveTo = props.points[0];
    const lineTo = props.points.slice(1);
    if (!moveTo) return '';

    return [
      moveToPoint(moveTo),
      pipe(lineTo.slice(0, -1), zip(lineTo.slice(1))).map(([element, next]) =>
        cubicBezierToPoint(element, next),
      ),
      //lineTo.slice(0, -1).map((elem) => lineToPoint(elem)),
    ].join(' ');
  });

  return (
    <>
      <text>{JSON.stringify(d)}</text>
      <mask id="myMask" maskContentUnits="objectBoundingBox">
        <rect fill="white" x="0" y="0" width="100%" height="100%" />
        <polygon fill="black" points="0.5,0.2 0.68,0.74 0.21,0.41 0.79,0.41 0.32,0.74" />
      </mask>
      <path fill="white" stroke="black" stroke-width="3" d={d()} />
    </>
  );
};

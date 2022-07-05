import type { Component } from 'solid-js';
import { some } from 'fp-ts/Option';

import { MouseOverlay } from './components/MouseOverlay';
import { OverlayEventHandler } from './common/overlay-event-handler';
import { Position } from './common/position';
import { Canvas } from './common/canvas';
import { Path } from './common/path';

const CanvasComponent: Component = () => {
  const handler = OverlayEventHandler.create();

  const canvas = Canvas.create();

  handler.onMouseDown((position: Position) => {
    const path = Path.create([position]).setCanvas(some(canvas));

    const destroyMouseMove = handler.onMouseMove((position: Position) =>
      path.appendPoint(position).render(),
    );

    const destroyMouseUp = handler.onMouseUp((position: Position) => {
      path.appendPoint(position).render();
      destroyMouseMove();
      destroyMouseUp();
    });
  });

  return (
    <div>
      <button
        class="bg-black text-white p-2 border-white"
        style={{ position: 'absolute', cursor: 'pointer' }}
        onClick={() => canvas.clear()}
      >
        clear
      </button>
      <MouseOverlay overlayEventHandler={handler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          ref={(element: SVGSVGElement) => canvas.setSVGElement(element)}
          style={{ width: '100%', height: '100%' }}
        />
      </MouseOverlay>
    </div>
  );
};

export { CanvasComponent as Canvas };

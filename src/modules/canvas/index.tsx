import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

import { MouseOverlay } from './components/MouseOverlay';
import { OverlayEventHandler } from './common/overlay-event-handler';
import { Position } from './common/position';
import { Canvas } from './common/canvas';
import { Path } from './common/path';

const CanvasComponent: Component = () => {
  const handler = OverlayEventHandler.create();
  const [currentLine, setCurrentLine] = createStore<Position[]>([]);

  const canvas = Canvas.create();
  const path = Path.create(currentLine);

  canvas.addEntity(path);

  handler.onMouseMove((position: Position) => setCurrentLine([...currentLine, position]));

  return (
    <>
      <button
        class="bg-black text-white p-2 border-white"
        style={{ cursor: 'pointer' }}
        onClick={() => setCurrentLine([])}
      >
        clear
      </button>
      <MouseOverlay overlayEventHandler={handler}>
        <svg
          ref={(element: SVGSVGElement) => canvas.setSVGElement(element)}
          style={{ width: '100%', height: '100%' }}
        />
      </MouseOverlay>
    </>
  );
};

export { CanvasComponent as Canvas };

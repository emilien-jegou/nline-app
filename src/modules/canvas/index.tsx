import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

import { MouseOverlay } from './components/MouseOverlay';
import { OverlayEventHandler } from './common/overlay-event-handler';
import { Path } from './components/Path';
import { Position } from './common/position';

export const Canvas: Component = () => {
  const handler = OverlayEventHandler.create();
  const [currentLine, setCurrentLine] = createStore<Position[]>([]);

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
        <svg style={{ width: '100%', height: '100%' }}>
          <Path points={currentLine} />
        </svg>
      </MouseOverlay>
    </>
  );
};

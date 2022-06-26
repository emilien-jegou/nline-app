import type { JSX } from 'solid-js';

import { Position } from '../common/position';
import { OverlayEventHandler } from '../common/overlay-event-handler';
import { getCursor } from '../common/getCursor';

type DrawingOverlayProps = {
  overlayEventHandler: OverlayEventHandler;
  children: JSX.Element;
};

let lastMove = 0;

/** Overlay over the canvas capturing the user click */
export function MouseOverlay(props: DrawingOverlayProps) {
  return (
    <div
      class="mt-4 ml-4 w-screen h-screen"
      style={{ cursor: getCursor(20) }}
      onClick={({ offsetX, offsetY }) => {
        props.overlayEventHandler.sendClick(Position.create(offsetX, offsetY));
      }}
      onMouseMove={({ offsetX, offsetY }) => {
        if (Date.now() - lastMove < 2) return;
        lastMove = Date.now();
        props.overlayEventHandler.sendMouseMove(Position.create(offsetX, offsetY));
      }}
    >
      {props.children}
    </div>
  );
}

import type { JSX } from 'solid-js';
import { Position } from '../common/position';
import { OverlayEventHandler } from '../common/overlay-event-handler';

type DrawingOverlayProps = {
  overlayEventHandler: OverlayEventHandler;
  children: JSX.Element;
};

let lastMove = 0;

/** Overlay over the canvas capturing the user click */
export function MouseOverlay({ overlayEventHandler, children }: DrawingOverlayProps) {
  //eslint-disable-next-line no-console
  return (
    <div
      class="mt-4 ml-4 w-screen h-screen"
      onClick={({ offsetX, offsetY }) => {
        overlayEventHandler.sendClick(Position.create(offsetX, offsetY));
      }}
      onMouseMove={({ offsetX, offsetY }) => {
        if (Date.now() - lastMove < 10) return;
        lastMove = Date.now();
        overlayEventHandler.sendMouseMove(Position.create(offsetX, offsetY));
      }}
    >
      {children}
    </div>
  );
}

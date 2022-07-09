import type { JSX } from 'solid-js';

import { Position } from '../common/position';
import { OverlayEventHandler } from '../common/overlay-event-handler';
import { getCursor } from '../common/getCursor';

type DrawingOverlayProps = {
  overlayEventHandler: OverlayEventHandler;
  children: JSX.Element;
};

/** Overlay over the canvas capturing the user click */
export function MouseOverlay(props: DrawingOverlayProps) {
  return (
    <div
      class="w-screen h-screen"
      style={{ cursor: getCursor(20) }}
      onClick={({ offsetX, offsetY }) => {
        props.overlayEventHandler.sendClick(Position.create(offsetX, offsetY));
      }}
      onMouseDown={({ offsetX, offsetY }) => {
        props.overlayEventHandler.sendMouseDown(Position.create(offsetX, offsetY));
      }}
      onMouseUp={({ offsetX, offsetY }) => {
        props.overlayEventHandler.sendMouseUp(Position.create(offsetX, offsetY));
      }}
      onMouseMove={({ offsetX, offsetY }) => {
        props.overlayEventHandler.sendMouseMove(Position.create(offsetX, offsetY));
      }}
    >
      {props.children}
    </div>
  );
}

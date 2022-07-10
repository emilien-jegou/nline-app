import type { Component } from 'solid-js';

import { MouseOverlay } from './components/MouseOverlay';
import { OverlayEventHandler } from './common/overlay-event-handler';
import { Position } from './common/position';
import { Canvas } from './common/canvas';
import { Path } from './common/path';
import { DebugMenu } from './components/DebugMenu';
import { DebugItem } from './components/DebugItem';

const CanvasComponent: Component = () => {
  const handler = OverlayEventHandler.create();
  const canvas = Canvas.create();

  handler.onMouseDown((position: Position) => {
    const path = Path.create([position]);
    canvas.addEntity(path);

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
      <DebugMenu visible={true}>
        <DebugItem onClick={() => canvas.clear()}>clear</DebugItem>
        <DebugItem onClick={() => canvas.showControlPoints(true)}>show control points</DebugItem>
      </DebugMenu>
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

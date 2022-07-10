import { Position } from './position';
import { useLogger } from '../../../common/logger';

type EventEffect = (position: Position) => void;
type EventTypes = 'onClick' | 'onMouseMove' | 'onMouseDown' | 'onMouseUp';

// TODO: Transform OverlayEventHandler to autogenerated object - remove send/on repetition
export class OverlayEventHandler {
  private readonly logger = useLogger('OverlayEventHandler');
  private listeners: Partial<Record<EventTypes, EventEffect>> = {};
  private lastMouseMoveTimestamp = 0;

  static create = () => new OverlayEventHandler();

  onClick(listener: EventEffect) {
    return this.registerOnEvent('onClick', listener);
  }

  sendClick(position: Position) {
    this.sendEvent('onClick', position);
  }

  onMouseMove(listener: EventEffect) {
    return this.registerOnEvent('onMouseMove', listener);
  }

  sendMouseMove(position: Position) {
    const currentDate = Date.now();
    if (currentDate - this.lastMouseMoveTimestamp < 10) return;
    this.lastMouseMoveTimestamp = currentDate;
    this.sendEvent('onMouseMove', position);
  }

  onMouseDown(listener: EventEffect) {
    return this.registerOnEvent('onMouseDown', listener);
  }

  sendMouseDown(position: Position) {
    this.sendEvent('onMouseDown', position);
  }

  onMouseUp(listener: EventEffect) {
    return this.registerOnEvent('onMouseUp', listener);
  }

  sendMouseUp(position: Position) {
    this.sendEvent('onMouseUp', position);
  }

  private registerOnEvent(key: EventTypes, listener: EventEffect) {
    this.logger.debug(`new listener '${key}'`);
    this.listeners[key] = listener;

    return () => {
      this.logger.debug(`destroying listener '${key}'`);
      if (this.listeners[key] === listener) this.listeners[key] = undefined;
    };
  }

  private sendEvent(key: EventTypes, position: Position) {
    this.listeners[key]?.(position);
  }
}

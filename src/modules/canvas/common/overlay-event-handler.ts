import { Position } from './position';
import { useLogger } from './logger';

type EventEffect = (position: Position) => void;
type EventTypes = 'onClick' | 'onMouseMove';

export class OverlayEventHandler {
  private readonly logger = useLogger('OverlayEventHandler');
  private listeners: Partial<Record<EventTypes, EventEffect>> = {};

  static create = () => new OverlayEventHandler();

  onClick(listener: EventEffect) {
    this.registerOnEvent('onClick', listener);
  }

  sendClick(position: Position) {
    this.sendEvent('onClick', position);
  }

  onMouseMove(listener: EventEffect) {
    this.registerOnEvent('onMouseMove', listener);
  }

  sendMouseMove(position: Position) {
    this.sendEvent('onMouseMove', position);
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

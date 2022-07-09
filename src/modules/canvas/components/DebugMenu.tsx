import type { JSX } from 'solid-js';

type DebugMenuProps = {
  children: JSX.Element;
  visible: boolean;
};

export function DebugMenu(props: DebugMenuProps) {
  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, display: props.visible ? 'initial' : 'none' }}
    >
      {props.children}
    </div>
  );
}

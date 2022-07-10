import type { JSX } from 'solid-js';

type DebugItemProps = {
  children: JSX.Element;
  onClick: () => void;
};

export function DebugItem(props: DebugItemProps) {
  return (
    <button
      class="bg-black text-white p-2 border-white"
      style={{
        'user-select': 'none',
        cursor: 'pointer',
      }}
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
}

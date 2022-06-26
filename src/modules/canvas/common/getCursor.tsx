export const getCursor = (sizePx: number): string => {
  const rawCursor = `<svg
    width="${sizePx}px"
    height="${sizePx}px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="calc(50% - 0.6px)"
      cy="calc(50% - 0.6px)"
      r="calc(50% - 1.2px)"
      stroke="black"
      fill="rgba(0,0,0,0)"
      stroke-width="1.2px"
    />
    <circle
      cx="calc(50% - 0.6px)"
      cy="calc(50% - 0.6px)"
      r="calc(50% - 2.4px)"
      stroke="#ffffff"
      fill="rgba(0,0,0,0)"
      stroke-width="1.2px"
    />
  </svg>
  `;

  const b64Cursor = window.btoa(rawCursor);

  const cursor = `url('data:image/svg+xml;base64,${b64Cursor}') ${sizePx / 2} ${sizePx / 2}, auto`;

  // eslint-disable-next-line no-console
  console.log(cursor);
  return cursor;
};

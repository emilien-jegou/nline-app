import type { Component } from 'solid-js';

import { Canvas } from './modules/canvas';
import { SettingsProvider } from './stores/settings';

const App: Component = () => {
  return (
    <SettingsProvider>
      <Canvas />
    </SettingsProvider>
  );
};

export default App;

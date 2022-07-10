import { createContext, useContext, JSX, createEffect, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Option, none, match, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

import { useLogger } from '../common/logger';
import { storage } from '../common/storage';

type Settings = {
  debugModeEnabled: boolean;
};

const defaultSettings: Settings = {
  debugModeEnabled: true,
};

type SettingsStore = Option<Settings>;

export const SettingsContext = createContext<SettingsStore>();

const settingsStorageKey = 'settings';

export function SettingsProvider(props: { children: JSX.Element }): JSX.Element {
  const logger = useLogger('settings');
  const [settings, setSettings] = createStore<SettingsStore>(Object.assign({}, none));

  onMount(() => {
    storage
      .getItem<Settings>(settingsStorageKey)
      .then((localSettings: Settings | null): void => {
        setSettings(some({ ...defaultSettings, ...localSettings }));
      })
      .catch((error) => logger.error(error));
  });

  createEffect(() => {
    void pipe(
      settings,
      match(
        (): Promise<unknown> => storage.removeItem(settingsStorageKey),
        (value: Settings) => storage.setItem(settingsStorageKey, JSON.stringify(value)),
      ),
    );
  });

  return <SettingsContext.Provider value={settings}>{props.children}</SettingsContext.Provider>;
}

export function useSettings(): Option<Settings> {
  return useContext(SettingsContext) ?? none;
}

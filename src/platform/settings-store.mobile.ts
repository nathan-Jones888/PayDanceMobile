// SPDX-FileCopyrightText: 2026 Javen
// SPDX-License-Identifier: AGPL-3.0-only
//
// Additional terms: see /legal/ADDITIONAL_TERMS.md

export type SettingsStoreAdapter = {
  delete?: (key: string) => Promise<void>;
  get: <Value>(key: string) => Promise<Value | undefined>;
  save: () => Promise<void>;
  set: (key: string, value: unknown) => Promise<void>;
};

export const mobileSettingsStorageKey = "paydance-mobile-settings";

const readMobileState = () => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(mobileSettingsStorageKey);
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch (error) {
    console.error("Failed to read mobile settings", error);
    return {};
  }
};

export const createMobileSettingsStore = (): SettingsStoreAdapter => {
  let state = readMobileState();

  return {
    async delete(key: string) {
      const nextState = { ...state };
      delete nextState[key];
      state = nextState;
    },
    async get<Value>(key: string) {
      return state[key] as Value | undefined;
    },
    async save() {
      if (typeof window === "undefined") return;

      try {
        window.localStorage.setItem(mobileSettingsStorageKey, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save mobile settings", error);
      }
    },
    async set(key: string, value: unknown) {
      state = { ...state, [key]: value };
    },
  };
};

export const createSettingsStore = async (): Promise<SettingsStoreAdapter> =>
  createMobileSettingsStore();

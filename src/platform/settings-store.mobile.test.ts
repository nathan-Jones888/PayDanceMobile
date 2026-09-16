// SPDX-FileCopyrightText: 2026 Javen
// SPDX-License-Identifier: AGPL-3.0-only
//
// Additional terms: see /legal/ADDITIONAL_TERMS.md
// @vitest-environment happy-dom

import { beforeEach, describe, expect, it } from "vitest";
import {
  createMobileSettingsStore,
  mobileSettingsStorageKey,
} from "./settings-store.mobile";

describe("mobile settings store", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("restores settings after a new store instance is created", async () => {
    const firstStore = createMobileSettingsStore();
    await firstStore.set("hasCompletedOnboarding", true);
    await firstStore.set("config", { monthlySalary: 18888 });
    await firstStore.save();

    const secondStore = createMobileSettingsStore();

    await expect(secondStore.get("hasCompletedOnboarding")).resolves.toBe(true);
    await expect(secondStore.get("config")).resolves.toEqual({ monthlySalary: 18888 });
    expect(window.localStorage.getItem(mobileSettingsStorageKey)).toContain(
      "hasCompletedOnboarding",
    );
  });
});

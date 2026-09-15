// SPDX-FileCopyrightText: 2026 Mr.Baoboer
// SPDX-License-Identifier: AGPL-3.0-only
//
// Additional terms: see /legal/ADDITIONAL_TERMS.md

export const openExternalUrl = async (url: string) => {
  const { openUrl } = await import("@tauri-apps/plugin-opener");
  await openUrl(url);
};

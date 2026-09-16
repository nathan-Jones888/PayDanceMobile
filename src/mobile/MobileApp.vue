<script setup lang="ts">
// SPDX-FileCopyrightText: 2026 Javen
// SPDX-License-Identifier: AGPL-3.0-only
//
// Additional terms: see /legal/ADDITIONAL_TERMS.md
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { appName } from "../lib/app-meta";
import { resolveWindowPreferences } from "../lib/window-mode";
import { provideCurrency } from "../composables/useCurrency";
import { useDashboardModel } from "../composables/useDashboardModel";
import { provideI18n } from "../composables/useI18n";
import { useSalarySettings } from "../composables/useSalarySettings";
import { useSalaryTicker } from "../composables/useSalaryTicker";
import AppWindow from "../components/AppWindow.vue";
import type { UpdaterStatus } from "#updater";

const updateStatus: UpdaterStatus = { kind: "unavailable", reason: "web" };
const {
  amountMode,
  config,
  currencySymbol,
  hasCompletedOnboarding,
  isSettingsReady,
  loadSettings,
  locale,
  saveSettings,
  settingsSaveError,
  themeMode,
} = useSalarySettings(undefined, () => t.value);
const { t } = provideI18n(locale);

provideCurrency(currencySymbol);

const showSettings = ref(false);
const showSalaryInfo = ref(false);
const { snapshot, startTicker, stopTicker } = useSalaryTicker(config, t.value);
const {
  dailyEarnText,
  earnedText,
  firstConfigIssue,
  hasConfigIssues,
  hasIssue,
  isWorkingStatus,
  middleStat,
  salaryModeLabel,
  statusText,
  workedTimeText,
} = useDashboardModel(config, snapshot, t.value, locale);
const shellClass = computed(() =>
  themeMode.value === "dark" ? "theme-dark" : "theme-light",
);
const shouldShowOnboarding = computed(
  () => isSettingsReady.value && !hasCompletedOnboarding.value,
);
const mobileWindowPreferences = resolveWindowPreferences({});

const saveStateNow = () => saveSettings(mobileWindowPreferences);

const completeOnboarding = async () => {
  hasCompletedOnboarding.value = true;
  await saveStateNow();
};

const setThemeMode = async (mode: "light" | "dark") => {
  themeMode.value = mode;
  await saveStateNow();
};

const toggleTheme = () => setThemeMode(themeMode.value === "dark" ? "light" : "dark");

watch(config, () => void saveStateNow(), { deep: true });
watch([amountMode, currencySymbol, locale], () => void saveStateNow());

onMounted(async () => {
  await loadSettings();
  startTicker();
});

onBeforeUnmount(stopTicker);
</script>

<template>
  <main class="mobile-app" :class="shellClass">
    <AppWindow
      v-model:amount-mode="amountMode"
      v-model:config="config"
      v-model:currency-symbol="currencySymbol"
      v-model:show-salary-info="showSalaryInfo"
      v-model:show-settings="showSettings"
      :always-on-top="false"
      :app-name="appName"
      :autostart-enabled="false"
      :autostart-error="''"
      :daily-earn-text="dailyEarnText"
      :earned-text="earnedText"
      :first-config-issue="firstConfigIssue"
      :has-config-issues="hasConfigIssues"
      :has-issue="hasIssue"
      :is-autostart-updating="false"
      :is-theme-switching="false"
      :is-working-status="isWorkingStatus"
      :middle-stat="middleStat"
      :salary-mode-label="salaryModeLabel"
      :settings-save-error="settingsSaveError"
      :should-show-onboarding="shouldShowOnboarding"
      :show-desktop-features="false"
      :snapshot="snapshot"
      :status-text="statusText"
      :theme-mode="themeMode"
      :update-status="updateStatus"
      :worked-time-text="workedTimeText"
      @complete-onboarding="completeOnboarding"
      @toggle-settings="showSettings = !showSettings"
      @toggle-theme="toggleTheme"
      @update:theme-mode="setThemeMode"
    />
  </main>
</template>

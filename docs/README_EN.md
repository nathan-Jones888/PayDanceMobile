<p align="center">
  <img src="../src-tauri/icons/icon.png" alt="薪跳 PayDance" width="92">
</p>

<h1 align="center">薪跳 PayDance</h1>

<p align="center">
  A real-time mobile wage dashboard that makes every second of earnings visible
</p>

<p align="center">
  <a href="https://paydance.vercel.app/"><strong>Open the mobile app</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="../LICENSE"><strong>AGPL-3.0-only</strong></a>
</p>

---

## Overview

PayDance is a real-time wage dashboard designed for phones. Enter your salary, workdays, and schedule to see today's earnings, work progress, remaining time, and estimated daily income.

The online entry point now serves the mobile interface only and is intended for use in a phone browser.

## Features

- **Live earnings**: today's income updates continuously to two decimal places.
- **Flexible pay modes**: supports monthly, daily, and hourly pay, weekly workdays, lunch breaks, and overnight shifts.
- **Mobile-first layout**: designed for touch input and narrow screens, with light and dark themes.
- **Local storage**: no account required; salary settings and preferences stay on the current device.
- **Bilingual UI**: Simplified Chinese and English.

## Usage

Open the [mobile app](https://paydance.vercel.app/) and follow the first-time setup flow.

## Local development

```powershell
npm install
npm run dev:mobile
npm run build:mobile
```

For native mobile projects, use the Tauri commands:

```powershell
npm run android:init
npm run android:dev
npm run android:build
```

```bash
npm run ios:init
npm run ios:dev
npm run ios:build
```

## Privacy

PayDance requires no login, uploads no data, and includes no telemetry. Settings are stored only in local storage on the current device.

## Tech stack

Vue 3, TypeScript, Vite, Tauri 2, and Rust.

## License and author

PayDance is designed and developed by **Javen** and released under [AGPL-3.0-only](../LICENSE).

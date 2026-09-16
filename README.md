<p align="center">
  <img src="src-tauri/icons/icon.png" alt="薪跳 PayDance" width="92">
</p>

<h1 align="center">薪跳 PayDance</h1>

<p align="center">
  手机端实时工资看板，让每一秒的收入增长都清晰可见
</p>

<p align="center">
  <a href="https://paydance.vercel.app/"><strong>打开手机端</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="LICENSE"><strong>AGPL-3.0-only</strong></a>
</p>

---

## 项目简介

薪跳 PayDance 是一款面向手机端的实时工资看板。配置薪资、工作日和上下班时间后，应用会持续计算并展示今日已赚金额、工作进度、剩余时间和今日预计收入。

当前线上入口只提供手机端界面，适合直接在手机浏览器中打开使用。

## 主要功能

- **实时金额**：今日收入持续更新，精确到小数点后 2 位。
- **灵活计薪**：支持月薪、日薪和时薪，并可配置每周工作日、午休和跨零点夜班。
- **手机端适配**：针对触控操作和窄屏布局设计，支持亮色与暗色主题。
- **本地保存**：无需账号，薪资配置和界面偏好保存在当前设备中。
- **中英双语**：支持简体中文与 English。

## 使用方式

打开[手机端](https://paydance.vercel.app/)，首次使用时按向导填写薪资和工作时间即可。

## 本地开发

安装依赖：

```powershell
npm install
```

启动手机端开发服务：

```powershell
npm run dev:mobile
```

构建手机端：

```powershell
npm run build:mobile
```

Android 和 iOS 原生工程仍使用 Tauri 的移动端命令：

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

## 隐私

薪跳不需要登录，不上传数据，也不包含遥测。配置只保存在当前设备的本地存储中。

## 技术栈

Vue 3、TypeScript、Vite、Tauri 2 和 Rust。

## 许可与作者

薪跳 PayDance 由 **Javen** 设计与开发，代码以 [AGPL-3.0-only](LICENSE) 发布。

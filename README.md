# Dog growth app

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rieko0510s-projects/v0-dog-growth-app-mx)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/czJYQKdv0cI)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## アプリケーション概要 (日本語)

このアプリケーションは、犬の成長記録を管理するためのものです。[v0.dev](https://v0.dev) を使用して開発されました。

### 主な機能 (推定)

- **成長記録**: 日々の体重や体高などの成長データを記録・追加できます。
- **記録一覧**: 登録された成長記録をリスト形式で確認できます。
- **統計表示**: 記録されたデータに基づき、成長の推移をグラフなどで視覚的に表示します。
- **テーマ**: ライトモードとダークモードの切り替えに対応しています。
- **UI**: shadcn/ui などのモダンな UI コンポーネントを使用している可能性があります。

### コントリビューターによる修正

- **React バージョンの修正**: アプリケーション実行時に `TypeError: Cannot read properties of null (reading 'useReducer')` エラーが発生していたため、`package.json` 内の React および React DOM のバージョンを `^19` から `^18` に修正しました。これにより、依存関係の不整合が解消され、アプリケーションが正常に動作するようになりました。

## Deployment

Your project is live at:

**[https://vercel.com/rieko0510s-projects/v0-dog-growth-app-mx](https://vercel.com/rieko0510s-projects/v0-dog-growth-app-mx)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/czJYQKdv0cI](https://v0.dev/chat/projects/czJYQKdv0cI)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
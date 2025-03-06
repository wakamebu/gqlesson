# Nestjs + GraphQL + PureReact チュートリアル

## 環境構築

### パッケージマネージャー
- npm を使用

### バックエンド環境構築 bash

1. NestJS CLIのグローバルインストール

npm i -g @nestjs/cli

2. バックエンドプロジェクトの作成

nest new backend

3. バックエンドディレクトリへ移動

cd project/gq-lesson/backend

4. GraphQL関連パッケージのインストール（Express + Apollo）

npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

5. Dockerの起動と確認（権限が必要のためsudo）
sudo docker compose up -d
sudo docker exec -it postgres psql -U udemy_user udemydb

6.install prisma
npm install prisma --save-dev
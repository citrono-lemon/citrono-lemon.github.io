# Articleの書き方

## フォルダの作成
フォルダ名は何でもいい。
ソートで昇順になるように日付にするとわかりやすい。
フォルダ名より記事URL(`article/[slug]`)を作る。

## index.mdの作成
index.mdを作成する
マークダウンは以下のように、三本ハイフンでヘッダを作成する。
````markdown:index.md
---
title: "記事タイトル"
date: "2022-01-15 01:01:01"
tags: ["タグA", "タグB"]
---

# マークダウン本文
マークダウンは記法一覧と同じ。
但しCSSは一部しか対応していないので注意

## 特殊な記法
### YouTube
```youtube
[動画ID]
```
````

## thumbnailファイルの作成
thumbnailの画像ファイルを同一のフォルダにいれる。

---

エンジョイ😉
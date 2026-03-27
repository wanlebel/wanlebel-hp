# SEO最適化（既存ページ）実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 既存6ページのtitle・meta・JSON-LDを最適化し、山口市・山口県のトリミング系キーワードで上位表示を狙う。

**Architecture:** 静的HTMLファイルへの直接編集。ビルドツールなし。各ページ独立して変更可能。

**Tech Stack:** HTML5 のみ。テストフレームワークなし。検証は grep コマンドで実施。

**Spec:** `docs/superpowers/specs/2026-03-26-seo-optimization-design.md`

---

## ファイル変更マップ

| ファイル | 変更内容 |
|----------|--------|
| `index.html` | title / meta / og / twitter / JSON-LD（フィールド追加） |
| `menu/index.html` | title / meta / og / twitter / JSON-LD（フィールド追加） |
| `gallery/index.html` | title / meta / og / twitter / JSON-LD（フィールド追加 + openingHours追加） |
| `access/index.html` | title / meta / og / twitter / JSON-LD（フィールド追加） / 本文テキスト |
| `faq/index.html` | JSON-LD @graph（LocalBusiness フィールド追加 + FAQPage 2問追加） |
| `policy/index.html` | **変更なし**（spec の「変更しないもの」指示に従う） |

---

## Task 1: index.html — タイトル・メタ・JSON-LD

**Files:**
- Modify: `index.html`

### Step 1-A: title と og:title・twitter:title を更新

- [ ] `index.html` の `<title>` を変更する

```
変更前: <title>山口市の犬トリミングサロン・ペットホテル｜ワン-ルベル</title>
変更後: <title>山口市のトリミングサロン・ペットホテル｜24時間スタッフ在住・駐車場完備｜ワン-ルベル</title>
```

- [ ] `og:title` を変更する

```
変更前: <meta property="og:title" content="山口市の犬トリミングサロン・ペットホテル｜ワン-ルベル">
変更後: <meta property="og:title" content="山口市のトリミングサロン・ペットホテル｜24時間スタッフ在住・駐車場完備｜ワン-ルベル">
```

- [ ] `twitter:title` を変更する

```
変更前: <meta name="twitter:title" content="山口市の犬トリミングサロン・ペットホテル｜ワン-ルベル">
変更後: <meta name="twitter:title" content="山口市のトリミングサロン・ペットホテル｜24時間スタッフ在住・駐車場完備｜ワン-ルベル">
```

### Step 1-B: meta description と og:description・twitter:description を更新

- [ ] `meta name="description"` を変更する

```
変更前: content="山口市の犬専門トリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設で24時間スタッフ在住・ペットカメラ付。資格豊富なトリマーが丁寧にケア。オンライン予約受付中。"
変更後: content="山口市宮野のトリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設・24時間スタッフ在住・ペットカメラ付き。資格豊富なトリマーが丁寧にケア。駐車場完備。オンライン予約受付中。"
```

- [ ] `og:description` を変更する

```
変更前: content="山口市の犬専門トリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設で24時間スタッフ在住。資格豊富なトリマーが丁寧にケア。"
変更後: content="山口市宮野のトリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設・24時間スタッフ在住・ペットカメラ付き。資格豊富なトリマーが丁寧にケア。駐車場完備。オンライン予約受付中。"
```

- [ ] `twitter:description` を変更する

```
変更前: content="山口市の犬専門トリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設。"
変更後: content="山口市宮野のトリミングサロン「ワン-ルベル」。小型犬〜大型犬まで全犬種対応。ペットホテル併設・24時間スタッフ在住・ペットカメラ付き。資格豊富なトリマーが丁寧にケア。駐車場完備。オンライン予約受付中。"
```

### Step 1-C: JSON-LD にフィールドを追加

- [ ] JSON-LD の `"sameAs"` 行の末尾にカンマを追加し、その後に以下を追記する

```
変更前:
    "sameAs": ["https://www.instagram.com/wan.lebel"]
  }

変更後:
    "sameAs": ["https://www.instagram.com/wan.lebel"],
    "telephone": "070-4345-5102",
    "paymentAccepted": "現金, クレジットカード, 電子マネー",
    "currenciesAccepted": "JPY",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.197496,
      "longitude": 131.502849
    }
  }
```

※ `openingHoursSpecification` はすでに存在するので追加不要。
※ `hasMap` はGoogle Maps Place URLが未確定のため今回は省略。

### Step 1-D: 検証

- [ ] 以下のコマンドで変更を確認する（各コマンドが1行だけ出力されればOK）

```bash
grep -c "24時間スタッフ在住・駐車場完備" index.html   # → 1
grep -c "山口市宮野の" index.html                      # → 2（title と meta）
grep -c '"telephone"' index.html                       # → 1（JSON-LD内のみ）
grep -c "GeoCoordinates" index.html                    # → 1
```

### Step 1-E: コミット

- [ ] コミットする

```bash
git add index.html
git commit -m "seo: TOPページのtitle・meta・JSON-LD最適化"
```

---

## Task 2: menu/index.html — タイトル・メタ・JSON-LD

**Files:**
- Modify: `menu/index.html`

### Step 2-A: title と og:title・twitter:title を更新

- [ ] `<title>` を変更する

```
変更前: <title>トリミング料金・メニュー｜山口市のワン-ルベル【全犬種対応】</title>
変更後: <title>山口市のトリミング料金・メニュー｜小型犬3,500円〜・全犬種対応｜ワン-ルベル</title>
```

- [ ] `og:title` を変更する

```
変更前: <meta property="og:title" content="トリミング料金・メニュー｜山口市のワン-ルベル">
変更後: <meta property="og:title" content="山口市のトリミング料金・メニュー｜小型犬3,500円〜・全犬種対応｜ワン-ルベル">
```

- [ ] `twitter:title` を変更する

```
変更前: <meta name="twitter:title" content="トリミング料金・メニュー｜山口市のワン-ルベル">
変更後: <meta name="twitter:title" content="山口市のトリミング料金・メニュー｜小型犬3,500円〜・全犬種対応｜ワン-ルベル">
```

### Step 2-B: meta description と og:description・twitter:description を更新

- [ ] `meta name="description"` を変更する

```
変更前: content="山口市のトリミングサロン「ワン-ルベル」の料金表。チワワ3,500円〜、プードル5,500円〜、柴犬6,300円〜、ゴールデン9,000円〜。ペットホテルは3,500円〜。全犬種対応。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の料金表。チワワ3,500円〜、トイプードル5,500円〜、柴犬6,300円〜、ゴールデン9,000円〜。ペットホテル1泊3,500円〜。全犬種対応・明朗料金。駐車場完備。"
```

- [ ] `og:description` を変更する

```
変更前: content="チワワ・プードル・柴犬・ゴールデンなど全犬種のトリミング料金。ペットホテルも3,500円〜。山口市のワン-ルベル。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の料金表。チワワ3,500円〜、トイプードル5,500円〜、柴犬6,300円〜、ゴールデン9,000円〜。ペットホテル1泊3,500円〜。全犬種対応・明朗料金。駐車場完備。"
```

- [ ] `twitter:description` を変更する

```
変更前: content="全犬種対応のトリミング料金表。ペットホテルも3,500円〜。山口市のワン-ルベル。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の料金表。チワワ3,500円〜、トイプードル5,500円〜、柴犬6,300円〜、ゴールデン9,000円〜。ペットホテル1泊3,500円〜。全犬種対応・明朗料金。駐車場完備。"
```

### Step 2-C: JSON-LD にフィールドを追加

- [ ] `menu/index.html` の `"sameAs"` 行を以下のように変更する（index.html と同じパターン）

```
変更前:
    "sameAs": ["https://www.instagram.com/wan.lebel"]
  }

変更後:
    "sameAs": ["https://www.instagram.com/wan.lebel"],
    "telephone": "070-4345-5102",
    "paymentAccepted": "現金, クレジットカード, 電子マネー",
    "currenciesAccepted": "JPY",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.197496,
      "longitude": 131.502849
    }
  }
```

※ `hasMap` はGoogle Maps Place URLが未確定のため省略。

### Step 2-D: 検証

- [ ] 変更を確認する（各コマンドが指定数だけ出力されればOK）

```bash
grep -c "小型犬3,500円〜・全犬種対応" menu/index.html  # → 1
grep -c "トイプードル5,500円〜" menu/index.html         # → 1
grep -c '"telephone"' menu/index.html                   # → 1
grep -c "GeoCoordinates" menu/index.html                # → 1
```

### Step 2-E: コミット

- [ ] コミットする

```bash
git add menu/index.html
git commit -m "seo: メニューページのtitle・meta・JSON-LD最適化"
```

---

## Task 3: gallery/index.html — タイトル・メタ・JSON-LD

**Files:**
- Modify: `gallery/index.html`

### Step 3-A: title と og:title・twitter:title を更新

- [ ] `<title>` を変更する

```
変更前: <title>トリミング仕上がり例・ギャラリー｜山口市のワン-ルベル</title>
変更後: <title>トリミング仕上がり例｜山口市のトリミングサロン ワン-ルベル</title>
```

- [ ] `og:title` を変更する

```
変更前: <meta property="og:title" content="トリミング仕上がり例・ギャラリー｜山口市のワン-ルベル">
変更後: <meta property="og:title" content="トリミング仕上がり例｜山口市のトリミングサロン ワン-ルベル">
```

- [ ] `twitter:title` を変更する

```
変更前: <meta name="twitter:title" content="トリミング仕上がり例・ギャラリー｜山口市のワン-ルベル">
変更後: <meta name="twitter:title" content="トリミング仕上がり例｜山口市のトリミングサロン ワン-ルベル">
```

### Step 3-B: meta description と og:description・twitter:description を更新

- [ ] `meta name="description"` を変更する

```
変更前: content="山口市のトリミングサロン「ワン-ルベル」の仕上がり例。チワワ・ポメラニアン・プードル・柴犬・ゴールデンなど多種の犬種のカットスタイルをご覧いただけます。Instagramでも公開中。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の仕上がり例。チワワ・トイプードル・柴犬・ゴールデンなど全犬種対応。施術後の写真をInstagramでも公開中。オープン後随時更新。"
```

- [ ] `og:description` を変更する

```
変更前: content="チワワ・プードル・柴犬・ゴールデンなど様々な犬種のトリミング仕上がり例。山口市のワン-ルベル。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の仕上がり例。チワワ・トイプードル・柴犬・ゴールデンなど全犬種対応。施術後の写真をInstagramでも公開中。オープン後随時更新。"
```

- [ ] `twitter:description` を変更する

```
変更前: content="様々な犬種のトリミング仕上がり例。山口市のワン-ルベル。Instagramでも公開中。"
変更後: content="山口市のトリミングサロン「ワン-ルベル」の仕上がり例。チワワ・トイプードル・柴犬・ゴールデンなど全犬種対応。施術後の写真をInstagramでも公開中。オープン後随時更新。"
```

### Step 3-C: JSON-LD にフィールドと openingHoursSpecification を追加

`gallery/index.html` の JSON-LD には `openingHoursSpecification` が存在しない。`"sameAs"` 行を以下のように変更する：

- [ ] `"sameAs"` 行を変更する

```
変更前:
    "sameAs": ["https://www.instagram.com/wan.lebel"]
  }

変更後:
    "sameAs": ["https://www.instagram.com/wan.lebel"],
    "telephone": "070-4345-5102",
    "paymentAccepted": "現金, クレジットカード, 電子マネー",
    "currenciesAccepted": "JPY",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.197496,
      "longitude": 131.502849
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  }
```

※ `hasMap` はGoogle Maps Place URLが未確定のため省略。

### Step 3-D: 検証

- [ ] 変更を確認する（各コマンドが指定数だけ出力されればOK）

```bash
grep -c "トリミング仕上がり例｜山口市" gallery/index.html   # → 1
grep -c "トイプードル" gallery/index.html                    # → 1
grep -c '"telephone"' gallery/index.html                    # → 1
grep -c "openingHoursSpecification" gallery/index.html      # → 2（開始・終了タグ各1）
```

### Step 3-E: コミット

- [ ] コミットする

```bash
git add gallery/index.html
git commit -m "seo: ギャラリーページのtitle・meta・JSON-LD最適化"
```

---

## Task 4: access/index.html — タイトル・メタ・JSON-LD・本文

**Files:**
- Modify: `access/index.html`

### Step 4-A: title と og:title・twitter:title を更新

- [ ] `<title>` を変更する

```
変更前: <title>アクセス・営業時間｜山口市のトリミングサロン ワン-ルベル</title>
変更後: <title>アクセス・営業時間｜山口市宮野のトリミングサロン ワン-ルベル【駐車場4台】</title>
```

- [ ] `og:title` を変更する

```
変更前: <meta property="og:title" content="アクセス・営業時間｜山口市のトリミングサロン ワン-ルベル">
変更後: <meta property="og:title" content="アクセス・営業時間｜山口市宮野のトリミングサロン ワン-ルベル【駐車場4台】">
```

- [ ] `twitter:title` を変更する

```
変更前: <meta name="twitter:title" content="アクセス・営業時間｜山口市のトリミングサロン ワン-ルベル">
変更後: <meta name="twitter:title" content="アクセス・営業時間｜山口市宮野のトリミングサロン ワン-ルベル【駐車場4台】">
```

### Step 4-B: meta description と og:description・twitter:description を更新

- [ ] `meta name="description"` を変更する

```
変更前: content="ワン-ルベルのアクセス・営業時間。山口県山口市の犬専門トリミングサロン。9:00〜18:00（不定休）。お気軽にご来店ください。"
変更後: content="ワン-ルベルのアクセス・営業時間。山口市宮野（宮野下2930-1）のトリミングサロン。9:00〜18:00・不定休。駐車場4台（無料）。お電話・オンラインでご予約を。"
```

- [ ] `og:description` を変更する

```
変更前: content="山口市の犬専門トリミングサロン「ワン-ルベル」のアクセス・営業時間。9:00〜18:00、不定休。"
変更後: content="ワン-ルベルのアクセス・営業時間。山口市宮野（宮野下2930-1）のトリミングサロン。9:00〜18:00・不定休。駐車場4台（無料）。お電話・オンラインでご予約を。"
```

- [ ] `twitter:description` を変更する

```
変更前: content="山口市の犬専門トリミングサロン「ワン-ルベル」のアクセス・営業時間。"
変更後: content="ワン-ルベルのアクセス・営業時間。山口市宮野（宮野下2930-1）のトリミングサロン。9:00〜18:00・不定休。駐車場4台（無料）。お電話・オンラインでご予約を。"
```

### Step 4-C: JSON-LD にフィールドを追加

`access/index.html` の JSON-LD には `openingHoursSpecification` がすでに存在する。`"sameAs"` 行を変更する：

- [ ] `"sameAs"` 行を変更する

```
変更前:
    "sameAs": ["https://www.instagram.com/wan.lebel"]
  }

変更後:
    "sameAs": ["https://www.instagram.com/wan.lebel"],
    "telephone": "070-4345-5102",
    "paymentAccepted": "現金, クレジットカード, 電子マネー",
    "currenciesAccepted": "JPY",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.197496,
      "longitude": 131.502849
    }
  }
```

### Step 4-D: 本文の住所テキストに「宮野エリア」を追記

`access/index.html` の店舗情報テーブルに `<th>住所</th>` という行がある（約188行目付近）。`<td>` の内容を変更する：

- [ ] 住所セルの内容を変更する

```
変更前: <td>〒754-0001<br>山口県山口市宮野下2930-1</td>
変更後: <td>〒754-0001<br>山口県山口市宮野下2930-1（宮野エリア）</td>
```

※ `hasMap` はGoogle Maps Place URLが未確定のため省略。

### Step 4-E: 検証

- [ ] 変更を確認する（各コマンドが指定数だけ出力されればOK）

```bash
grep -c "山口市宮野のトリミングサロン" access/index.html  # → 3（title・og・twitter）
grep -c '"telephone"' access/index.html                   # → 1
grep -c "宮野エリア" access/index.html                    # → 1
```

### Step 4-F: コミット

- [ ] コミットする

```bash
git add access/index.html
git commit -m "seo: アクセスページのtitle・meta・JSON-LD・本文最適化"
```

---

## Task 5: faq/index.html — JSON-LD @graph 修正

**Files:**
- Modify: `faq/index.html`

`faq/index.html` の JSON-LD は `@graph` 配列構造。`@graph[0]` が `LocalBusiness`、`@graph[1]` が `FAQPage`。
title・meta・OGP・Twitter Card は変更しない。

### Step 5-A: @graph[0]（LocalBusiness）にフィールドを追加

`@graph[0]` の LocalBusiness ノードは現在以下で終わっている：

```json
        "priceRange": "¥¥"
      },
```

- [ ] `"priceRange": "¥¥"` の後にカンマを追加し、新フィールドを追記する

```
変更前:
        "priceRange": "¥¥"
      },

変更後:
        "priceRange": "¥¥",
        "telephone": "070-4345-5102",
        "paymentAccepted": "現金, クレジットカード, 電子マネー",
        "currenciesAccepted": "JPY",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.197496,
          "longitude": 131.502849
        }
      },
```

### Step 5-B: @graph[1]（FAQPage）の mainEntity に2問を追加

`@graph[1]` の `mainEntity` 配列は現在6問ある。最後の問（支払い方法）の後に2問を追加する。

現在の最後の質問ブロックは以下で終わっている：

```json
          {
            "@type": "Question",
            "name": "支払い方法を教えてください",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "お支払いは施術後、店頭にてお願いしております。現金・各種クレジットカード・電子マネーに対応しています。"
            }
          }
        ]
```

- [ ] 最後の質問の閉じ括弧 `}` の直後にカンマを追加し、2問を追加する

```
変更前:
          {
            "@type": "Question",
            "name": "支払い方法を教えてください",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "お支払いは施術後、店頭にてお願いしております。現金・各種クレジットカード・電子マネーに対応しています。"
            }
          }
        ]

変更後:
          {
            "@type": "Question",
            "name": "支払い方法を教えてください",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "お支払いは施術後、店頭にてお願いしております。現金・各種クレジットカード・電子マネーに対応しています。"
            }
          },
          {
            "@type": "Question",
            "name": "当日の飛び込みは可能ですか？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "空き状況によってはご対応できる場合がございます。当日ご来店の前に、お電話にてご確認ください（070-4345-5102）。"
            }
          },
          {
            "@type": "Question",
            "name": "子犬や高齢犬でも対応してもらえますか？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "はい、対応しています。子犬の場合は初めてのトリミング体験を大切に、ストレスをなるべくかけないよう丁寧に進めます。高齢犬は体の状態に合わせて無理のない範囲で対応いたします。"
            }
          }
        ]
```

※ `hasMap` はGoogle Maps Place URLが未確定のため省略。

### Step 5-C: 検証

- [ ] 変更を確認する（各コマンドが指定数だけ出力されればOK）

```bash
grep -c '"telephone"' faq/index.html    # → 1
grep -c "GeoCoordinates" faq/index.html # → 1
grep -c "当日の飛び込み" faq/index.html  # → 2（HTML本文 + JSON-LD）
grep -c "子犬や高齢犬" faq/index.html    # → 2（HTML本文 + JSON-LD）
```

- [ ] JSON が壊れていないことを確認する（`jq` が使える場合）

```bash
# JSON-LD部分を抽出して構文チェック
python3 -c "
import re, json, sys
html = open('faq/index.html').read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
for i, b in enumerate(blocks):
    try:
        json.loads(b)
        print(f'Block {i}: OK')
    except Exception as e:
        print(f'Block {i}: ERROR - {e}')
        sys.exit(1)
"
```

期待出力: `Block 0: OK`

### Step 5-D: コミット

- [ ] コミットする

```bash
git add faq/index.html
git commit -m "seo: FAQページのJSON-LD強化（LocalBusiness + FAQPage拡張）"
```

---

## Task 6: 最終検証・プッシュ

### Step 6-A: 全ページのJSON-LDを一括検証

- [ ] 以下のスクリプトで全ページを検証する

```bash
python3 -c "
import re, json, sys, glob
errors = []
for path in sorted(glob.glob('**/index.html', recursive=True)):
    html = open(path).read()
    blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
    for i, b in enumerate(blocks):
        try:
            json.loads(b)
        except Exception as e:
            errors.append(f'{path} block {i}: {e}')
if errors:
    for e in errors: print('ERROR:', e)
    sys.exit(1)
else:
    print('All JSON-LD blocks valid')
"
```

期待出力: `All JSON-LD blocks valid`

### Step 6-B: developブランチにプッシュ

- [ ] プッシュする

```bash
git push origin develop
```

### Step 6-C: mainにマージしてプッシュ

- [ ] mainにマージする

```bash
git checkout main
git merge develop --no-ff -m "seo: 全ページのtitle・meta・JSON-LD最適化"
git push origin main
git checkout develop
```

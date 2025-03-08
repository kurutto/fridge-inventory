# ER 図

## Fridge Inventory APP データベース

```mermaid
---
title: "タイトル"
---
erDiagram

    account ||--o{ users : ""
    inventory ||--o{ purchases : ""
    purchases ||--|| users : ""
    shopping_list ||--|| inventory : ""

    account {
        bigint id PK "ID"
        varchar name "名前"
        varchar description "説明"
    }
    users {
        bigint id PK "ID"
        bigint account_id FK "アカウントID:account.id"
        varchar name "名前"
    }
    inventory {
        bigint id PK "ID"
        varchar category "カテゴリー"
        varcher general_name "一般名"
        int remaining "残量"
    }
    purchases {
        bigint id PK "ID"
        bigint inventory_id FK "在庫ID:inventory.id"
        bigint user_id FK "ユーザーID:users.id"
        varcher name "商品名"
        varcher general_name "一般名"
        varchar category "カテゴリー"
        timestamp purchase_date "購入日"
    }
    shopping_list {
        bigint id PK "ID"
        bigint inventory_id FK "在庫ID:inventory.id"
        varcher name "品名"
        timestamp created_at "入力日"
        timestamp due_date "期限日"
    }
```

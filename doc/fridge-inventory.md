# ER 図

## Fridge Inventory APP データベース

```mermaid
---
title: "常備品管理ができる買い物リストアプリ"
---
erDiagram

    account ||--|{ users : ""
    inventories ||--o{ purchases : ""
    purchases ||--|| users : ""
    shopping_list ||--|| inventories : ""

    account {
        bigint id PK "ID"
        varchar name "名前"
        varchar description "説明（null許容）"
    }
    users {
        bigint id PK "ID"
        bigint account_id FK "アカウントID:account.id"
        varchar name "名前"
    }
    inventories {
        bigint id PK "ID"
        varchar name "品名"
        float remaining "残数"
    }
    purchases {
        bigint id PK "ID"
        bigint inventory_id FK "在庫ID:inventories.id（null許容）" 
        bigint user_id FK "ユーザーID:users.id"
        varchar name "商品名"
        varchar general_name "一般名"
        archar category "カテゴリー（null許容）"
        timestamp purchase_date "購入日"
    }
    shopping_list {
        bigint id PK "ID"
        bigint inventory_id FK "在庫ID:inventories.id（null許容）"
        varchar name "品名"
        timestamp created_at "入力日"
        timestamp due_date "期限日（null許容）"
    }
```

# ER 図

## Fridge Inventory APP データベース

```mermaid
---
title: "常備品管理ができる買い物リストアプリ"
---
erDiagram

    users ||--|{ accounts : ""
    users ||--|{ credentials : ""
    fi_accounts ||--|{ users : ""
    inventories ||--o{ purchases : ""
    purchases ||--|| users : ""
    shopping_list ||--|| inventories : ""

    accounts {
        string id PK "ID"
        string user_id FK "ユーザーID:users.id"
        string providerType "プロバイダー"
        string provider_id "プロバイダーID"
        string provider_account_id "プロバイダーアカウントID"
        string refresh_token "リフレッシュトークン"
        string access_token "アクセストークン"
        datetime access_token_expires "アクセストークンの有効期限"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    users {
        string id PK "ID"
        string app_account FK "在庫管理カウント:fi_accounts.id"
        string name "名前"
        string email "メールアドレス"
        datetime email_verified "認証日時（null許容）"
        string image "イメージ画像"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    credentials{
        string id PK "ID"
        string user_id FK "ユーザーID:users.id"
        string hashed_password "ハッシュ化パスワード"
        boolean verified "検証済"
        datetime created_at "作成日時"
    }
    fi_accounts {
        string id PK "ID"
        string hashed_password "ハッシュ化パスワード"
        string name "名前"
        string description "説明（null許容）"
    }
    inventories {
        string id PK "ID"
        string name "品名"
        float remaining "残数"
    }
    purchases {
        string id PK "ID"
        string inventory_id FK "在庫ID:inventories.id（null許容）"
        string user_id FK "ユーザーID:users.id"
        string name "商品名"
        string general_name "一般名"
        string category "カテゴリー（null許容）"
        timestamp purchase_date "購入日"
    }
    shopping_list {
        string id PK "ID"
        string inventory_id FK "在庫ID:inventories.id（null許容）"
        string name "品名"
        timestamp created_at "入力日"
        timestamp due_date "期限日（null許容）"
    }
```

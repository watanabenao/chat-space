## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


# gas-virusmail-search
ウイルスメール集計
```
.
├── README.md                # 説明
├── appsscript.json          # マニフェストファイル
├── common.gs                # 共通クラス
├── config.gs                # 設定クラス
├── css.html                 # css
├── index.html               # html
├── js.html                  # javascript
├── main.gs                  # main処理(web呼び出し・gas連携)
├── virusAggregate.gs        # メールデータ取得スクリプト(web画面連携)
└── virusAggregateScript.gs  # メールデータ取得スクリプト(単体)
```
#### シーケンス図
```mermaid
sequenceDiagram
    autonumber
    actor user as user<br/>ユーザー
    participant browser as browser<br/>ブラウザ
    participant gas as GAS<br/>Google Apps Script
    participant sheets as Google Sheets<br/>Google スプレットシート
    participant gmail as Gmail<br/>Gメール
    user->>browser: アクセス
    browser->>user: 表示
    user->>browser: Gmailデータ表示リクエスト
    browser->>gas: データ送信
    gas-->>sheets: 初期化
    gas->>gmail: データ取得リクエスト
    gmail->>gas: データ取得レスポンス
    gas->>gas: データ加工
    gas-->>sheets: データ書き込み
    gas->>browser: 加工データ送信
    browser->>user: Gmailデータ表示レスポンス
    user->>browser: ダウンロードリクエスト
    browser->>browser: ダウンロードデータ生成
    browser->>user: ダウンロード
```

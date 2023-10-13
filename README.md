# gas-virusmail-search
ウイルスメール集計

デモページ ![Google Apps Script ※Googleアカウント必須](https://script.google.com/macros/s/AKfycbw0aJHJFEd5s6effsl9czf4vbV711MR--DFTTrmTyCcEiZ03KIW3RxpVTAcbOxbvXnx/exec)

```
.
├── README.md                # 説明
├── accessLog.gs             # アクセスログ
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
    participant accesslog as Google Apps Script<br/>アクセスログ
    participant access as Google Sheets<br/>シート名:アクセスログ
    participant ipinfo as ipinfo.io<br/>api
    participant gas as Google Apps Script<br/>集計処理
    participant table as Google Sheets<br/>シート名:テーブル
    participant gmail as Gmail<br/>Gメール

    user->>browser: アクセス
    browser->>user: 表示
    rect rgba(200, 150, 255,0.1)
      note over browser,ipinfo: 非同期<br/>※広告ブロックのアドオンが入っているとIPアドレス取得が出来ない
      browser--)ipinfo: IPアドレス取得リクエスト
      ipinfo--)browser: IPアドレス取得レスポンス
      browser--)accesslog: アクセス情報書き込みリクエスト
      accesslog--)access: アクセス情報書き込み
    end
    user->>browser: Gmailデータ表示リクエスト
    browser->>gas: データ送信
    gas-->>table: 初期化
    gas->>gmail: データ取得リクエスト
    gmail->>gas: データ取得レスポンス
    gas->>gas: データ加工
    gas-->>table: データ書き込み
    gas->>browser: 加工データ送信
    browser->>user: Gmailデータ表示レスポンス
    user->>browser: ダウンロードリクエスト
    browser->>browser: ダウンロードデータ生成
    browser->>user: ダウンロード
```

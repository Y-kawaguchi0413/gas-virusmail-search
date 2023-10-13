/**
 * 設定関連
 */
class Config {

  constructor() {

    Object.defineProperties(this, {
      DEMO: {value: true},
      DEMO_TITLE: {value: 'DEMO PAGE'},
      DEMO_NOTES: {value: '※ これはデモページです'},
      DEMO_SHEET: {value: 'demo'},
      DEMO_DATE_MIN: {value: '2023-01-01'},
      DEMO_DATE_MAX: {value: '2023-12-31'},
      WEB_TITLE: {value: 'ウイルスメール検索・集計'},
      SHEET_NAME: {value: 'テーブル'},
      LOG_SHEET_NAME: {value: 'アクセスログ'},
      LABEL: {value: 'label:ウイルスメール検知'},
      TITLE: {value: [["日付", "件名", "メッセージID", "添付ファイル", "ウイルス名"]]},
      MONTH_ENGLISH_LIST: {value: {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      }},
      REPLACE_KEY: {
        value: {
          virusName: ["ウイルス名:"],
          subject: ["件名:","###WARNING(spoofing) ###","###WARNING(spam) ###"],
          messageId: ["メッセージID: "],
          attachedFile:["添付ファイル:"],
        }
      }
    });

  }

  // getter
  getSheetName() { return this.SHEET_NAME; }
  getTitle(){ return this.TITLE; }

}


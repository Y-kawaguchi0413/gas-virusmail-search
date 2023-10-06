/**
 * 設定関連
 */
class Config {
  constructor() {

    this.shieetName = 'テーブル';
    this.label = "label:ウイルスメール検知";
    this.title = [
      ["日付", "件名", "メッセージID", "添付ファイル", "ウイルス名"],
    ];

    // 月
    this.monthEnglishList = {
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
    };

    // 置換文字列
    this.replaceKey = {
      virusName: ["ウイルス名:"],
      subject: ["件名:","###WARNING(spoofing) ###","###WARNING(spam) ###"],
      messageId: ["メッセージID: "],
      attachedFile:["添付ファイル:"],
    }

  }

  // getter
  getSheetName() { return this.shieetName; }
  getTitle(){ return this.title; }


}


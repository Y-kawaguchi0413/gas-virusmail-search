/**
 * 共通
 */
class Common extends Config {

  /**
   * unixtime取得
   * @param {Array} date
   * @param {String} key
   * @returns
   */
  getUnixtime(date, key) {

    let param = [];

    if (key == "start") {
      param = { hours:0, minutes:0, seconds:0 };
    } else if (key == "end") {
      param = { hours:23, minutes:59, seconds:59 };
    } else {
      throw new Error('getUnixTime Error.');
    }

    // new Date(year, monthIndex, day, hours, minutes, seconds)
    let days = new Date(
      date[0],
      Number(date[1]) - 1,
      date[2],
      param["hours"],
      param["minutes"],
      param["seconds"]
    );

    return Math.floor(days / 1000).toString();
  }

  /**
   * 検索範囲取得
   * @param {Number} startUnixtime
   * @param {Number} endUnixtime
   * @returns {String}
   */
  getQuery(startUnixtime, endUnixtime) {
    return `after:${startUnixtime} before:${endUnixtime}`;
  }

  /**
   * データ加工
   * @param {Array} bodyData : 加工前のメールデータ
   * @return {Array} result  : 加工後のデータ
   */
  getProcessedData(bodyData, mailDate) {

    let result = {date:'',subject:'',messageId:'',attachedFile:'',virusName:''}

    // 日時フォーマット　※後ろから3文字(秒部分)は削除(slice関数)
    result['date'] = this.dateFormat(mailDate.toString()).slice(0, -3);

    for (const [key,value] of Object.entries(bodyData)) {

      if (bodyData[key].includes('件名:')) {
        result['subject'] = value;
      }
      if (bodyData[key].includes('メッセージID:')) {
        result['messageId'] = value;
      }
      if (bodyData[key].includes('添付ファイル:')) {
        result['attachedFile'] = value;
      }
      if (bodyData[key].includes('ウイルス名:')) {
        result['virusName'] = value;
      }
    }

    return result;
  }

  /**
   * 日時フォーマット
   * @param  {String} defaultDate : 日時 (ddd MM DD YYYY hh:mm GMT+0900(Japan Standard Time))
   * @return {String}             : 日時 (YYYY:MM:DD hh:mm)
   */
  dateFormat(defaultDate) {
    let dateAry = defaultDate.split(/\s+/);
    let date = this.MONTH_ENGLISH_LIST[dateAry[1]].toString().padStart(2, '0')
    return `${dateAry[3]}-${date}-${dateAry[2]}\t${dateAry[4]}`;
  }

  /**
   * ID検索
   * @param id : メールのユニークID
   */
  hasId(mySheet, id) {

    //F列(メッセージID)を検索範囲とする
    var data = mySheet.getRange(1, 6, mySheet.getLastRow(), 1).getValues();

    //コールバック関数
    var hasId = data.some(function (value, index, data) {
      return value[0] === id;
    });

    return hasId;
  }

  /**
   * 配列の値チェック
   * @param {Object} obj   : オブジェクト
   * @param {String} value : 値
   */
  checkValueExists(obj, value) {
    return Object.values(obj).includes(value);
  }

  /**
   * 配列のキーチェック
   * @param {Object} obj          : オブジェクト
   * @param {String | Number} key : キー
   */
  checkKeyExists(obj, key) {
    return key in obj ? true : false;
  }

  /**
   * ソート処理 (日付（昇順）)
   * @param {Array} valMsgs : データ配列
   * @param {Array} valMsgs : ソート後のデータ配列
   */
  sort(valMsgs) {
    valMsgs.sort(function (a, b) {
      //if (a[4] < b[4]) return -1;
      //if (a[4] > b[4]) return 1;
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    });
    return valMsgs;
  }

  /**
   * 不要文字削除(Config.replaceKeyに削除する文字列記載)
   * @param {String} reps : 元の文字列
   * @param {String} key  : Config.replaceKeyの参照用キー
   */
  replace(reps, key) {

    if (!this.checkKeyExists(this.REPLACE_KEY, key)) {
      throw new Error("not replaceKey");
    }

    let result = "";

    for (let i = 0; i < this.REPLACE_KEY[key].length; i++) {
      if (i > 0) {
        reps = result;
      }
      result = reps.replace(this.REPLACE_KEY[key][i], "").trimStart().trimEnd();
    }

    return result;
  }

  /**
   * 現在の時刻を返す。実行時間の計算で使用
   * gas環境下ではperformanceが使用できない
   */
  nowTime() {
    return Date.now();
    //return performance.now();
  }

  // -----------------------------------------------
  // 削除予定コード
  // -----------------------------------------------

  /**
   * 2023年6月以降メール本文が変わったため処理を変更
   * こちらは2023年6月以前の関数
   * のちほど削除予定
   * 
   * Excel用データ加工
   * @param {Array} bodyData 
   * @returns {Array}
   */
  /*
  getProcessedData(bodyData) {

    // 2023年5月頃からメールの本文が変わったため暫定処理
    if (bodyData[6].includes('エンベロープ')) {
      delete bodyData[6];
      bodyData = bodyData.filter(Boolean);
    }
    // 2023年7月頃のメール本文が変わったため暫定処理
    if (bodyData[2].includes('エンベロープ')) {
      delete bodyData[2];
      bodyData = bodyData.filter(Boolean);
    }

    let result = {
      date: this.dateFormat(bodyData[2]).slice(0,-3),
      subject: bodyData[8],
      messageId:bodyData[9],
      attachedFile: bodyData[10],
      virusName: bodyData[11],
    };

    return result;
  }
  */

  /**
   * 2023年6月以降メール本文が変わったため処理を変更
   * こちらは2023年6月以前の関数
   * のちほど削除予定
   * 
   * メール本文の日付からフォーマット変更
   * @param  {Object} bodyData : メール本文(例)受信日時: Fri, 22 Jan 2021 21:02:25 JST
   * @return {String}          : 変更後の日付(yyyy/mm/dd  hh:mm)
   */
  /*
  dateFormat(bodyData) {

    let dateAry = bodyData.split(/\s+/);
    dateAry.shift();
    dateAry.pop();
    dateAry[0] = dateAry[0].replace(",", "");
    let date = this.MONTH_ENGLISH_LIST[dateAry[2]].toString().padStart(2, '0')
    return `${dateAry[3]}-${date}-${dateAry[1]}\t${dateAry[4]}`;
    //return `${this.MONTH_ENGLISH_LIST[dateAry[2]]}/${dateAry[1]}\t${dateAry[4]}`;
  }
  */

}


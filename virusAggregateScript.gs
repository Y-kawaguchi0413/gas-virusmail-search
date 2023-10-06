/**
 * ウイルスメール集計関連(Script)
 */

/**
 * 集計処理
 * @param {Array} startDate : [year, month, day]
 * @param {Array} endDate   : [year, month, day]
 */
function localSearchContactMail(startDate = Array(), endDate = Array()) {

  // param
  startDate = ["","",""];                 // 開始時間 (yyyy,mm,dd)
  endDate = ["","",""];                   // 終了時間 (yyyy,mm,dd)
  const id = ''; // フォルダID

  const common = new Common();

  const start = common.nowTime();
  
  let mySheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(common.getSheetName())
    .clear();

  let title = common.getTitle();
  mySheet.getRange(1, 1, 1, title[0].length).setValues(title);

  /* monthは0始まり unixtimeに変換 */
  let startUnixtime = common.getUnixtime(startDate, "start");
  let endUnixtime = common.getUnixtime(endDate, "end");

  let query = common.getQuery(startUnixtime, endUnixtime);

  /* Gmailから特定条件のスレッドを検索しメールを取り出す */
  //let myThreads = GmailApp.search(query + " " + common.label, 0, 30);
  let myThreads = GmailApp.search(query + " " + common.label);
  let myMsgs = GmailApp.getMessagesForThreads(myThreads); //二次元配列

  let valMsgs = [];
  let viewData = [];
  let body = "";
  let bodyData = [];
  let processedData = {
    date: "",
    subject: "",
    messageId: "",
    attachedFile: "",
    virusName: "",
  };
  let virusData = {};
  let virusName = "";
  let subject = "";
  let attachedFile = "";
  let mailDate;

  /* 各メールから日時、送信元、件名、内容を取り出す */
  // entriesとkeysのほうが処理が速いが、可読性のためvaluesを使用
  for (const values of Object.values(myMsgs)) {
    for (const value of Object.values(values)) {

      // 文字列
      body = value.getPlainBody();

      mailDate = value.getDate();

      // 配列化
      bodyData = body.split("\r\n").filter(Boolean);

      // 成形
      processedData = common.getProcessedData(bodyData, mailDate);

      subject = common.replace(processedData["subject"], "subject");
      messageId = common.replace(processedData["messageId"], "messageId");
      attachedFile = common.replace(processedData["attachedFile"], "attachedFile");
      virusName = common.replace(processedData["virusName"], "virusName");

      if (!virusName) { continue; }

      // スプレッドシート用データ
      valMsgs.push([
        processedData["date"],
        subject,
        messageId,
        attachedFile,
        virusName,
      ]);

      // 表示用データ
      viewData.push({
        date: processedData["date"],
        subject: subject,
        messageId: messageId,
        attachedFile: attachedFile,
        virusName: virusName,
      });

      if (!common.checkKeyExists(virusData, virusName)) {
        virusData[virusName] = {subject: [], attachedFile: [], count: 1, data: []};
      } else {
        virusData[virusName]["count"]++;
      }

      // 日報用データ
      virusData[virusName]["data"].push([
        processedData["date"],
        processedData["subject"], 
        processedData["messageId"],
        processedData["attachedFile"],
        processedData["virusName"],
      ]);

      if (!common.checkValueExists(virusData[virusName]["subject"], subject)) {
        virusData[virusName]["subject"].push(subject);
      }

      if (!common.checkValueExists(virusData[virusName]["attachedFile"], attachedFile)) {
        virusData[virusName]["attachedFile"].push(attachedFile);
      }

    } // end for values
  } // end for myMsgs

  let text_data = ''

  /* スプレッドシートに出力 */
  if (valMsgs.length > 0) {

    valMsgs = common.sort(valMsgs);

    //新規メールがある場合、末尾に追加する
    var lastRow = mySheet.getDataRange().getLastRow();
    mySheet.getRange(lastRow + 1, 1, valMsgs.length, 5).setValues(valMsgs);

    let file = getFileName();
    text_data = convertData(valMsgs);

    //createCsvFile_(id, file, text_data)

  }

  const end = common.nowTime();
  const time = Math.floor((end - start) / 1000);

  console.log(text_data)
  console.log(`実行時間:${time}秒`);

}

function getFileName() {

  let today = new Date();

  // 年月日を取得
  let year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0');        // 1月~12月 -> 0~11
  let date = today.getDate().toString().padStart(2, '0');
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  return `${year}${month}${date}${hour}${minute}${second}.txt`;
}

function convertData(data) {

  let result = ''

  for (let i = 0; i <= data.length; i++) {
    if (i === data.length) {
      result += data[i]
    } else {
      result += `${data[i]}\r\n}`
    }
  }

  return result;
}

function createCsvFile_(folderId, fileName, contents) {

  // コンテンツタイプ
  const contentType = 'text/csv';

  // 文字コード
  const charset = 'UTF-8';

  // 出力するフォルダ
  const folder = DriveApp.getFolderById(folderId);

  // Blob を作成する
  const blob = Utilities.newBlob('', contentType, fileName).setDataFromString(contents, charset);

  // ファイルに保存
  folder.createFile(blob);
}

/**
 * ウイルスメール集計関連
 */

/**
 * 集計処理
 * @param {Array} startDate : [year, month, day]
 * @param {Array} endDate   : [year, month, day]
 */
function searchContactMail(startDate = Array(), endDate = Array()) {

  // test code
  //startDate = ["2023","07","01"];
  //endDate = ["2023","07","31"];

  const common = new Common();

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
  let myThreads = GmailApp.search(query + " " + common.label);
  let myMsgs = GmailApp.getMessagesForThreads(myThreads); //二次元配列

  let valMsgs = [];
  let viewData = [];
  let processedData = {
    date: "",
    subject: "",
    messageId: "",
    attachedFile: "",
    virusName: "",
  };
  let virusData = {};

  /* 各メールから日時、送信元、件名、内容を取り出す */
  for (const [keys,values] of Object.entries(myMsgs)) {
    for (const [key, value] of Object.entries(myMsgs[keys])) {
      //const msid = myMsgs[keys][key].getId(); // メッセージIDを取得

      // 文字列
      let body = myMsgs[keys][key].getPlainBody();

      // 配列化
      let bodyData = body.split("\r\n").filter(Boolean);

      // 日時取得
      const mailDate = myMsgs[keys][key].getDate();

      // 成形
      processedData = common.getProcessedData(bodyData, mailDate);
      let subject = common.replace(processedData["subject"], "subject");
      let messageId = common.replace(processedData["messageId"], "messageId");
      let attachedFile = common.replace(processedData["attachedFile"], "attachedFile");
      let virusName = common.replace(processedData["virusName"], "virusName");

      if (!virusName) { continue; }

      // スプレッドシート用データ(配列)
      valMsgs.push([
        processedData["date"],
        subject,
        messageId,
        attachedFile,
        virusName,
        //msid,
      ]);

      // 表示用データ(オブジェクト)
      viewData.push({
        date: processedData["date"],
        subject: subject,
        messageId: messageId,
        attachedFile: attachedFile,
        virusName: virusName,
      });

      if (!common.checkKeyExists(virusData, virusName)) {
        virusData[virusName] = {subject: [], attachedFile: [], count: 1, data: [], days: []};
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

      let day = processedData["date"].split(/-|\t/g);
      if (!common.checkValueExists(virusData[virusName]["days"], day[2])) {
        virusData[virusName]["days"].push(day[2]);
      }

      virusData[virusName]["days"] = virusData[virusName]["days"].sort();

    }
  }

  /* スプレッドシートに出力 */
  if (valMsgs.length > 0) {

    valMsgs = common.sort(valMsgs);

    //新規メールがある場合、末尾に追加する
    let lastRow = mySheet.getDataRange().getLastRow();
    mySheet.getRange(lastRow + 1, 1, valMsgs.length, 5).setValues(valMsgs);
  }

  return {view: viewData, text: virusData};
}


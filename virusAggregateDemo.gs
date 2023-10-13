/**
 * ウイルスメール集計関連
 */

/**
 * 集計処理
 * @param {Array} startDate : [year, month, day]
 * @param {Array} endDate   : [year, month, day]
 */
function searchContactMailDemo(startDate = Array(), endDate = Array()) {

  // test code
  //startDate = ["2023","01","01"];
  //endDate = ["2023","01","31"];

  startDate = new Date(startDate[0], startDate[1]-1, startDate[2]);
  endDate = new Date(endDate[0], endDate[1]-1, endDate[2]);

  const common = new Common();

  let mySheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(common.DEMO_SHEET);

  const sheetValues = mySheet.getRange('A:A').getValues();
  const sheetLastRow = sheetValues.filter(String).length;
  const data = mySheet.getRange(1,1, sheetLastRow,5).getValues();
  delete data[0];

  let rangeDate = [];
  let days = ''
  for (let start = startDate; start <= endDate; start.setDate(start.getDate() + 1)) {
    // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
    days = new Date(start).toLocaleDateString('sv-SE').toString()
    rangeDate.push(days)
  }

  let viewData = []
  let virusData = {};
  let processedData = {}
  let myDate = '';

  for (const [keys,values] of Object.entries(data)) {
    myDate = values[0].split(/\t/)

    if (rangeDate.includes(myDate[0])) {

      processedData = {
        date: values[0],
        subject: values[1],
        messageId: values[2],
        attachedFile: values[3],
        virusName: values[4],
      }

      let subject = values[1];
      //let messageId = values[2];
      let attachedFile = values[3];
      let virusName = values[4];

      viewData.push({
        date: values[0],
        subject: values[1],
        messageId: values[2],
        attachedFile: values[3],
        virusName: values[4],
      });

      if (!common.checkKeyExists(virusData, virusName)) {
        virusData[virusName] = {subject: [], attachedFile: [], count: 1, data: [], days: []};
      } else {
        virusData[virusName]["count"]++;
      }

      virusData[virusName]["data"].push([
        values[0],
        values[1],
        values[2],
        values[3],
        values[4]
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

  return {view: viewData, text: virusData};

}

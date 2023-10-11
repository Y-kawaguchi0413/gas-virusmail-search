/**
 * アクセスデータ書き込み
 * 
 * 画面アクセス時のIPなどを取得後、スプレットシートに書き込み
 * @ param [Object] access_data['ip']     : アクセス時のIPアドレス
 * @ param [Object] access_data['region'] : アクセス時の地域
 */
function accessLog(access_data = {'ip': '', 'region': ''}) {

  const common = new Common();

  let sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(common.LOG_SHEET_NAME);

  let nowuser = Session.getActiveUser().getUsername();
  let col_values = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  let no = col_values.filter(String).length;

  push_data = [no, new Date(), nowuser, access_data['ip'], access_data['region']]
  sheet.appendRow(push_data)

}

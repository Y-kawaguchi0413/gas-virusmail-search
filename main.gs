function doGet() {
  var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  htmlOutput
    .setTitle("ウイルスメール検索・集計")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
  return htmlOutput;
}

function constructor() {
  return true;
}

function searchVirus(startDay, endDay) {
  return searchContactMail(startDay, endDay);
}

function accessLog(access_data = {'ip': '', 'region': ''}) {
  return accessLog(access_data);
}
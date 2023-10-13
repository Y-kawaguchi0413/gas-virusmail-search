function doGet() {

  const config = new Config();
  const title = config.DEMO ? config.DEMO_TITLE : config.WEB_TITLE;
 
  let htmlTemplate = HtmlService.createTemplateFromFile('index');

  htmlTemplate =  Object.assign(
    htmlTemplate, {
      'title': title,
      'notes': config.DEMO ? ` (${config.DEMO_NOTES})` : '',
      'msg': config.DEMO ? ` (データ期間 : ${config.DEMO_DATE_MIN} ～ ${config.DEMO_DATE_MAX})` : '',
      'min': config.DEMO ? config.DEMO_DATE_MIN : '',
      'max': config.DEMO ? config.DEMO_DATE_MAX : ''
    }
  );

  htmlTemplate = htmlTemplate.evaluate();
  htmlTemplate
    .setTitle(title)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
  return htmlTemplate;

}

function constructor() {
  return true;
}

function search(startDay, endDay) {
  let result = [];
  const config = new Config();
  if (config.DEMO) {
    result = searchVirusDemo(startDay, endDay);
  } else {
    reslut = searchVirus(startDay, endDay);
  }

  return result;
}

function searchVirus(startDay, endDay) {
  return searchContactMail(startDay, endDay);
}

function accessLog(access_data = {'ip': '', 'region': ''}) {
  return accessLog(access_data);
}

function searchVirusDemo(startDay, endDay) {
  return searchContactMailDemo(startDay, endDay);
}
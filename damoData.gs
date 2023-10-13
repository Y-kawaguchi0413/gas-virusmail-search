function createDemoData() {

  const common = new Common();
  let startDate = (common.DEMO_DATE_MIN).split(/-/g);
  let endDate = (common.DEMO_DATE_MAX).split(/-/g);
  let rowMax = 1000;
  let virusNames = getVirusNames();
  let virusCount = virusNames.length;

  startDate = new Date(startDate[0], startDate[1]-1, startDate[2]);
  endDate = new Date(endDate[0], endDate[1]-1, endDate[2]);

  let push_data = [];

  let virusNamesIndex = 0;
  let virusName = '';
  let randomDate = '';
  let subject = '';
  let messageId = '';
  let messageIdMin = 1;
  let messageIdMax = 1000000;
  let attachedFile = '添付ファイル';
  for (let i =0; i < rowMax; i++) {

    // date
    randomDate = `${getRandomYmd(startDate, endDate)}\t${getRandomHours()}:${getRandomMinute()}`;

    // subject
    subject = 'テスト件名_' + getRandomNumber(messageIdMin, messageIdMax)

    // messageId
    messageId = `${(Math.floor( Math.random() * (messageIdMax + 1 - messageIdMin) ) + messageIdMin)}${Math.random().toString(32).substring(2)}`;

    // virus
    virusNamesIndex = Math.floor(Math.random() * virusCount);
    //console.log(virusNames);
    virusName = virusNames[virusNamesIndex];

    // attachedFile
    attachedFile = '添付ファイル_' + getRandomNumber(messageIdMin, messageIdMax);

    push_data.push([randomDate, subject, messageId, attachedFile, virusName]);

  }

  push_data = common.sort(push_data)

  let sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(common.DEMO_SHEET).clear();

  let title = common.getTitle();
  sheet.getRange(1, 1, 1, title[0].length).setValues(title);

  let lastRow = sheet.getDataRange().getLastRow();
  sheet.getRange(lastRow + 1, 1, push_data.length, 5).setValues(push_data);

  //console.log(push_data)

}

function getRandomYmd(fromYmd, toYmd){
 
  var d1 = new Date(fromYmd);
  var d2 = new Date(toYmd);
 
  var c = (d2 - d1) / 86400000;
  var x = Math.floor(Math.random() * (c+1));
 
  d1.setDate(d1.getDate() + x);
 
  //フォーマット整形
  var y = d1.getFullYear();
  var m = ("00" + (d1.getMonth()+1)).slice(-2);
  var d = ("00" + d1.getDate()).slice(-2);
 
  return y + "-" + m + "-" + d;
 
}

function getRandomHours() {
  return getRandomNumber(0, 23).toString().padStart(2, '0');
}

function getRandomMinute() {
  return getRandomNumber(0, 59).toString().padStart(2, '0');
}

function getRandomNumber(min, max) {
  return (Math.floor( Math.random() * (max + 1 - min) ) + min)
}

/**
 * 参照元 ESET
 */
function getVirusNames() {
  return result = [
    'PHP/WebShell.NEA',
    'PHP/Agent.NGD',
    'VBS/Agent.NUG',
    'Win32/Crossza.A',
    'Win32/Exploit.CVE-2018-0802.A',
    'Win32/TrojanDownloader.Small.PET',
    'Win64/GoBot2',
    'Win32/Agent.RZR',
    'Win32/Exploit.Agent.OIL',
    'Win32/Small.NSN',
    'Win32/Spy.Agent.OXJ',
    'Win32/Filecoder.LockedFile.I',
    'Win32/Rootkit.Agent.OCL',
    'Win32/Agent.ZXC',
    'Win32/Braces.A',
    'MSIL/GenKryptik',
    'MSIL/Kryptik',
    'Win32/Agent.ZPG',
    'Win64/Agent.ZPG',
    'Win64/Filecoder',
    'MSIL/Agent.RY',
    'Win32/Filecoder.Ouroboros.A',
    'Win32/Spy.Buhtrap.L',
    'Win32/TrojanDownloader.Agent.EAT',
    'Win32/Formbook',
    'Win32/Formbook.AA',
    'Win32/Emotet.BK',
    'VBS/TrojanDownloader.Agent.OBQ',
    'Win32/Agent.TDK',
    'Win32/Agent.YEV',
    'Win32/Agent.ZNG',
    'Win32/Corebot.F',
    'Win32/Filecoder.Rapid.A',
    'Win32/Filecoder.SynAck.A',
    'Win32/SdbMine.B',
    'Win32/TrojanDownloader.Agent.DWX',
    'Win64/NukeSped.AQ',
    'JS/CoinMiner',
    'Win64/CoinMiner',
    'Win32/Filecoder.Crysis.P',
    'Win32/Korplug.HM',
    'Win32/Liech.G',
    'Win32/Qadars.AZ',
    'Win32/Shyape.T',
    'Win32/TrojanDownloader.Chindo.D',
    'Python/Filecoder.BA',
    'Win32/Filecoder.BTCWare.A',
    'Win32/Filecoder.Crypt888.B',
    'Win32/Filecoder.GandCrab.A',
    'Win32/Filecoder.Sigma.A',
    'Win32/ZinoCrypt.A',
    'Win64/Vools.B',
    'Win32/KillAV.NTD',
    'Win32/TrojanDownloader.Tovkater.HB',
    'MSIL/Filecoder.Fantom.A',
    'Win32/Filecoder.Fantom.A',
    'Win64/Heriplor.A',
    'Win32/HackedApp.CCleaner.A',
    'Win32/Mogoa.A',
    'Win32/KillAV.NTB',
    'Win32/Filecoder.ArmaLocky.A',
    'Win32/Filecoder.Hermes.D',
    'Win32/Filecoder.FS',
    'MSIL/Spy.Netpune.A',
    'MSIL/Spy.RinLog.A',
    'Win32/Emotet.AW',
    'Win32/Filecoder.RSAUtil.A',
    'Win32/FinSpy.AA',
    'Win32/FinSpy.AB',
    'Win32/TrojanProxy.Hioles.AD',
    'Win32/Filecoder.FV',
    'MSIL/Bladabindi.AH',
    'Win32/Agent.RXL',
    'Win32/Agent.YWQ',
    'Win32/Filecoder.CryptoDefense.A',
    'Win32/Filecoder.Erebus.A',
    'JS/Adware.BNXAds',
    'Win32/Agent.YIJ',
    'Win32/CoinMiner.YB',
    'Win32/Filecoder.ThunderCrypt.A',
    'Win32/Spy.Banker.ADYV',
    'Python/Agent.F',
    'Win32/Autoit.LO',
    'Win32/Autoit.NB',
    'Win32/Diskcoder.C',
    'JS/Adware.AztecMedia',
    'JS/Adware.Imali',
    'JS/Adware.Serhoxs',
    'Win32/Spy.Ursnif.AM',
    'Win32/Filecoder.WannaCryptor.B',
    'OSX/Filecoder.KeRanger.A',
    'Win32/Filecoder.AESNI.A',
    'Win32/Filecoder.WannaCryptor.D',
    'MSIL/Spy.Agent.PK',
    'Win32/Dridex.Y',
    'Win32/Rootkit.BlackEnergy.BH',
    'JS/Chromex.Submelius',
    'Java/Qrat',
    'Win32/Spy.Banker.ACHM',
    'Win32/Filecoder.Cerber.H',
    'Win32/Filecoder.Spora.A',
    'Win32/Floxif.A',
    'Win32/Floxif.H',
    'Win32/Spy.Banker.ACWG',
    'PowerShell/Spy.Keylogger.A',
    'Win32/Spy.Banker.ACYH',
    'HTML/FakeAlert',
    'JS/ProxyChanger',
    'JS/TrojanDownloader.FakejQuery',
    'Win32/Diskcoder.Petya.D',
    'VBA/TrojanDownloader.Agent.CGB',
    'Win32/Spy.Zbot.ACM',
    'Win32/TrojanDownloader.Wauchos.CB',
    'VBA/TrojanDownloader.Agent.CFX',
    'Win32/TrojanDownloader.Waski.Y',
    'OSX/Eleanor.A',
    'Win32/Alman.NAB',
    'Win32/Sopinar.G',
    'Win32/Spy.Bebloh.O',
    'Win32/Crytes.AA',
    'Win32/Delf.SXD',
    'Win32/Delf.SWQ',
    'Win32/DataStealer.L',
    'Win32/Ilomo.F',
    'VBA/TrojanDownloader.Agent.BVO',
    'Win32/Crytes.AA',
    'Win32/Spy.KeyLogger.PGO',
    'Win32/Phorpiex.C',
    'Win32/Filecoder.Locky.C',
    'Win32/Filecoder.Locky.H',
    'Win32/Boaxxe.EJ',
    'Win32/HoudRat.A',
    'Win32/Ramnit.BV',
    'JS/Filecoder.RAA.A',
    'MSIL/Spy.Agent.AES',
    'PHP/Filecoder.D',
    'Python/Agent.B',
    'Win32/Spy.Agent.OWY',
    'JS/Danger.ScriptAttachment',
    'Win32/Spy.Bebloh.A',
    'Win32/Spy.Bebloh.J',
    'Win32/Filecoder.CryptProjectXXX.E',
    'JS/TrojanDownloader.HackLoad',
    'JS/TrojanDownloader.FakejQuery.A',
    'Win32/Filecoder.NGQ',
    'JS/Agent.NSD',
    'JS/TrojanDownloader.Agent.OQR',
    'MSIL/Agent.OJF',
    'Win32/Autoit.NXW',
    'Win32/Egguard.J',
    'Win32/Spy.Agent.OXB',
    'Win32/Spy.Banker.ACJB',
    'Win32/Filecoder.Crysis.B',
    'Win32/Bandok.NAS',
    'Win32/Bayrob',
    'JS/Adware.Agent.L',
    'MSIL/Autorun.Spy.Agent.AU',
    'Win32/Agent.XWT',
    'Win32/TrojanDownloder.Zurgop.CB',
    'Win32/Fynloski.AN',
    'Win32/Filecoder.Cerber.A',
    'Win32/TrojanDownloader.Dagozill.A',
    'Win32/Trustezeb.K',
    'MSIL/Filecoder.Samas.A',
    'Python/CoinBot.A',
    'Win32/Filecoder.HydraCrypt.A',
    'Win32/Rootkit.Agent.OBC',
    'Win32/Filecoder.Enigma.A',
    'VBA/TrojanDropper.Agent.FY',
    'Win32/Bayrob.BA',
    'Win32/Bayrob.BM',
    'Win32/Filecoder.Locky.A',
    'JS/TrojanDownloader.Agent.OFN',
    'Win32/Filecoder.NFY',
    'Java/Adwind.UA',
    'Win32/CoinMiner.YS',
    'Win32/Spy.KeyLogger.PDD',
    'Win32/Bundpil.DF',
    'Win32/Dridex.AA',
    'Win32/Filecoder.CryptoWall.A',
    'Win32/Filecoder.CryptoWall.F',
    'Win32/TrojanDownloader.Phabeload.E',
    'Win32/Agent.NTZ',
    'Win32/Diskcoder.Petya',
    'Win32/Seeav.I',
    'Win32/Bayrob.BK',
    'JS/Redirector',
    'JS/Redirector.NCK',
    'VBA/TrojanDownloader.Agent.ASL',
    'Win32/Filecoder.FH',
    'MSIL/Lardosy.A',
    'Win32/Bayrob.AQ',
    'Win32/Filecoder.FH',
    'Win32/Ramnit.BX',
    'Win32/Filecoder.TeslaCrypt.A',
    'HTML/Iframe.B.Gen',
    'Win32/Ramnit.O',
    'Win32/Spy.Zbot.AAO',
    'Win32/Spy.Zbot.YW',
    'Win32/Delf.NVC',
    'Win32/Sirefef.A',
    'VBA/TrojanDownloader.Agent',
    'Win32/Filecoder.FD',
    'Win32/Filecoder.NDS',
    'VBA/TrojanDownloader.Agent.AAZ',
    'VBA/TrojanDownloader.Agent.ADX',
    'VBA/TrojanDownloader.Agent.AED',
    'MSIL/Smeazymo.A',
    'MSIL/Smeazymo.B',
    'VBA/TrojanDownloader.Agent.AAL',
    'VBA/TrojanDownloader.Agent.AAV',
    'VBA/TrojanDownloader.Agent.AFW',
    'Win32/Kovter.C',
    'Win32/Filecoder.NEA',
    'VBA/TrojanDropper.Agent.CT',
    'VBA/TrojanDownloader.Agent.ZX',
    'VBA/TrojanDownloader.Agent.AAK',
    'Win32/Dridex.S',
    'Win32/Dridex.P',
    'Win32/Dridex.M',
    'Python/Mamba.E',
    'MSIL/Spy.Agent.AHL'
  ];
}
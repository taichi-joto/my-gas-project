function helloWorld() {
    Browser.msgBox("これから自動化を頑張りましょう！");
  }
  
  function writeText() {
    // 1. 今開いているスプレッドシートを取得します
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  
    // 2. その中の「一番左のシート」を選択します
    var sheet = ss.getSheets()[0];
  
    // 3. 「A1」のセルに文字を書き込みます
    sheet.getRange("A1").setValue("本日の支援記録：順調です！");
  }
  
  function readAndGreet() {
    // 1. シートを準備する
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    // 2. セル「A1」の内容を読み取って、変数（データ置き場）に入れます
    var studentName = sheet.getRange("A1").getValue();
  
    // 3. 読み取った名前にメッセージをくっつけて表示します
    Browser.msgBox(studentName + "、今日も元気に登所しました！");
  }
  
  function createSupportRecord() {
    // 1. 新しいGoogleドキュメントを作成します
    // 名前は「今日の支援記録（GAS）」にします
    var newDoc = DocumentApp.create("今日の支援記録（GAS）");
  
    // 2. 作成したドキュメントを開いて、中に文章を書き込みます
    var body = newDoc.getBody();
    body.appendParagraph("【支援記録】");
    body.appendParagraph("本日の活動：公園でのレクリエーション");
    body.appendParagraph("作成日：" + new Date().toLocaleDateString());
  
    // 3. 作成されたドキュメントのURL（住所）を画面に表示します
    var url = newDoc.getUrl();
    Browser.msgBox("ドキュメントを作成しました！URLはこちら：" + url);
  }
  
  function createRecordFromSheet() {
    // 1. スプレッドシートから情報を読み取る
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    var name = sheet.getRange("A1").getValue(); // 児童名
    var freeTime = sheet.getRange("B1").getValue(); // 自由時間の記録
    var activity = sheet.getRange("C1").getValue(); // 活動の記録
  
    // 2. 新しいドキュメントを作成し、読み取った情報を書き込む
    var doc = DocumentApp.create(name + "の支援記録");
    var body = doc.getBody();
  
    body.appendParagraph("【支援記録】");
    body.appendParagraph("●自由時間").setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(freeTime);
  
    body.appendParagraph("●活動内容").setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(activity);
  
    // 3. 完了メッセージとURLを表示
    Browser.msgBox("作成完了！URL：" + doc.getUrl());
  }
  
  function appendRecord() {
    // 1. 追記したいドキュメントのIDを指定して開く
    // ★以下の「あなたのドキュメントID」を、先ほどコピーしたものに書き換えてください
    var docId = "1mDGXSTK1ppB7aJEb6qWdVfaL9lwYl43ntzPmMlUKKeI"; 
    var doc = DocumentApp.openById(docId);
    var body = doc.getBody();
  
    // 2. 今日の日付と記録内容を準備する
    var today = new Date().toLocaleDateString();
    var message = "【" + today + "】 本日も全員元気に活動を終了しました。";
  
    // 3. ドキュメントの最後に追記する
    body.appendParagraph(message);
  
    // 4. 完了通知
    Browser.msgBox("ドキュメントに追記しました！");
  }
  
  function changeCellColor() {
    // 1. シートを準備する
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    // 2. セル「A1」を指定します
    var range = sheet.getRange("A1");
  
    // 3. 背景色を「赤」に、文字の色を「白」に変えます
    range.setBackground("red");
    range.setFontColor("white");
  
    // 4. ついでに太字にします
    range.setFontWeight("bold");
  
    Browser.msgBox("A1セルの色を変えました！確認してください。");
  }
  
  function checkEmptyCell() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var range = sheet.getRange("A1");
  
    // 1. A1セルの値を取得します
    var value = range.getValue();
  
    // 2. 「もし値が空っぽ（""）だったら」という条件を作ります
    if (value == "") {
      // 条件に当てはまる（空っぽの）時の処理
      range.setBackground("red");
      Browser.msgBox("入力されていません！");
    } else {
      // 条件に当てはまらない（文字が入っている）時の処理
      range.setBackground("white"); // 白に戻す
      Browser.msgBox("入力済みです：" + value);
    }
  }
  
  function resetSheet() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    // 1. 消去したい範囲（A1からC1まで）を指定します
    var range = sheet.getRange("A1:C1");
  
    // 2. 指定した範囲の内容を消去します
    range.clearContent();
  
    // 3. ついでにセルの色も白（リセット）に戻します
    range.setBackground("white");
  
    Browser.msgBox("シートをリセットしました。新しい記録を入力してください！");
  }
  
  function staffGreeting() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    // 1. A1セル（ドロップダウン）で選ばれている名前を読み取ります
    var staffName = sheet.getRange("A1").getValue();
  
    // 2. もし何も選ばれていなかったら警告を出す
    if (staffName == "") {
      Browser.msgBox("スタッフを選択してください！");
      return; // ここで処理を終了します
    }
  
    // 3. 選ばれた名前に合わせてメッセージを表示
    Browser.msgBox(staffName + "さん、今日も支援記録の作成をお願いします！");
  }
  
  function setTodayDate() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
  
    // 1. 今日の日付を取得します
    var today = new Date();
  
    // 2. セル「B1」に日付を入力します
    sheet.getRange("B1").setValue(today);
  
    // 3. 表示形式を「○月○日」という分かりやすい形に整えます
    sheet.getRange("B1").setNumberFormat("M月d日");
  
    Browser.msgBox("日付を更新しました！");
  }
  
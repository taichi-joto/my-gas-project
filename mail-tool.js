function sendAttendanceMail() {
    console.log("保護者様へ出席確認メールを送信します...");

    const today = new Date();
    const formattedDate = Utilities.formatDate(today, "Asia/Tokyo", "yyyy年MM月dd日");
    console.log("今日の日付: " + formattedDate);

    // 送信先や本文のひな形をここに書いていく予定
  }
  
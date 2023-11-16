function write_tsv_to_drive(tsv_string = 'Test'){
  Logger.log(tsv_string)
  folder_name = "gamail_orgnaizer"
  var file = DriveApp.createFile('export.tsv', tsv_string, MimeType.PLAIN_TEXT);
  Logger.log('File ID: ' + file.getId());
  Logger.log(file.getDownloadUrl())
}

/**
 * Gets the own user's profile.
 * @see https://developers.google.com/people/api/rest/v1/people/getBatchGet
 */
function getSelf() {
  var email = Session.getActiveUser().getEmail()
  myself = People.People.get('people/me',{
     personFields: 'names'
  })
  fullName = myself.names[0].displayName
  return [fullName,email]
}


function export_mails_to_tsv(latest_count = 100) {
  /**
   * A Apps Script export latest inbox mails to tsv in Google Drive
   * Accept latest_count as argument to limit the total output mails.
   * Columns including the following:
   * - account_name
   * - account_mail_address
   * - receiver
   * - sender
   * - subject
   * - content
   * - account_role: can be blank
   * - mail_labels: can be blank
   */
  var [account_name,account_mail_address] = getSelf()
  var threads = GmailApp.getInboxThreads(0, latest_count);
  var result = [];
  // Add Headers
  var headers = ['account_name', 'account_mail_address', 'receiver', 'sender', 'subject', 'content', 'account_role', 'mail_labels'];
  result.push(headers.join('\t'));
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var receiver = message.getTo();
      var sender = message.getFrom();
      var subject = message.getSubject();
      var content = message.getPlainBody();
      // Escape special characters within content using utilities
      content = Utilities.base64Encode(content);
      var account_role = 'NA';
      var mail_labels = 'NA';
      var row = [account_name, account_mail_address, receiver, sender, subject, content, account_role, mail_labels];
      result.push(row.join('\t'));
    }
  }
  var output = result.join('\n');
  write_tsv_to_drive(output)
}
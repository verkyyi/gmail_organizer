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
  var name = Session.getActiveUser().getUsername()
  Logger.log(email)
  return email
  try {
    // Get own user's profile using People.getBatchGet() method
    const people = People.People.getBatchGet({
      resourceNames: ['people/me'],
      personFields: 'names,emailAddresses'
      // Use other query parameter here if needed
    });
    console.log('Myself: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) -Handle exception
    console.log('Failed to get own profile with an error %s', err.message);
  }
}


function export_mails_to_tsv(latest_count = 1) {
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
  var account_name = GmailApp.getAliases()[0];
  var account_mail_address = GmailApp.getAliases()[0];
  const people = People.People.getBatchGet({
      resourceNames: ['people/me'],
      personFields: 'names,emailAddresses'
      // Use other query parameter here if needed
    });
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
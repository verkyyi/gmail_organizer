function do_export() {
  /**
   * A Apps Script export latest inbox mails to tsv in Google Drive
   * Accept latest_count as argument to limit the total output mails.
   * 
   * predefinedLabels: the labels you want to export, can be a list of labels, for example ['HR','']
   * Leave it empty to export all threads without label filtering
   * role: the role of the account, can be either 'Student' or 'Professor'
   * threads_limit_num: the number of threads you want to export, default to 100
   * 
   */
  predefinedLabels = [] // Default to empty list, which means export all threads without label filtering
  role = 'Student'
  threads_limit_num = 100
  export_mails_to_tsv(threads_limit_num, predefinedLabels, role)
}

function write_tsv_to_drive(tsv_string = 'Test'){
  Logger.log(tsv_string)
  folder_name = "gamail_orgnaizer"
  var file = DriveApp.createFile('export.tsv', tsv_string, MimeType.PLAIN_TEXT);
  fileId = file.getId();
  Logger.log('File ID: ' + fileId);
  Logger.log(file.getDownloadUrl())
  return fileId
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

function threads_to_msg_list(threads, role = 'Student', account_name, account_mail_address) {
  /**
   * Convert threads to a list of messages
   */
  var messagesList = []
  for (var i = 0; i < threads.length; i++) {
    var labels = threads[i].getLabels();
    // convert labels to string
    var labels_strings = [];
    for (var j = 0; j < labels.length; j++) {
      labels_strings.push(labels[j].getName());
    }
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var receiver = message.getTo();
      var sender = message.getFrom();
      var subject = message.getSubject();
      var content = message.getPlainBody();
      // Escape special characters within content using utilities
      content = Utilities.base64Encode(content);
      var account_role = role;
      var mail_labels = labels_strings;
      var row = [account_name, account_mail_address, receiver, sender, subject, content, account_role, mail_labels];
      messagesList.push(row);
    }
  }
  return messagesList;
}

function export_threads_to_tsv(threads){
  var result = [];
  // Add Headers
  var headers = ['account_name', 'account_mail_address', 'receiver', 'sender', 'subject', 'content', 'account_role', 'mail_labels'];
  result.push(headers.join('\t'));
  var [account_name, account_mail_address] = getSelf() // Get account name and mail address
  var role = getRole() // Get account role from UserProperties
  messages = threads_to_msg_list(threads, role, account_name, account_mail_address)
  // Convert each row to line separated by '\t' and add to result
  messages.forEach(function (row) {
    result.push(row.join('\t'));
  });
  var output = result.join('\n');
  fileId = write_tsv_to_drive(output);
  return fileId;
}

function export_mails_to_tsv(limit = 100, label_filter = predefinedLabels) {
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
  // compose searching string by joining label_filter with 'label:' then join thoes strings by '|'
  var searching = label_filter.map(function (label) {
    return 'label:' + label
  }).join('|');
  var threads = GmailApp.search(searching, 0, limit);
  fileId = export_threads_to_tsv(threads);
  return fileId;
}
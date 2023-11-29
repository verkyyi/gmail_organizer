function extractEmail(text) {
  // Regular expression to match standard email addresses
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  // Use the regular expression to find the first match in the provided text
  let emailMatch = text.match(emailRegex);
  return emailMatch ? emailMatch[0] : null;
}

function extractFullName(text) {
  // Regular expression to match any characters before the email address
  const nameRegex = /(.*)\s<[\w.-]+@[\w.-]+\.\w+>/;
  // Use the regular expression to find the name in the provided text
  let nameMatch = text.match(nameRegex);
  return nameMatch ? nameMatch[1].trim() : null;
}

function labelAndLog(thread, labelStr) {
  /**
   * Label thread and log to console.
   */
  Logger.log(`${labelStr} mail found.`)
  var labelObj = GmailApp.getUserLabelByName(labelStr)?GmailApp.getUserLabelByName(labelStr):GmailApp.createLabel(labelStr)
  thread.addLabel(labelObj) 
}

function get_auto_labels() {
  /**
   * Get all auto labels from Gmail
   * return: list of auto labels without 'AUTO_' prefix
   */
  var labels = GmailApp.getUserLabels();
  var auto_labels = labels.filter(function (label) {
    return label.getName().indexOf('AUTO_') == 0;
  });
  var label_strings = auto_labels.map(function (label) {
    return label.getName().replace('AUTO_', '').toLowerCase();
  });
  return label_strings;
}

function getLabelObject(label_string) {
  /**
   * Get label object.
   * label_string: label string
   * return: label object
   */
  var labelStr = 'AUTO_' + label_string.toUpperCase();
  var label = GmailApp.getUserLabelByName(labelStr);
  return label;
}

function createLabelObj(label_string) {
  /**
   * Create label object.
   * label_string: label string
   * return: label object
   */
  var label = GmailApp.createLabel('AUTO_' + label_string.toUpperCase());
  return label;
}

function getOrCreateUserLabel(label_string) {
  /**
   * Get or create label object.
   * label_string: label string
   * return: label object
   */
  var label = getLabelObject(label_string);
  // When label does not exist, create label.
  if (label == null) {
    label = createLabelObj(label_string);
    Logger.log('Label created: ' + label_string);
  }
  return label;
}

function getContentsFromThreads(threads) {
  /**
   * Get contents from threads.
   * threads: Gmail threads
   * return: list of contents
   */
  var contents = threads.map(function (thread) {
    return thread.getMessages()[0].getPlainBody();
  });
  return contents;
}

function clean_labels() {
  /**
   * Clean all auto labels.
   */
  var labels = GmailApp.getUserLabels();
  var auto_labels = labels.filter(function (label) {
    return label.getName().indexOf('AUTO_') == 0;
  });
  for (var i = 0; i < auto_labels.length; i++) {
    var label = auto_labels[i];
    label.deleteLabel();
  }
}

function create_labels(role, mail_history_file_id) {
  /**
   * Create auto labels based on role and threads history.
   */
  fileId = mail_history_file_id;
  // Prepare data for cloud function.
  var data = {
    'role': role,
    'fileId': fileId,
  };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload': JSON.stringify(data)
  };
  var endPoint = 'https://us-east4-cryptic-skyline-399006.cloudfunctions.net/label_creation'
  // Create labels on account based on labels_strings.
  var labels = UrlFetchApp.fetch(endPoint, options).getContentText().split(',');
  for (var i = 0; i < labels.length; i++) {
    var labelStr = labels[i];
    getOrCreateUserLabel(labelStr);
  }
  return labels;
}

function add_labels(thread, mail_labels) {
  /**
   * Add labels to threads.
   * thread: Gmail thread
   * mail_labels: list of labels, e.g. ['HR', 'Canvas']
   */
  for (var i = 0; i < mail_labels.length; i++) {
    var labelStr = mail_labels[i];
    var label_object = getLabelObject(labelStr);
    thread.addLabel(label_object);
  }
}

function getRole() {
  /**
   * Get user role.
   * role: user role
   * return: user role
   */
  var userProperties = PropertiesService.getUserProperties();
  var role = userProperties.getProperty('role');
  return role;
}

function get_user_config() {
  /**
   * Get user configuration.
   * role: user role
   * lastRuntime: last runtime of the script
   * labels: auto labels
   */
  var userProperties = PropertiesService.getUserProperties();
  var role = getRole();
  var lastRuntime = userProperties.getProperty('lastRuntime');
  var labels = get_auto_labels();
  return [role, lastRuntime, labels];
}

function get_mail_history(start=0, end=100) {
  /**
   * Get mail history.
   * mail_history: mail history
   */
  var threads = GmailApp.getInboxThreads(start, end);
  return threads;
}

function classifier(role, from, subject, body, labels_pool) {
  /**
   * Classifier function.
   * role: user role, e.g. 'student'
   * from: email sender
   * subject: email subject
   * body: email body
   * labels_pool: list of labels, e.g. ['HR', 'Canvas']
   */
  match_labels = [];
  // Call cloud function using URLFetchApp.
  // Make a POST request with a JSON payload.
  var data = {
    'role': role,
    'mail': {
      'from': from,
      'to': 'me', // hardcode to 'me
      'subject': subject,
      'body': body,
    },
    'labels_pool': labels_pool,
  };
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  var res = UrlFetchApp.fetch('https://us-east4-cryptic-skyline-399006.cloudfunctions.net/label_classifier', options);
  var body = res.getContentText();
  if (body == '') {
    return [];
  }
  var labels = body.split(',');
  return labels;
}

function labelThreads(threads, labels_pool, role) {
  /**
   * Label threads based on role.
   * threads: Gmail threads
   * labels_pool: list of labels, e.g. ['HR', 'Canvas']
   * role: user role, e.g. 'student'
   */
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    var mail_labels = [];
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var from = message.getFrom();
      var subject = message.getSubject();
      var body = message.getPlainBody();
      // Call classifier function to get label.
      var labels = classifier(role, from, subject, body, labels_pool);
      // Add to mail labels if label is not null.
      mail_labels = mail_labels.concat(labels);
    }
    if (mail_labels.length == 0) {
      continue;
    }
    Logger.log('Mail labels: ' + mail_labels + ' added to thread: ' + thread.getId());
    add_labels(thread, mail_labels);
  }
}

// Use this function to classify the role of the user.
function roleClassifier(mail_history_file_id) {
  /**
   * Classifier function.
   * mail_history: mail history
   * return: user role
   * 
   * 1. Get all mail history
   * 2. Save to Google Drive and get file ID.
   * 3. Call Cloud function to get role passing file ID.
   */
  // Call Google Cloud function to get role.
  // Make a POST request with a JSON payload.
  var data = {
    'fileId': mail_history_file_id,
  };
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  var res = UrlFetchApp.fetch('https://us-east4-cryptic-skyline-399006.cloudfunctions.net/role_classifier', options);
  var body = res.getContentText();
  return body;
}

function resetLastRuntime() {
  /**
   * Reset last runtime to long time ago.
   * lastRuntime: last runtime of the script
   * return: last runtime
   */
  var userProperties = PropertiesService.getUserProperties();
  var lastRuntime = new Date('2020/01/01');
  var lastRuntimeStr = Utilities.formatDate(lastRuntime, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  userProperties.setProperty('lastRuntime', lastRuntimeStr);
  return lastRuntime;
}

function init_user_config() {
  var mail_history = get_mail_history();
  // Save mail history to Google Drive and get file ID.
  var fileId = export_threads_to_tsv(mail_history);
  var role = roleClassifier(fileId);
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('role', role);
  // Clean all auto labels. 
  clean_labels();
  // Create auto labels based on role and threads history.
  var labels = create_labels(role, fileId);
  // Set last runtime to long time ago.
  var lastRuntime = resetLastRuntime()
  Logger.log('Initializing user configuration.');
  Logger.log('Role: ' + role);
  Logger.log('Last runtime: ' + lastRuntime);
  Logger.log('Labels: ' + labels);
  return [role, lastRuntime, labels];
}

function getOrCreateUserConfig() {
  /**
   * Get user configuration.
   * role: user role
   * lastRuntime: last runtime of the script
   * labels: auto labels
   */
  var userProperties = PropertiesService.getUserProperties();
  var role = userProperties.getProperty('role');
  var lastRuntime = userProperties.getProperty('lastRuntime');
  var labels = get_auto_labels(); // get labels from Gmail
  if (!role) {
    // Logging  
    Logger.log('Role not set. Initializing user configuration.');
    var [role, lastRuntime, labels] = init_user_config();
  }
  return [role, lastRuntime, labels];
}

function tagLastRuntime() {
  /**
   * Tag last runtime to all threads.
   */
  var userProperties = PropertiesService.getUserProperties();
  var lastRuntime = new Date();
  // Convert to timestamp before storing.
  var lastRuntimeStr = Utilities.formatDate(lastRuntime, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  userProperties.setProperty('lastRuntime', lastRuntimeStr);
}

function getUnreadThreadsAfter(lastRuntime, isUnread=false, limit=100) {
  if (!lastRuntime) {
    // If lastRuntime is null, set to 0.
    lastRuntime = new Date('2023/11/01');
  }
  // Initialize lastRuntime to Date object.
  lastRuntime = new Date(lastRuntime);
  // Convert to epoch time seconds to suit Gmail search.
  lastRuntime = Math.floor(lastRuntime.getTime() / 1000);
  var searchStr = `to:me after:${lastRuntime}` + (isUnread ? " is:unread" : "");
  var threads = GmailApp.search(searchStr, 0, limit);
  return threads;
}

// Main Function
function autoLabeler() {
  /**
   * A script that will automatically label emails based on role and content of the email.
   * 1. Read role and last runtime from user properties
   * 2. If role not set, use role classifier to set role.
   * 3. If role set, get all new threads after last runtime.Then, label the threads based on role.
   */
  // Get user properties
  var [role, lastRuntime, labels] = getOrCreateUserConfig();
  Logger.log('Role: ' + role);
  Logger.log('Last runtime: ' + lastRuntime);
  Logger.log('Labels: ' + labels);
  // Then, label the threads based on role.
  var threads = getUnreadThreadsAfter(lastRuntime.toString())
  Logger.log('Unlabeld Threads: ' + threads.length);
  labelThreads(threads, labels, role)
  // Log runtime to user properties.
  Logger.log('Labeling completed.');
  tagLastRuntime()
}

function local_labeler() {
  var threads = GmailApp.getInboxThreads(0, 100);
  for (var i = 0; i < threads.length; i++) {
    firstMail = threads[i].getMessages()[0]
    sender = firstMail.getFrom()
    senderEmail = extractEmail(sender)
    fullName = extractFullName(sender)
    body = firstMail.getPlainBody()
    // Label Mail from GMS to "HR"
    if (senderEmail == "georgetown@myworkday.com") {
      labelAndLog(threads[i], 'HR')
    }
    // Label DSAN5000
    dsan5000Keyword = "Data Science and Analytics".toLowerCase()
    if (sender.toLowerCase().includes(dsan5000Keyword)) {
      labelAndLog(threads[i], 'DSAN5000')
    }
    // Label DSAN5100
    dsan5100Keyword = "Prob Modeling/Stat Computing".toLowerCase()
    if (sender.toLowerCase().includes(dsan5100Keyword)) {
      labelAndLog(threads[i], 'DSAN5100')
    }
    // Label Canvas
    canvasKeyword = "notifications@instructure.com"
    if (senderEmail == canvasKeyword) {
      labelAndLog(threads[i], 'Canvas')
    }
    // Label Zoom Meeting
    zoomKeywords = "https://georgetown.zoom.us/"
    if (body.toLowerCase().includes(zoomKeywords)) {
      labelAndLog(threads[i], 'Zoom')
    }
  }
}
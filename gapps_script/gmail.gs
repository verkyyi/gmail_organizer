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

function labelAndLog(thread,labelStr){
  Logger.log(`${labelStr} mail found.`)
  var labelObj = GmailApp.getUserLabelByName(labelStr)?GmailApp.getUserLabelByName(labelStr):GmailApp.createLabel(labelStr)
  thread.addLabel(labelObj) 
}

function autoLabeler() {
var labels = GmailApp.getUserLabels();
Logger.log("List all labels:")
for (var i = 0; i < labels.length; i++) {
  Logger.log("label: " + labels[i].getName());
}
Logger.log("Checking new threads:")
var threads = GmailApp.getInboxThreads(0, 100);
for (var i = 0; i < threads.length; i++) {
  firstMail = threads[i].getMessages()[0]
  sender = firstMail.getFrom()
  senderEmail = extractEmail(sender)
  fullName = extractFullName(sender)
  body = firstMail.getPlainBody()
  // Label Mail from GMS to "HR"
  if(senderEmail=="georgetown@myworkday.com"){
    labelAndLog(threads[i],'HR')
  }
  // Label DSAN5000
  dsan5000Keyword = "Data Science and Analytics".toLowerCase()
  if(sender.toLowerCase().includes(dsan5000Keyword)){
    labelAndLog(threads[i],'DSAN5000')       
  }
  // Label DSAN5100
  dsan5100Keyword = "Prob Modeling/Stat Computing".toLowerCase()
  if(sender.toLowerCase().includes(dsan5100Keyword)){
    labelAndLog(threads[i],'DSAN5100')       
  }
  // Label Canvas
  canvasKeyword = "notifications@instructure.com"
  if(senderEmail == canvasKeyword){
    labelAndLog(threads[i],'Canvas') 
  }
  // Label Zoom Meeting
  zoomKeywords= "https://georgetown.zoom.us/"
  if(body.toLowerCase().includes(zoomKeywords)){
    labelAndLog(threads[i],'Zoom')
  }
}
}

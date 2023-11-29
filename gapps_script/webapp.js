function doGet() {
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate();
}

function switchTrigger() {
  var trigger = ScriptApp.getProjectTriggers()[0];
  if (trigger == undefined) {
    ScriptApp.newTrigger('autoLabeler')
    .timeBased()
    .everyHours(1)
    .create();
  } else {
    ScriptApp.deleteTrigger(trigger);
  }
}

function getLabelStats() {
  var labelStats = {};
  var labels = GmailApp.getUserLabels();
  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    labelStats[label.getName()] = label.getThreads().length;
  }
  return labelStats;
}
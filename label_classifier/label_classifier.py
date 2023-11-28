import importlib

'''
This module is the entry point for the label classifier.
It takes in an account, mail, and existing_labels and returns a label.
It call all existing label classifiers by 
'''
def label_classfier_entry_point(role, mail, labels_pool:list) -> list:
  '''
  Input: account, mail, existing_labels
  Output: labels
  '''
  labels = []
  # import label classifiers by suffix the possible_labels list with the name of the label classifier
  for label in labels_pool:
    try:
      classifier = importlib.import_module(f'classifier_{label.lower()}')
      classifier_result = classifier.classify_email(role, mail)
    except:
      classifier = importlib.import_module(f'classifier_default')
      classifier_result = classifier.classify_email(label,role, mail)
    if (classifier_result): labels.append(label)
  return labels
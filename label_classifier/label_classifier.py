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
    import importlib
    classifier = importlib.import_module(f'classifier.{label.lower()}')
    if (classifier.classify(role, mail)): labels.append(label)
  return labels

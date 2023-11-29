import importlib
from pathlib import Path

'''
This is the default label classifier for dynamic labels.
It takes in an account, mail, and existing_labels and returns a label.
It will walk through all classifier modules that support dynamic label
and check whether the mail should be labeled with the label.
'''

def classify_email(label, role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    current_folder = Path(__file__).parent
    glob_path = current_folder.glob("classifier_*.py")
    for path in glob_path:
      module_name = path.stem
      if module_name == 'classifier_default': continue # skip self
      classifier = importlib.import_module(module_name)
      if 'classify_dynamic_email' in dir(classifier):
        classifier_result = classifier.classify_dynamic_email(label, role, email)
        if (classifier_result): return label # return the first label that matches
      # if the classifier does not support dynamic label, skip it
    return False # return False if no label matches
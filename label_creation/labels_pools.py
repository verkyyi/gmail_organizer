import pandas as pd
import importlib

# The predefined labels that are available for each account which are common for all accounts
PREDEFINED_LABELS_COMMON = ['inbox','sent','drafts','spam','trash','important','starred','chats']

# The predefined labels that are available for each account which are specific for Students
PREDEFINED_LABELS_STUDENTS = [""]

# The predefined labels that are available for each account which are specific for Professors
PREDEFINED_LABELS_PROFS = [""]

'''
A module that contains functions to create label pools for each mail account.
It takes in an account and returns a list of labels.
'''
def assign_label_pool_for_account(role:str, mail_history:pd.DataFrame)->list:
  '''
  @param role: the role of the user
  @param mail_history: the mail history of the user
  @return: a list of labels
  '''
  labels_pool = []
  possible_labels = PREDEFINED_LABELS_COMMON
  extra_labels = PREDEFINED_LABELS_STUDENTS if role == 'student' else PREDEFINED_LABELS_PROFS
  possible_labels += extra_labels
  for label in possible_labels:
    assigner = importlib.import_module(f'label_assigner.{label.lower()}')
    if (assigner.assign(role, mail_history)): labels_pool.append(label)
  return labels_pool
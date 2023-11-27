import pandas as pd
import importlib
from pathlib import Path

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
  # Using glob to walk through current folder and import all the assigner modules
  # assigner modules are prefixed with label_assigner_ and suffixed with .py
  # e.g. label_assigner_important.py
  current_folder = Path(__file__).parent
  glob_path = current_folder.glob("label_assigner_*.py")
  for path in glob_path:
    module_name = path.stem
    assigner = importlib.import_module(module_name)
    label = module_name.replace('label_assigner_', '')
    if (assigner.assign(role, mail_history)): labels_pool.append(label.lower())
  return labels_pool
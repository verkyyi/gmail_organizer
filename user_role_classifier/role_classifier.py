import pandas as pd
'''
A module that contains functions to classify the role of a user.
It takes in a mail history and returns a role.
'''

def classify_role(mail_history:pd.DataFrame)->str:
  '''
  @param mail_history: the mail history of the user
  @return: a role, could be 'student', 'professor'
  '''
  print(mail_history.head())
  return 'student'
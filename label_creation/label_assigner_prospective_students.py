
import pandas as pd
'''
A function which judge whether a label should be assigned to a user.
It takes in a role and mail history and returns a boolean.
'''
LABEL = 'HR'

def assign(role:str, mail_history:pd.DataFrame)->bool:
  '''
  @param role: the role of the user
  @param mail_history: the mail history of the user
  @return: a boolean
  @note: we could not find a way to distinguish the goal of students, so we may leave it to the user to decide.
  '''
  if (role == 'professor'): return True
  return False
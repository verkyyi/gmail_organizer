import pandas as pd
'''
A module that contains functions to classify the role of a user.
It takes in a mail history and returns a role.
'''
def check_if_student(mail_history:pd.DataFrame)->bool:
  '''
  @param mail_history: the mail history of the user
  @return: True if the user is a student, False otherwise
  '''
  # If there is one mail existing in the mail hisotry from canvas, the content contains
  # 'Your assignment .* has been graded.', then the user is a student.
  if mail_history[mail_history['sender'].str.contains('notifications@instructure.com')].shape[0] > 0:
    # Get all the mail content from canvas and concatenate them into a string
    canvas_mail_content = ' '.join(mail_history[mail_history['sender'].str.contains('notifications@instructure.com')]['content'])
    # If the string contains 'Your assignment .* has been graded.', then the user is a student
    if 'Your assignment' in canvas_mail_content and 'has been graded.' in canvas_mail_content:
      return True
  return False

def check_if_professor(mail_history:pd.DataFrame)->bool:
  '''
  @param mail_history: the mail history of the user
  @return: True if the user is a professor, False otherwise
  '''
  return False

def classify_role(mail_history:pd.DataFrame)->str:
  '''
  @param mail_history: the mail history of the user
  @return: a role, could be 'student', 'professor'
  '''
  # If there is one mail existing in the mail hisotry from canvas, the content contains
  # 'Your assignment .* has been graded.', then the user is a student.
  if check_if_professor(mail_history):
      return 'professor'
  if check_if_student(mail_history):
      return 'student'
  return 'student'
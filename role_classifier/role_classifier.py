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
  # If there is one mail existing in the mail hisotry from canvas, the content contains
  # 'Your assignment .* has been graded.', then the user is a student.
  cofaculty_Email = ['Purna.Gamage@georgetown.edu','heather.connor@georgetown.edu','qh86@georgetown.edu','jh2343@georgetown.edu','jj1088@georgetown.edu','ashley.stowe@georgetown.edu','np617@georgetown.edu','tva7@georgetown.edu']
  cofaculty_Name = ['Amit Arora','Abhijit Dasgupta','Benjamin Houghton','Chris Larson','Anderson Monken','Nate Strawn','Marck Vaisman','Irina Vayndiner','Nima Zahadat']

  for length in range(len(mail_history)):
    if mail_history['account_name'].iloc[length] in cofaculty_Name or mail_history['account_mail_address'].iloc[length] in cofaculty_Email:
      mail_history['account_role'].iloc[length] = 'professor'
    else:
      mail_history['account_role'].iloc[length] = 'student'
  return mail_history

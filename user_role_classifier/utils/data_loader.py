import os
import pandas as pd
import base64
from io import StringIO

def get_mail_dataframe_from_path(filename):
  data_file_relative_path = f'../data/{filename}'
  # join relative path with absolute path
  data_file_path = os.path.join(os.path.dirname(__file__), data_file_relative_path)
  content = open(data_file_path, 'r').read()
  mails = get_mail_dataframe_from_string(content)
  return mails

def get_mail_dataframe_from_string(string):
  mails = pd.read_csv(StringIO(string), sep='\t')
  # Since content column is saved using base64 encoding, we need to decode it
  mails['content'] = mails['content'].apply(lambda x: base64.b64decode(x).decode('utf-8'))
  return mails

if __name__ == '__main__':
  # Test get_mail_dataframe function
  mails = get_mail_dataframe_from_path('student_inbox_ly297.tsv')
  print(mails.head())
  print(mails['content'][0])
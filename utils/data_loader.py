import os
import pandas as pd
import base64

def get_mail_dataframe(filename):
  data_file_relative_path = f'../data/{filename}'
  # join relative path with absolute path
  data_file_path = os.path.join(os.path.dirname(__file__), data_file_relative_path)
  mails = pd.read_csv(data_file_path, sep='\t')
  # Since content column is saved using base64 encoding, we need to decode it
  mails['content'] = mails['content'].apply(lambda x: base64.b64decode(x).decode('utf-8'))
  return mails

if __name__ == '__main__':
  # Test get_mail_dataframe function
  mails = get_mail_dataframe('student_inbox_ly297.tsv')
  print(mails.head())
  print(mails['content'][0])
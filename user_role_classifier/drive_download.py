from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io,os
from googleapiclient.errors import HttpError

def download_file(real_file_id):
  """Downloads a file
  Args:
      real_file_id: ID of the file to download
  Returns : IO object with location.
  Load pre-authorized user credentials from the environment.
  TODO(developer) - See https://developers.google.com/identity
  for guides on implementing OAuth2 for the application.
  Reference: https://medium.com/@matheodaly.md/using-google-drive-api-with-python-and-a-service-account-d6ae1f6456c2
  """

  scope = ['https://www.googleapis.com/auth/drive']
  current_dir = os.path.dirname(os.path.realpath(__file__)) 
  service_account_json_key = './creds/cryptic-skyline-399006-4893d282f894.json'
  service_account_json_key = os.path.join(current_dir, service_account_json_key)
  credentials = service_account.Credentials.from_service_account_file(
                                filename=service_account_json_key, 
                                scopes=scope)
  try:
    # create drive api client
    service = build('drive', 'v3', credentials=credentials)

    file_id = real_file_id

    # pylint: disable=maybe-no-member
    request = service.files().get_media(fileId=file_id)
    file = io.BytesIO()
    downloader = MediaIoBaseDownload(file, request)
    done = False
    while done is False:
      status, done = downloader.next_chunk()
      print(f"Download {int(status.progress() * 100)}.")

  except HttpError as error:
    print(f"An error occurred: {error}")
    file = None
  content = file.getvalue().decode('utf-8')
  return content

if __name__ == "__main__":
  download_file(real_file_id="15V_R2nKlyX_3xpGanckBl2aDGZtAJYui")
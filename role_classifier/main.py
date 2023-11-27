import functions_framework
import utils.drive_download as drive_download
import utils.data_loader as data_loader
import role_classifier

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    file_id = request_json['fileId']
    content = drive_download.download_file(real_file_id=file_id)
    mail_history = data_loader.get_mail_dataframe_from_string(content)
    role = role_classifier.classify_role(mail_history)
    return role

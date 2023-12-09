import functions_framework
import label_classifier

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

    if request_json and 'role' in request_json:
        role = request_json['role']
    else:
        role = 'student'
    if request_json and 'mail' in request_json:
        mail = request_json['mail']
    else:
        # A sample mail format
        mail = {
        'from': '',
        'to': 'me',
        'subject': '',
        'body': '',
        'self_address': '',
        }
    if request_json and 'labels_pool' in request_json:
        labels_pool = request_json['labels_pool']
    else:
        labels_pool = []
    labels = label_classifier.label_classfier_entry_point(role, mail, labels_pool)
    sep = ','
    return sep.join(labels)

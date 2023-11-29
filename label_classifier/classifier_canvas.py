LABEL = 'CANVAS'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is an object.
    """
    canvasKeyword = "notifications@instructure.com"
    if canvasKeyword in email['sender'].lower(): return True
    return False
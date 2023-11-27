LABEL = 'NEWSLETTER'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    return False
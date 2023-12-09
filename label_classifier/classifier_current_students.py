LABEL = 'CURRENT_STUDENTS'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    if role == 'students':
        return False
    if role == 'professor':
        if 'dear prof' in email['content'] or 'dear dr' in email['content']:
            return True
        return False
    return False
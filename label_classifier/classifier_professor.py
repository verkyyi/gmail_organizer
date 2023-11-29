LABEL = 'PROFESSOR'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    # If role is student, and to contains self email, then label as professor 
    if role == 'student' and email['self_address'] in email['to'].lower():
        # content contains 'hi professor' or 'prof', then label as professor
        if 'hi professor' in email['body'].lower() or 'prof' in email['body'].lower():
            return True
        # content contains 'dear professor' or 'dear prof', then label as professor
        if 'dear professor' in email['body'].lower() or 'dear prof' in email['body'].lower():
            return True
    return False
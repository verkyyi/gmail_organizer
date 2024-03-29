LABEL = 'PROFESSOR'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    # If role is student, and to contains self email, then label as professor 
    if role == 'student':
        # content contains 'hi professor' or 'prof', then label as professor
        if 'hi professor' in email['content'].lower():
            return True
        # content contains 'dear professor' or 'dear prof', then label as professor
        if 'dear prof' in email['content'].lower():
            return True
    return False
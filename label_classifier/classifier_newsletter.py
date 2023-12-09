LABEL = 'NEWSLETTER'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    # If email content contains the word 'newsletter', then it is a newsletter. 
    if 'newsletter' in email['subject'].lower():
        return True
    # if content contains the word 'unsubscribe', then it is a newsletter.
    if 'unsubscribe' in email['content'].lower():
        return True
    return False
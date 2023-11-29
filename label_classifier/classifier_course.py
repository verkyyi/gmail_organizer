'''
This is a label classifier for dynamic labels.
'''

def classify_dynamic_email(label, role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    if label == 'dsan5000'.lower(): 
        dsan5000Keyword = "Data Science and Analytics".lower()
        if 'DSAN5000' in email['subject']: return True
        if 'DSAN5000' in email['from'].lower(): return True
        if dsan5000Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5100':
        dsan5100Keyword = "Prob Modeling/Stat Computing".lower()
        if 'DSAN5100' in email['subject']: return True
        if 'DSAN5100' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    return False
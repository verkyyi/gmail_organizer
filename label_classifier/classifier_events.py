LABEL = 'EVENTS'

def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is a panda row.
    """
    # if events in from or subject then label as events
    if 'events' in email['from'].lower() or 'events' in email['subject'].lower():
        return True
    # if 'party' in subject or 'party' in from then label as events
    if 'party' in email['from'].lower() or 'party' in email['subject'].lower():
        return True
    # if 'RSVP' in subject or 'RSVP' in from then label as events
    if 'rsvp' in email['from'].lower() or 'RSVP' in email['subject'].lower():
        return True
    # if 'RSVP' in content then label as events
    if 'rsvp' in email['content'].lower():
        return True
    # if 'conference' in subject or 'conference' in from then label as events
    if 'conference' in email['from'].lower() or 'conference' in email['subject'].lower():
        return True
    return False
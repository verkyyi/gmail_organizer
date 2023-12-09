LABEL = 'CO_FACULTY'
cofaculty_list = ['Purna.Gamage@georgetown.edu','heather.connor@georgetown.edu','qh86@georgetown.edu','jh2343@georgetown.edu','jj1088@georgetown.edu',
              'ashley.stowe@georgetown.edu','np617@georgetown.edu','tva7@georgetown.edu','Amit Arora','Abhijit Dasgupta','Benjamin Houghton','Chris Larson'
              ,'Anderson Monken','Nate Strawn','Marck Vaisman','Irina Vayndiner','Nima Zahadat']
def classify_email(role, email):
    """Classify an email based on its content and the role of the user.
    role: the role of the user
    email: the email to be classified, which is an object.
    """
    if role == 'professor':
        for i in range(len(cofaculty_list)):
            if cofaculty_list[i].lower() in email['sender'].lower():
                return True
    return False
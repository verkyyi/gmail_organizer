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
    if label == 'dsan5200':
        dsan5100Keyword = "Advanced Data Vis".lower()
        if 'DSAN5200' in email['subject']: return True
        if 'DSAN5200' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5300':
        dsan5100Keyword = "Statistical Learning".lower()
        if 'DSAN5300' in email['subject']: return True
        if 'DSAN5300' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6000':
        dsan5100Keyword = "Big Data and Cloud Computing".lower()
        if 'DSAN6000' in email['subject']: return True
        if 'DSAN6000' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5400':
        dsan5100Keyword = "Computational Ling".lower()
        if 'DSAN5400' in email['subject']: return True
        if 'DSAN5400' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5450':
        dsan5100Keyword = "Data Ethics and Policy".lower()
        if 'DSAN5450' in email['subject']: return True
        if 'DSAN5450' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5500':
        dsan5100Keyword = "Data Structures".lower()
        if 'DSAN5550' in email['subject']: return True
        if 'DSAN5550' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5550':
        dsan5100Keyword = "Climate Change".lower()
        if 'DSAN5550' in email['subject']: return True
        if 'DSAN5550' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5600':
        dsan5100Keyword = "Time Series".lower()
        if 'DSAN5600' in email['subject']: return True
        if 'DSAN5600' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5700':
        dsan5100Keyword = "Blockchain".lower()
        if 'DSAN5700' in email['subject']: return True
        if 'DSAN5700' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5800':
        dsan5100Keyword = "Advanced Natural Language Processing".lower()
        if 'DSAN5800' in email['subject']: return True
        if 'DSAN5800' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5810':
        dsan5100Keyword = "Large Language Models".lower()
        if 'DSAN5810' in email['subject']: return True
        if 'DSAN5810' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan5900':
        dsan5100Keyword = "Digital Storytelling".lower()
        if 'DSAN5900' in email['subject']: return True
        if 'DSAN5900' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6100':
        dsan5100Keyword = "Optimization".lower()
        if 'DSAN6100' in email['subject']: return True
        if 'DSAN6100' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6200':
        dsan5100Keyword = "High Dimension".lower()
        if 'DSAN6200' in email['subject']: return True
        if 'DSAN6200' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6300':
        dsan5100Keyword = "Database SQL".lower()
        if 'DSAN6300' in email['subject']: return True
        if 'DSAN6300' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6400':
        dsan5100Keyword = "Network Analytics".lower()
        if 'DSAN6400' in email['subject']: return True
        if 'DSAN6400' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6500':
        dsan5100Keyword = "Mining".lower()
        if 'DSAN6500' in email['subject']: return True
        if 'DSAN6500' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6550':
        dsan5100Keyword = "Adaptive Measurement".lower()
        if 'DSAN6550' in email['subject']: return True
        if 'DSAN6550' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6600':
        dsan5100Keyword = "Neural Networks".lower()
        if 'DSAN6600' in email['subject']: return True
        if 'DSAN6600' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6650':
        dsan5100Keyword = "Reinforcement Learning".lower()
        if 'DSAN6650' in email['subject']: return True
        if 'DSAN6650' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6700':
        dsan5100Keyword = "Machine Learning".lower()
        if 'DSAN6700' in email['subject']: return True
        if 'DSAN6700' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6750':
        dsan5100Keyword = "GIS".lower()
        if 'DSAN6750' in email['subject']: return True
        if 'DSAN6750' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan6800':
        dsan5100Keyword = "Principles of Cybersecurity".lower()
        if 'DSAN6800' in email['subject']: return True
        if 'DSAN6800' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    if label == 'dsan7000':
        dsan5100Keyword = "Advanced Research Methodologies".lower()
        if 'DSAN7000' in email['subject']: return True
        if 'DSAN7000' in email['from'].lower(): return True
        if dsan5100Keyword in email['subject'].lower(): return True
        return False
    return False
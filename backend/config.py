import os
#from dotenv import load_dotenv

#basedir = os.path.abspath(os.path.dirname(__file__)
#load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = 'TEST'
    SQLALCHEMY_DATABASE_URI = 'postgresql://rwan:Rafael1997@localhost/capitalview'#os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 5*60 #5min

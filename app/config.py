import os
class Config:
    BASE_DIR = os.path.dirname(__file__)
    SECRET_KEY = 'dongguk'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR,'photodiary.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'

import os

#db 초기 설정
BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR,'photodiary.db'))

SQLALCHEMY_TRACK_MODIFICATIONS = False

# 시크릿 키
SECRET_KEY = 'dongguk'
SESSION_TYPE = 'filesystem'

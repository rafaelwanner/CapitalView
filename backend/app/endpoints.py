from flask import request, render_template, jsonify
from app import app, db
from app.models import User, Asset
from sqlalchemy.exc import IntegrityError

@app.route('/')
def home():
    return "Hello world"

@app.route('/api/register', methods=['POST'])
def register():

    #   data: {
    #        username: '',
    #        name: '',
    #        password: ''
    #    }

    data = request.get_json()
    user = User(
        name = data['name'],
        username = data['username']
    )
    user.set_password(data['password'])
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Username already taken"), 409

    new_user = User.query.filter_by(username=data['username']).first()

    return jsonify(
        message = "Resgistration successful!",
        id = user.user_id
        #token=
        )

@app.route('/api/login', methods=['POST'])
def login():

    #   data: {
    #        username: '',
    #        password: ''
    #    }

    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user == None or not user.check_password(data['password']):
        return jsonify(message="Username or password incorrect"), 404
    else:
        return jsonify(
            message = "Login successful!",
            id = user.user_id
            #token
            )

@app.route('/api/choose_asset', methods=['GET'])
def choose_asset():

    #   assets: {
    #        stocks: [AAPL, AMD ...],
    #        cryptocurrency: [BTC, ETH ...],
    #        comodities: []
    #    }

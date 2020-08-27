from flask import request, render_template, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
from app import app, db, jwt
from app.models import User, Asset
from sqlalchemy.exc import IntegrityError
from assets import stocks, cryptocurrency, fiat
from utils.sort import process_overview, process_detail

blacklist = set()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

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
        return jsonify(
            message="Username already taken"
        ), 409

    new_user = User.query.filter_by(username=data['username']).first()
    access_token = create_access_token(identity=data['username'])

    return jsonify(
        message = "Registration successful!",
        id = user.user_id,
        token = access_token
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
        access_token = create_access_token(identity=data['username'])

        return jsonify(
            message = "Login successful!",
            id = user.user_id,
            token = access_token
        )

@app.route('/api/logout', methods=['POST'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify(
        message="Logout successful!"
    ), 200

@app.route('/api/assets', methods=['GET'])
@jwt_required
def assets():

    #   assets: {
    #        stocks: [AAPL, AMD ...],
    #        cryptocurrency: [BTC, ETH ...],
    #        fiat: [CHF, USD, EUR ...],
    #        comodities: [Oil, ],
    #        metals: [GOLD, Silver, Copper ...]
    #    }

    return {
        'assets': {
            'Stocks': stocks,
            'Cryptocurrency': cryptocurrency,
            'Fiat currency': fiat
            }
        }

@app.route('/api/add_asset', methods=['POST'])
@jwt_required
def add_asset():

    #   asset: {
    #        asset_class: Stock,
    #        asset: AMD,
    #        quantity: 10
    #    }

    current_user = get_jwt_identity()
    user_id = User.query.filter_by(username=current_user).first()
    data = request.get_json()

    if data['asset_class'] == 'Stocks':
        list = stocks
    elif data['asset_class'] == 'Cryptocurrency':
        list = cryptocurrency
    elif data['asset_class'] == 'Fiat currency':
        list = fiat
    else:
        return jsonify(
            message="Asset Class not found!"
        ), 404

    if data['asset'] not in list:
        return jsonify(
            message="Asset not found!"
        ), 404

    #asset will be added regardless if it is already present in database
    new_asset = Asset(asset_class=data['asset_class'], asset=data['asset'], quantity=float(data['quantity'].replace(',', '.')), allocator=user_id)
    new_asset.set_price()

    db.session.add(new_asset)
    db.session.commit()

    return jsonify(
        message="Asset added successfully!"
    ), 201


@app.route('/api/overview', methods=['GET'])
@jwt_required
def overview():

    #   holdings: {
    #        stocks: {
    #            AMD: [<qty>, <value in USD>],
    #            AAPL: [<qty>, <value in USD>]
    #                },
    #        crypto: {
    #            BTC: [<qty>, <value in USD>]
    #                }
    #        fiat: {
    #           CHF: [<qty>, <value in USD>]
    #             }
    #         },
    #   stats: {
    #        net_worth: {
    #            <value in USD>
    #        },
    #        fractions: {
    #                stocks: [<fraction>, <value in USD>],
    #                crypto: [<fraction>, <value in USD>],
    #                fiat: [<fraction>, <value in USD>]
    #               }
    #       }
    #   }

    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    data = process_overview(user)

    return jsonify(
        data=data
    ), 200

@app.route('/api/detail/<asset>', methods=['GET'])
@jwt_required
def detail(asset): #i.e. asset = AMD

    #   data: {
    #        asset_class: '',
    #        asset: '',
    #        total_quantity: '',
    #        total_value: '',
    #        holdings: {
    #               id: {
    #                   date: <data bought>,
    #                   price: <price bought at>,
    #                   current_price: <price now>,
    #                   quantity: '',
    #                   gain_percent: <gain in percent>,
    #                   gain: <gain in USD>
    #                }
    #         }
    #    }

    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    data = process_detail(user, asset)

    return data

@app.route('/api/edit', methods=['POST'])
@jwt_required
def edit():

    #data: {
    #    id: <asset id>,
    #    price: <new price bought at>,
    #    quantity: <new asset quantity>,
    #  }

    data = request.get_json()

    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    asset = Asset.query.filter_by(id=data['id']).first()

    if asset.user_id != user.user_id:
        return jsonify(
            message="Asset not found!"
        ), 404

    asset.price = data['price']
    asset.quantity = data['quantity']
    db.session.commit()

    return jsonify(
        message="Update successfull!"
    ), 200

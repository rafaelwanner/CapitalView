from app.models import Asset, User
from flask import jsonify
from data import get_price, get_rates
from utils.calculations import fraction, gain_percent
from assets import fiat, cryptocurrency, stocks

#gathers and sorts all data for overview
def process_overview(user):

    assets = user.assets.all()

    #sort asset classimport fractions
    stocks = []
    crypto = []
    fiat = []
    for asset in assets:
        if asset.asset_class == 'Stocks':
            stocks.append(asset)
        elif asset.asset_class == 'Cryptocurrency':
            crypto.append(asset)
        elif asset.asset_class == 'Fiat currency':
            fiat.append(asset)

    stocks_list = []
    stocks_value = 0
    id = 0
    while stocks:
        stock = stocks[0]
        quantity = 0
        for s in stocks:
            if s.asset == stock.asset:
                quantity += s.quantity

        value = quantity * get_price('Stocks', stock.asset)
        stocks_value += value
        dict = {'id': id, 'asset': stock.asset, 'quantity': quantity, 'value': value}
        stocks_list.append(dict)
        stocks = [x for x in stocks if x.asset != stock.asset] #new array
        id += 1

    crypto_list = []
    crypto_value = 0
    id = 0
    while crypto:
        crypt = crypto[0]
        quantity = 0
        for c in crypto:
            if c.asset == crypt.asset:
                quantity += c.quantity

        value = quantity * get_price('Cryptocurrency', crypt.asset)
        crypto_value += value
        dict = {'id': id, 'asset': crypt.asset, 'quantity': quantity, 'value': value}
        crypto_list.append(dict)
        crypto = [x for x in crypto if x.asset != crypt.asset] #new array
        id += 1

    fiat_list = []
    fiat_value = 0 #total value of fiat
    id = 0
    while fiat: #while array not empty do the following
        fia = fiat[0]   #get first element of array
        quantity = 0
        for f in fiat:  #search for same assets in array
            if f.asset == fia.asset:
                quantity += f.quantity  #add quantity of assets

        value = quantity * get_rates(fia.asset,'USD')
        fiat_value += value
        dict = {'id': id, 'asset': fia.asset, 'quantity': quantity, 'value': value}
        fiat_list.append(dict)
        fiat = [x for x in fiat if x.asset != fia.asset] #new array without investigated assets
        id += 1

    total_value = stocks_value + crypto_value + fiat_value

    holdings_data = [
                   {'class': 'Stocks', 'payload': stocks_list},
                   {'class': 'Cryptocurrency', 'payload': crypto_list},
                   {'class': 'Fiat currency', 'payload': fiat_list}
                   ]

    stats_data = [
               {'net_worth': total_value},
               {'fractions': [
                           {'class': 'Stocks', 'payload': [fraction(total_value, stocks_value), stocks_value]},
                           {'class': 'Cryptocurrency', 'payload': [fraction(total_value, crypto_value), crypto_value]},
                           {'class': 'Fiat currency', 'payload': [fraction(total_value, fiat_value), fiat_value]}
                           ]}
               ]

    data = {
                    'holdings': holdings_data,
                    'stats': stats_data
            }


    return data

    #return [ [{'type': 'holdings', 'asset_data': holdings_data}],
             #[ {'type': 'stats', 'stats_data': stats_data}] ]




#gathers and sorts all data for detail of asset
def process_detail(user, abbrev):

    assets = user.assets.all()

    if abbrev in fiat:
        asset_class = 'Fiat currency'
    elif abbrev in cryptocurrency:
        asset_class = 'Cryptocurrency'
    elif abbrev in stocks:
        asset_class = 'Stocks'
    else:
        return jsonify(
            message="No asset with name {}".format(abbrev)
        ), 404

    current_price = get_price(asset_class, abbrev)

    holdings = []
    total_quantity = 0
    total_value = 0
    for asset in assets:
        if abbrev == asset.asset:
            total_quantity += asset.quantity
            gain = gain_percent(current_price, asset.price)
            holdings.append({
                                'id': asset.id,
                                'date': asset.format_time(),
                                'price': asset.price,
                                'current_price': current_price,
                                'quantity': asset.quantity,
                                'gain_percent': gain,
                                'gain': current_price - asset.price
                                })

    data = [
            {
            'asset_class': asset_class,
            'asset': abbrev,
            'total_quantity': total_quantity,
            'total_value': current_price * total_quantity,
            'holdings': holdings
            }
        ]

    return jsonify(
        data=data
    ), 200

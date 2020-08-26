from app.models import Asset, User
from data import get_price, get_rates
from utils.calculations import fraction

def prepare_overview(user):

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

    stocks_dict = {}
    stocks_value = 0
    while stocks:
        stock = stocks[0]
        quantity = 0
        for s in stocks:
            if s.asset == stock.asset:
                quantity += s.quantity

        value = quantity * get_price('Stocks', stock.asset)
        stocks_value += value
        stocks_dict[stock.asset] = [quantity, value]
        stocks = [x for x in stocks if x.asset != stock.asset] #new array

    crypto_dict = {}
    crypto_value = 0
    while crypto:
        crypt = crypto[0]
        quantity = 0
        for c in crypto:
            if c.asset == crypt.asset:
                quantity += c.quantity

        value = quantity * get_price('Cryptocurrency', crypt.asset)
        crypto_value += value
        crypto_dict[crypt.asset] = [quantity, value]
        crypto = [x for x in crypto if x.asset != crypt.asset] #new array

    fiat_dict = {}
    fiat_value = 0 #total value of fiat
    while fiat: #while array not empty do the following
        fia = fiat[0]   #get first element of array
        quantity = 0
        for f in fiat:  #search for same assets in array
            if f.asset == fia.asset:
                quantity += f.quantity  #add quantity of assets

        value = quantity * get_rates(fia.asset,'USD')
        fiat_value += value
        fiat_dict[fia.asset] = [quantity, value]
        fiat = [x for x in fiat if x.asset != fia.asset] #new array without investigated assets

    total_value = stocks_value + crypto_value + fiat_value
    data = [
            {
                'assets':{
                    'Stocks': stocks_dict,
                    'Cryptocurrency': crypto_dict,
                    'Fiat currency': fiat_dict
                    }
            },
            {
                'stats': {
                    'net_worth': total_value,
                    'fractions': {
                        'Stocks': [fraction(total_value, stocks_value), stocks_value],
                        'Cryptocurrency': [fraction(total_value, crypto_value)],
                        'Fiat currency': [fraction(total_value, fiat_value)]
                        }
                    }
            }
         ]

    return data

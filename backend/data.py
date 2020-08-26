import requests
import json
from dotenv import load_dotenv
import os

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

API_KEY = os.environ.get('API_KEY')
BASE_URL = "https://cloud.iexapis.com/"

#returns string of current price of an asset
def get_price(asset_class, symbol):
    if asset_class == "Stocks":
        req = BASE_URL + "stable/stock/" + symbol + "/quote?token=" + API_KEY
        answer = requests.get(req)
        if answer.status_code == 200:
            answer_dict = answer.json()
            return float(answer_dict["latestPrice"])
    if asset_class == "Cryptocurrency":
        req = BASE_URL + "/stable/crypto/" + symbol + "usdt/price?token=" + API_KEY
        answer = requests.get(req)
        if answer.status_code == 200:
            answer_dict = answer.json()
            return float(answer_dict["price"])


#returns list of all US stock symbols
def get_symbols():
    req = BASE_URL + "stable/ref-data/symbols?token=" + API_KEY
    answer = requests.get(url=req)
    answer_dict = answer.json()
    symbols = [i["symbol"] for i in answer_dict]
    return symbols

#returns the how many <target> in base are
#e.g: currency = USD, base = CHF --> 1.12 CHF
def get_rates(target, base):
    req = "https://api.exchangeratesapi.io/latest?" + base
    answer = requests.get(req)
    if answer.status_code == 200:
        answer_dict = answer.json()
        return float(answer_dict['rates'][target])

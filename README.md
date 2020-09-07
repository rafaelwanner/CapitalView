# CapitalView

![Portfolio Overview](/frontend/public/images/overview.jpg)

## About

This is a little CRUD web application which lets the user keep track of his capital. 

## Technologies
#### backend: 
  * language: Python
  * modules: Flask, SQLAlchemy
  * database: Postgresql
#### frontend:
  * language: JavaScript XML
  * framework: React JS
#### third-party tools:
  * for the financial data [IEX Cloud](https://iexcloud.io/) was used
  * for rate conversion between different currencies [ExangeRate API](https://exchangeratesapi.io/) was used
  
## Use

Feel free to clone the project and run it locally on your machine. Here is a little guide on how to do so:

1. Clone this repository by entering the following in a terminal:
```bash
     git clone git@github.com:rafaelwanner/CapitalView.git
     cd CapitalView
```

2. Make sure you have [node.js](https://nodejs.org/en/) and [Python](https://www.python.org/) installed

3. Create a virtual environment and install python libraries: 
```bash
     cd backend
     virtualenv env
     source env/bin/activate
     pip install -r requirements.txt
```

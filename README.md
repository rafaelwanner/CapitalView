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
4. Create a .env file in the backend folder containing:
 1. the database url (for help to get started with Postgresql check out this [Tutorial](https://www.patricksoftwareblog.com/database-using-postgresql-and-sqlalchemy/)
 2. the API key for the financial data. For that create a free account at IEX Cloud to get an API key.
 3. a jwt key for the authentifaction token. This can be a random sequence of characters and digits.
 ![this is how it should look](/frontend/public/images/env.jpg)

5. Install all node modules:
```bash
     cd ../frontend
     npm install
```









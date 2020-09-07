# CapitalView

![Portfolio Overview](/frontend/public/images/overview.jpg)

## About

This is a little CRUD web application which lets the user keep track of his capital. Various assets from three different asset classes (Stocks, Cryptocurrency and Fiat currency) can be added to the portfolio where they are represented in a clean and clear mannor. There is also a detail view of each assets which shows how many assets the user owns, at which price it was bought and what the current gain on the asset is.
![Detail View of Asset](/frontend/public/images/detail.jpg)

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
  
## Setup

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
 * the database url (for help to get started with Postgresql check out this [Tutorial](https://www.patricksoftwareblog.com/database-using-postgresql-and-sqlalchemy/))
 * the API key for the financial data. For that create a free account at IEX Cloud to get an API key.
 * a jwt key for the authentifaction token. This can be a random sequence of characters and digits.
 ![this is how it should look](/frontend/public/images/env.jpg)

5. Install all node modules:
```bash
     cd ../frontend
     npm install
```

6. Open a new terminal and start the server:
```bash
     cd CapitalView/backend
     python3 server.py
```

7. Start the frontend:
```bash
     npm start
```







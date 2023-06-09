#  Cart 97 eCommerce App

> eCommerce app built with the MERN stack & Redux by RAHUL PRAJAPATI.

## Features

- All the products are listed on Homescreen
- User Authentication and protected Routes
- Full featured shopping cart
- Product search feature
- User can sort products by Price in order of ascending and descending
- User profile with orders
- Checkout process (shipping, payment method, etc)
- mock payment functionality
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Rename the `.env` file and add the following

```
NODE_ENV = development
PORT = 8000
MONGO_URI = your mongodb uri
JWT_SECRET = 'add your jwt secret'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
for backend- in root folder - npm install
for frontend- cd frontend - npm install
```

### Run

```
# Run frontend (:3000) & backend (:8000)
cd- frontend/ npm start

# Run backend only
cd- backend/ nodemon server.js
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
nodemon seeder.js

# Destroy data
nodemon seeder.js d
```

```
Sample User Logins

admin@gmail.com (Admin)
123456

tony@gmail.com (Customer)
123456

walter@gmail.com (Customer)
123456
```
#  Cart 97 eCommerce App

> eCommerce app built with the MERN stack & Redux by RAHUL PRAJAPATI.

## Screenshots
desktop view-
1. Register page
   ![Screenshot (451)](https://github.com/user-attachments/assets/dffc657e-41b6-4721-9c00-2f144b80d384)
2. Sign in
   ![Screenshot (452)](https://github.com/user-attachments/assets/8f650a92-ae15-46d4-9900-7fe7e65e115f)
3. Home page with sorting
   ![Screenshot (454)](https://github.com/user-attachments/assets/bf91767c-57f6-4af1-89dd-95ec6522e873)
4. Product Search
   ![Screenshot (455)](https://github.com/user-attachments/assets/64e12deb-bce7-43c3-a7b2-20b8859b5eb1)
5. Product detailed page with quantity, stock availability & add to cart feature.
   ![Screenshot (456)](https://github.com/user-attachments/assets/fda3d2e6-33fb-40f0-b805-b892edb91e9a)
6. Cart page
   ![Screenshot (457)](https://github.com/user-attachments/assets/ce1b6173-fe9d-4e84-9dea-b5dc80c03ee2)
7. Shipping Address page
   ![Screenshot (458)](https://github.com/user-attachments/assets/99580c81-1d46-4b77-9aa2-64561f97b592)
8. Payment page (currently only one option)
   ![Screenshot (459)](https://github.com/user-attachments/assets/abc54474-0f1a-4fdf-9148-e7fec908ae3c)
9. Place order
    ![Screenshot (460)](https://github.com/user-attachments/assets/bdca9140-2b64-40cf-b9f9-3f54ee5a9ed5)
10. Click to pay (mock payment ui)
    ![Screenshot (461)](https://github.com/user-attachments/assets/d1fb2230-a6d8-4d6b-b2a3-5e5de95c9ed3)
11. Payment successfull
    ![Screenshot (462)](https://github.com/user-attachments/assets/fa2435a1-ab58-4370-a9c2-f6c7e8c6771e)
12. Mark as delivered
     ![Screenshot (463)](https://github.com/user-attachments/assets/31a0a1ae-d597-46bd-9177-4f69e312b3fb)
13. Order list data for Admin only
    ![Screenshot (464)](https://github.com/user-attachments/assets/4ff9bee2-512b-4cd5-bc52-d6f1c7d65649)

Mobile view-
1. ![Screenshot (465)](https://github.com/user-attachments/assets/8898918e-ae2e-440d-ba3d-284bc5af09a1)
2. ![Screenshot (473)](https://github.com/user-attachments/assets/1865db54-c474-4f24-bc7a-e347e3671298)

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

tony@gmail.com (Customer)
123456

walter@gmail.com (Customer)
123456
```

const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Tony stark',
        email: 'tony@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name: 'Walter white',
        email: 'walter@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
];

module.exports = users;
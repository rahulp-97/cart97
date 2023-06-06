const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.getUsers);
router.post('/', userControllers.registerUser);
router.post('/login', userControllers.authUser);
router.post('/logout', userControllers.logoutUser);

router.get('/profile', userControllers.getUserProfile);
router.put('/profile', userControllers.updateUserProfile);

router.delete('/:id', userControllers.deleteUser);
router.get('/:id', userControllers.getUserById);
router.put('/:id', userControllers.updateUser);

module.exports = router;
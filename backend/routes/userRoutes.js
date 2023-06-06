const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const {protect, admin} = authMiddleware;

router.get('/', protect, admin, userControllers.getUsers);
router.post('/', userControllers.registerUser);
router.post('/auth', userControllers.authUser);
router.post('/logout', userControllers.logoutUser);

router.get('/profile', protect, userControllers.getUserProfile);
router.put('/profile', protect, userControllers.updateUserProfile);

router.delete('/:id', protect, admin, userControllers.deleteUser);
router.get('/:id', protect, admin, userControllers.getUserById);
router.put('/:id', protect, admin, userControllers.updateUser);

module.exports = router;
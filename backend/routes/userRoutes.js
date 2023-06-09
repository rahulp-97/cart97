const express = require('express');
const router = express.Router();
const {getUsers, registerUser, authUser,  logoutUser, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser} = require('../controllers/userControllers');
const {protect, admin} = require('../middleware/authMiddleware');

router.get('/', protect, admin, getUsers);
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.delete('/:id', protect, admin, deleteUser);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);

module.exports = router;
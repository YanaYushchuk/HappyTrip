const express = require('express');
const router = express.Router();

// Імпортуємо контролер напрямків
const user_controller = require('../controllers/userController');

// POST запит для створення напрямку
router.post('/user', user_controller.user_create_post);

// GET запит to get user
router.get('/user/:id', user_controller.user_get);

// PATCH запит для оновлення напрямку
router.patch('/user/:id', user_controller.user_update);
// Експортуємо роутер
module.exports = router;

const express = require('express');
const router = express.Router();

// Імпортуємо контролер напрямків
const destination_controller = require('../controllers/destinationController');

// GET запит для отримання списку всіх напрямків
router.get('/destinations', destination_controller.destination_list);

// POST запит для створення напрямку
router.post('/destination/create', destination_controller.destination_create_post);

// DELETE запит для видалення напрямку
router.delete('/destination/:id', destination_controller.destination_delete);

// PATCH запит для оновлення напрямку
router.patch('/destination/:id', destination_controller.destination_update);

// GET запит для отримання детальної інформації про подорож за її ID
router.get('/destination/:id', destination_controller.destination_detail);

// Експортуємо роутер
module.exports = router;

const Destination = require("../models/destination");
const asyncHandler = require("express-async-handler");

// Відображення списку всіх напрямків.
exports.destination_list = asyncHandler(async (req, res, next) => {
    const allDestinations = await Destination.find().sort({ title: 1 }).exec();
    res.send(allDestinations);
});


// Відображення детальної інформації про конкретну дестінацію за її ID
exports.destination_detail = asyncHandler(async (req, res, next) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Обробка створення напрямку на POST-запит.
exports.destination_create_post = asyncHandler(async (req, res, next) => {
    const destination_details = {
        title: req.body.title,
        description: req.body.description
    };
    const destination = new Destination(destination_details );
    const savedDestination = await destination.save();
    res.status(201).send(savedDestination);
});

// Обробка видалення напрямку на DELETE-запит.
exports.destination_delete = asyncHandler(async (req, res, next) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send('Напрямок не знайдено');
        }
        await Destination.deleteOne({ _id: req.params.id });
        res.send({ message: 'Напрямок видалено успішно' });
    } catch (error) {
        next(error);
    }
});

// Обробка оновлення напрямку на PATCH-запит.
exports.destination_update = asyncHandler(async (req, res, next) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send('Напрямок не знайдено');
        }

        // Оновлення полів напрямку
        destination.title = req.body.title || destination.title;
        destination.description = req.body.description || destination.description;
        // ... оновлення інших полів за необхідності

        const updatedDestination = await destination.save();
        res.send(updatedDestination);
    } catch (error) {
        next(error);
    }
});
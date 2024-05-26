const Destination = require("../models/destination");
const asyncHandler = require("express-async-handler");

// Відображення списку всіх напрямків.
exports.destination_list = asyncHandler(async (req, res, next) => {
    const allDestinations = await Destination.find().sort({ title: 1 }).exec();
    res.send(allDestinations);
});

// Відображення форми для створення напрямку на GET-запит.
exports.destination_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Destination create GET");
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

// Відображення форми для видалення напрямку на GET-запит.
exports.destination_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Destination delete GET");
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

// Відображення форми для оновлення напрямку на GET-запит.
exports.destination_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Destination update GET");
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
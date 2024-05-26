const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display detail page for a specific User.
exports.user_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the trip by user_ID
        const user = await User.findOne({ user_id: req.params.id });

        // If no trip found, send a 404 response
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Render the trip detail view with the trip data
        res.send(user);
    } catch (error) {
        // If an error occurs, pass it to the error handler
        next(error);
    }
});

// Обробка створення напрямку на POST-запит.
exports.user_create_post = asyncHandler(async (req, res, next) => {
    const user_details = {
        user_id: req.body.user_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    const user = new User(user_details);
    const savedUser = await user.save();
    res.status(201).send(savedUser);
});

// Обробка оновлення напрямку на PATCH-запит.
exports.user_update = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findOne({ user_id: req.params.id });
        if (!user) {
            return res.status(404).send('User не знайдено');
        }

        // Оновлення полів напрямку
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || destination.lastname;
        // ... оновлення інших полів за необхідності

        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (error) {
        next(error);
    }
});
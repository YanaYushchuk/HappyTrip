const Trip = require("../models/trip");
const Destination = require("../models/destination");
const asyncHandler = require("express-async-handler");

// Display list of all Trips.
exports.trip_list = asyncHandler(async (req, res, next) => {
    const allTrips = await Trip.find().sort({ title: 1 }).exec();
    res.send(allTrips);
});

exports.search_trips = asyncHandler(async (req, res) => {
    try {
        console.log('Значення параметра date:', req.query.date);
        let query = Trip.find();

        // Фільтрація за пунктом призначення, якщо вказано
        if (req.query.destination) {
            const destination = await Destination.findOne({ _id: req.query.destination }).exec();
            if (destination) {
                query = query.where('destinations').in([destination._id]);
            }
        }

        // Фільтрація за датою, якщо вказано
        if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(req.query.date);
            endDate.setDate(endDate.getDate() + 1); // Додаємо 1 день, щоб врахувати всі подорожі, які починаються в цей день
            query = query.where('startTime').gte(startDate).lt(endDate);
        }

        // Сортування за ціною або алфавітом
        let sortCriteria = {};

        if (req.query.price) {
            sortCriteria.price = req.query.price === 'desc' ? -1 : 1;
        }

        if (req.query.alphabetical) {
            sortCriteria.title = req.query.alphabetical === 'desc' ? -1 : 1;
        }

        // Додавання сортування за датою, якщо вказано
        if (req.query.date && !req.query.price) {
            sortCriteria.startTime = req.query.date === 'desc' ? -1 : 1;
        }

        if (Object.keys(sortCriteria).length !== 0) {
            query = query.sort(sortCriteria);
        }

        // Пагінація
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const totalTrips = await Trip.countDocuments(query.getFilter());
        const totalPages = Math.ceil(totalTrips / limit);

        query = query.skip(skip).limit(limit);

        // Виконання запиту з пагінацією
        const trips = await query.exec();

        // Лог для перевірки відповіді
        console.log('Запит:', req.query);
        console.log('Знайдено подорожей:', trips.length);
        console.log('Усього сторінок:', totalPages);

        res.json({ trips, totalPages });
    } catch (error) {
        console.error('Помилка сервера під час пошуку подорожей:', error);
        res.status(500).json({ message: 'Server error during trip search' });
    }
});





// Display detail page for a specific Trip.
exports.trip_detail = asyncHandler(async (req, res, next) => {
    try {
        // Find the trip by ID
        const trip = await Trip.findById(req.params.id)
            .populate('destinations')
            .populate('destinationSequences')
            .exec();

        // If no trip found, send a 404 response
        if (!trip) {
            return res.status(404).send('Trip not found');
        }

        // Render the trip detail view with the trip data
        res.send(trip);
    } catch (error) {
        // If an error occurs, pass it to the error handler
        next(error);
    }
});


// Display Trip create form on GET.
exports.trip_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip create GET");
});

// Handle Trip create on POST.
exports.trip_create_post = asyncHandler(async (req, res, next) => {
    const trip_details = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        destinations: req.body.destinations, // Припускаємо, що це масив ID пунктів призначення
        destinationSequences: req.body.destinationSequences // Припускаємо, що це масив ID послідовностей пунктів призначення
    };
    // Створення екземпляру подорожі з даними з запиту
    const trip = new Trip(trip_details);

    try {
        // Збереження подорожі в базі даних
        await trip.save();
        // Перенаправлення на сторінку з деталями нової подорожі або на список подорожей
        res.redirect('/tripManager/trip/' + trip._id);
    } catch (error) {
        // Якщо виникає помилка, відображення форми знову з повідомленням про помилку
        res.send(trip);
    }
});


// Display Trip delete form on GET.
exports.trip_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip delete GET");
});

// Handle Trip delete on DELETE.
exports.trip_delete = asyncHandler(async (req, res, next) => {
    try {
        // Знайти подорож за ID і видалити
        const trip = await Trip.findByIdAndDelete(req.params.id).exec();

        // Якщо подорож не знайдена, відправити повідомлення про помилку
        if (!trip) {
            return res.status(404).send('Trip not found');
        }

        // Відправити відповідь про успішне видалення
        res.send(`Trip with ID ${req.params.id} has been deleted`);
    } catch (error) {
        // Якщо виникає помилка, відправити повідомлення про помилку
        next(error);
    }
});


// Display Trip update form on GET.
exports.trip_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip update GET");
});

// Handle Trip update on PATCH
exports.trip_update = asyncHandler(async (req, res, next) => {
    try {
        // Знайти подорож за ID
        const trip = await Trip.findById(req.params.id);

        // Якщо подорож не знайдена, відправити повідомлення про помилку
        if (!trip) {
            return res.status(404).send('Trip not found');
        }

        // Оновити поля подорожі з даними з запиту
        trip.title = req.body.title || trip.title;
        trip.description = req.body.description || trip.description;
        trip.price = req.body.price || trip.price;

        // ... оновити інші поля за необхідності

        // Зберегти оновлену подорож
        await trip.save();

        // Відправити відповідь з оновленою подорожжю
        res.send(trip);
    } catch (error) {
        // Якщо виникає помилка, відправити повідомлення про помилку
        next(error);
    }
});

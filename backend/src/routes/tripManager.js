const express = require("express");
const router = express.Router();

// Require controller modules.
//const book_controller = require("../controllers/bookController");
const trip_controller = require("../controllers/tripController");
// const genre_controller = require("../controllers/genreController");
// const book_instance_controller = require("../controllers/bookinstanceController");

/// trip ROUTES ///

// GET request for creating trip. NOTE This must come before route for id (i.e. display trip).
router.get("/trip/create", trip_controller.trip_create_get);

// POST request for creating trip.
router.post("/trip/create", trip_controller.trip_create_post);

// GET request to delete trip.
router.get("/trip/:id/delete", trip_controller.trip_delete_get);

// DELETE request to delete trip.
router.delete("/trip/:id", trip_controller.trip_delete);

// GET request to update trip.
router.get("/trip/:id/update", trip_controller.trip_update_get);

// PATCH request to update trip.
router.patch("/trip/:id", trip_controller.trip_update);

// GET request for one trip.
router.get("/trip/:id", trip_controller.trip_detail);

// GET request for list of all trips.
router.get("/trips", trip_controller.trip_list);

module.exports = router;
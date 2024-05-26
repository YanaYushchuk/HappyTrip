const express = require("express");
const router = express.Router();

// Require controller modules.
const trip_controller = require("../controllers/tripController");
/// trip ROUTES ///

// GET request for creating trip. NOTE This must come before route for id (i.e. display trip).
router.get("/trip/create", trip_controller.trip_create_get);

// POST request for creating trip.
router.post("/trip/create", trip_controller.trip_create_post);

// DELETE request to delete trip.
router.delete("/trip/:id", trip_controller.trip_delete);

// PATCH request to update trip.
router.patch("/trip/:id", trip_controller.trip_update);

// GET request for one trip.
router.get("/trip/:id", trip_controller.trip_detail);

// GET request for list of all trips.
router.get("/trips", trip_controller.trip_list);

// Route for searching trips
router.get('/search-trips', trip_controller.search_trips);


module.exports = router;
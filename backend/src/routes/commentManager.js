const express = require("express");
const comment_Controller = require("../controllers/commentController"); // Import your controller

const router = express.Router();

// Get all comments
router.get("/comments", comment_Controller.getAllComments);

// Create a new comment for a specific trip (assuming trip ID is in URL parameter)
router.post("/trip/:tripId/comments", comment_Controller.createComment);

module.exports = router;
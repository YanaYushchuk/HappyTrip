// controllers/commentsController.js
const Comment = require("../models/comment");
const Trip = require("../models/trip");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Обробник для отримання всіх коментарів
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
};

exports.createComment = asyncHandler(async (req, res, next) => {
    console.log("Request body:", req.body);
    const commentDetails = {
        description: req.body.description,
        users: req.body.users,
        trips: req.body.trips
    };
    const comment = new Comment(commentDetails);
    const savedComment = await comment.save();
    res.status(201).send(savedComment);
});
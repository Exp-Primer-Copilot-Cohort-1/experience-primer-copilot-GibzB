// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comments.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post comment
router.post('/', async (req, res) => {
    const comment = new Comments({
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comments.remove({ _id: req.params.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comments.updateOne(
            { _id: req.params.commentId },
            { $set: { name: req.body.name, comment: req.body.comment } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Export module
module.exports = router;

// End of file


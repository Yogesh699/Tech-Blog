import { Router } from 'express';
import { User, Post, Comment } from '../../model/index.js';

const router = Router();

// Middleware to check if the user is authenticated
const withAuth = (req, res, next) => {
    // If the user is not authenticated, redirect to the login page
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        // If authenticated, proceed to the next middleware or route handler
        next();
    }
};

// Route to get all comments
router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch all comments
        const commentData = await Comment.findAll();
        res.json(commentData);
    } catch (err) {
        // Handle errors and send a 500 status with the error details
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session) {
            // Create a new comment using data from the request body and user session
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            });
            res.json(commentData);
        }
    } catch (err) {
        // Handle errors and send a 400 status with the error details
        console.error(err);
        res.status(400).json(err);
    }
});

// Route to delete a comment by its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete a comment by its ID
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        // If no comment is found with the given ID, send a 404 response
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.json(commentData);
    } catch (err) {
        // Handle errors and send a 500 status with the error details
        console.error(err);
        res.status(500).json(err);
    }
});

export default router;

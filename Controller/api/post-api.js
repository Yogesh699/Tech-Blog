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

// Route to get all posts with associated comments and users
router.get('/', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        attributes: ['id', 'post_text', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    res.json(postData);
});

// Route to get a single post by its ID with associated comments and users
router.get('/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_text', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    });

    // If no post is found with the given ID, send a 404 response
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }

    res.json(postData);
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    const postData = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    });
    res.json(postData);
});

// Route to update a post by its ID
router.put('/:id', withAuth, async (req, res) => {
    const postData = await Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    // If no post is found with the given ID, send a 404 response
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }

    res.json(postData);
});

// Route to delete a post by its ID
router.delete('/:id', withAuth, async (req, res) => {
    const postData = await Post.destroy({
        where: {
            id: req.params.id
        }
    });

    // If no post is found with the given ID, send a 404 response
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }

    res.json(postData);
});

export default router;

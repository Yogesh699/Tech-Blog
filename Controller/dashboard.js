import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../model/index.js';

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

// Route to display the user's dashboard
router.get('/', withAuth, async (req, res) => {
    // Fetch all posts for the authenticated user
    const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
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

    // Map the fetched data to plain objects
    const posts = postData.map(post => post.get({ plain: true }));

    // Render the dashboard template with posts data and session information
    res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
});

// Route to render the edit post page for a specific post
router.get('/edit/:id', withAuth, async (req, res) => {
    // Fetch the post by its ID
    const postData = await Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
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

    // If the post exists, render the edit-post template with post data and session information
    if (postData) {
        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: true,
            username: req.session.username
        });
    }
});

export default router;

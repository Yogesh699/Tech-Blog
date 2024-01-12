import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../model/index.js';

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
  // Fetch all posts with associated comments and users
  let postData = await Post.findAll({
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

  // Render the homepage template with posts data and session information
  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the login template
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the signup template
  res.render('signup');
});

// Route to get a single post by its ID
router.get('/post/:id', async (req, res) => {
  // Fetch the post with associated comments and users by ID
  let postData = await Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
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

  // If no post is found with the given ID, return a 404 error
  if (!postData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
  }

  // Map the fetched data to a plain object
  const post = postData.get({ plain: true });

  // Render the single-post template with post data and session information
  res.render('single-post', {
    post,
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

export default router;

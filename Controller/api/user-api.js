import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../../model/index.js';

// Route to create a new user
router.post('/', async (req, res) => {
    // Create a new user using data from the request body
    const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // Save user data to the session to log in the user
    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.loggedIn = true;

    // Send the user data in the response
    res.json(userData);
});

// Route to handle user login
router.post('/login', async (req, res) => {
    // Find a user by their email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user is found with the given email, send a 400 response
    if (!userData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
    }

    // Check if the provided password is correct
    const validPassword = userData.checkPassword(req.body.password);

    // If the password is incorrect, send a 400 response
    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
    }

    // Save user data to the session to log in the user
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        // Send a success message in the response
        res.json({ user: userData, message: 'You are now logged in!' });
    });
});

// Route to handle user logout
router.post('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy(() => {
        res.status(204).end();
    });
});

export default router;

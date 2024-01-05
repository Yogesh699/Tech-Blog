import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../../model/index.js';

router.post('/', async (req, res) => {
    const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    req.session.user_id = userData.id
    req.session.username = userData.username
    req.session.loggedIn = true

    res.json(userData);
});

router.post('/login', async (req, res) => {
    const userData = await User.findOne({where: {email: req.body.email}})

    if (!userData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
  
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  });

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.status(204).end();
    });
});

export default router;

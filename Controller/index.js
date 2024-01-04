import { Router } from 'express';
import { User, Post, Comment } from '../model/index.js';
// import apiRoutes from './api/index.js';

const router = Router();

const homeRoutes = router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //       include: {
    //         model: User,
    //         attributes: ['username']
    //       }
    //     },
    //     {
    //       model: User,
    //       attributes: ['username']
    //     }
    //   ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
  
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn,
          username: req.session.username
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);

export default router;
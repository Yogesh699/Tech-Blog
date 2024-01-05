import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../model/index.js';

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};


router.get('/', withAuth, async (req, res) => {
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
        })
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
});

router.get('/edit/:id', withAuth, async (req, res) => {
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
    })
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

import { Router } from 'express';
const router = Router();
import { User, Post, Comment } from '../../model/index.js';

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

router.get('/', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        attributes: ['id','post_text','title','created_at'],
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
    res.json(postData)
});

router.get('/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id','post_text','title','created_at'],
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
    
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(postData);
   
});

router.post('/', withAuth, async (req, res) => {
    const postData = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    res.json(postData)
});

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
    )
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(postData);
});

router.delete('/:id', withAuth, async (req, res) => {
    const postData = await Post.destroy({
            where: {
            id: req.params.id
            }
        })
 
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
});



export default router;

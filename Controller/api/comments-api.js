import { Router } from 'express';
import { User, Post, Comment } from '../../model/index.js';

const router = Router();

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

router.get('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });
      res.json(dbCommentData);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



export default router;

import sequelize from '../connection/db.js';
import { Comment, User, Post } from '../model/index.js'

const userdata = [
    {
      username: 'Liam',
      email: 'Liam@example.com',
      password: 'password123'
    },
    {
      username: 'Olive',
      email: 'Olive@example.com',
      password: 'password123'
    }
  ];

  const postdata = [
    {
      title: 'Greeting',
      post_text: 'Hey this is Liam.',
      user_id: 1
    }
  ];

  const commentdata = [
    {
      comment_text: 'Hey This is Olive',
      user_id: 2,
      post_id: 1
    }
  ];

async function seeding(){
    await sequelize.sync({ force: true })
    await User.bulkCreate(userdata)
    await Post.bulkCreate(postdata)
    await Comment.bulkCreate(commentdata)
}


seeding()
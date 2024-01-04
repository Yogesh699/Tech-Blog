import Sequelize from 'sequelize'
const sequelize = new Sequelize('mysql://root:@localhost/tech_blog')
export default sequelize;
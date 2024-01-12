import Sequelize from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.QUERYSTRING, {
    dialect: 'mysql', 
})
export default sequelize;
import express from 'express'
import sequelize from './connection/db.js';

const app = express()
const PORT = 3000

// Handle Incoming data
app.use(express.json())
app.use(express.urlencoded({ extends: false }))


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
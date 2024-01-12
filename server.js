import express from 'express'
import session from 'express-session';
import exphbs from 'express-handlebars';
import sequelize from './connection/db.js';
import router from './Controller/index.js'
import helpers from './helpers.js/index.js';
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extends: true }))

app.use(session({
    secret: 'MYSECRETKEY',
    resave: false,
    saveUninitialized: true
  }));
  
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(router)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
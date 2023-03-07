const express = require('express');
const app = express();
require('dotenv').config()
const authenticate = require('./middleware/auth.middleware')


const cors = require('cors');
const Router = require('./routes/index')
const AuthRouter = require('./routes/authRoutes')

// MIDDLEWARE 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(express.static('views'))
app.set('view engine', 'ejs')

app.get('/',(req, res) => {
    res.send('hello, working...')
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use('/api/auth',AuthRouter);
  app.use('/api',authenticate,Router);

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}...`);
});

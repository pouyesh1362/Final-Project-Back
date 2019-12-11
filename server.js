const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser')
require('dotenv').config();
const PORT = process.env.PORT;
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const routes = require('./routes');

//--------------------------------------MiddleWare---------------------------//
//// CORS - Cross Origi Resource Sharing
const corsOption = {
  origin: [`https://househubhh.herokuapp.com`],
  credentials:true,
  optionsSuccessStatus:200,
};
app.use(cors(corsOption));
//--------------------------------------Body Parser-------

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//---------------Express Session - Anthentication--------
app.use(session({

  store: new MongoStore({url:process.env.MONGODB_URI}),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  } 
}))

//------------------------------ROUTES HERE------------------------------------//

app.get('/',(req,res) =>{
  res.send("<h1>Final project API</h1>")
})
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/houses', routes.house);

app.listen(process.env.PORT, ()=>console.log(`Server connected faild ...`));

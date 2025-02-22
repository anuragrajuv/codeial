const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require("./config/view_helpers.js")(app)
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require("./config/passport-facebook-strategy");
const MongoStore = require('connect-mongo');
// const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const cors = require('cors');

// setting up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets.js').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

const path = require('path');
app.use(cors());

app.use(sassMiddleware({
    // src:'./assets/scss',
    // dest:'./assets/css',
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.json()); // Enables JSON parsing
app.use(express.urlencoded({ extended: false }));

// use cookie parser
app.use(cookieParser());
// make the uploads path available to the browser
app.use(express.static(env.asset_path));

// make uploads path available to the browser
app.use("/uploads",express.static(__dirname + "/uploads"));

// use logger
app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);


// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err|| 'connect-mongodb setup ok');
        }
    )    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require("./routes/index"));

app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`);
        return;
        }

    console.log(`Server is running on port ${port}`);

})
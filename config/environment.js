const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');
// require('dotenv').config();


const logDirectory = path.join(__dirname,"../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
})

const development = {
    name: 'development',
    asset_path:process.env.dev_asset_path,
    session_cookie_key:process.env.dev_session_cookie_key,
    db:process.env.dev_db,
    smpt:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.dev_gmail_user,
            pass:process.env.dev_gmail_pass
        }
    },
    FACEBOOK_APP_ID:process.env.dev_FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET:process.env.dev_FACEBOOK_APP_SECRET,
    GOOGLE_CLIENT_ID:process.env.dev_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.dev_GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.dev_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.dev_jwt_secret,
    chat_socket_connect:process.env.dev_socket_connect,
    chat_socket_host:process.env.dev_socket_host,
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
    }

const production = {
    name: 'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smpt:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    FACEBOOK_APP_ID:process.env.CODEIAL_FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET:process.env.CODEIAL_FACEBOOK_APP_SECRET,
    GOOGLE_CLIENT_ID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    chat_socket_connect:process.env.CODEIAL_socket_connect,
    chat_host:process.env.CODEIAL_socket_host,
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
    }

    // module.exports = production;

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
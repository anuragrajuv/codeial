const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname,"../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
})

const development = {
    name: 'development',
    asset_path:'./assets',
    session_cookie_key:"blahsomething",
    db: 'codeial_development',
    smpt:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'devlopment.anurag@gmail.com',
            pass:'mypc vlcc mvyy ssgo'
        }
    },
    FACEBOOK_APP_ID:"491595107379112",
    FACEBOOK_APP_SECRET:"cfeaba11da497c713f526d71390bf1d4",
    GOOGLE_CLIENT_ID:"659505693933-v86103cmtamc75fjj8dhbgcd8uk9elmg.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET:"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",
    GOOGLE_CALLBACK_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:"codeial",
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
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
    }

    // module.exports = production;

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
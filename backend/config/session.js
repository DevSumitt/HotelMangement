const session = require("express-session");
const MongoStore = require("connect-mongo"); 

module.exports = session({
    name: 'login-session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions"
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: true,
        sameSite: "none" 
    }
});

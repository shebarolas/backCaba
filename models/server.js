const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser')
const emailRouter = require('../routes/email.routes');
const cookieSession = require('cookie-session')


class Server {
    constructor(){
        this.app = express();
        this.pathMessages = '/massage';
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(bodyParser.json());
        this.app.use(cookieSession({
            name: 'session',
            keys: ["logiyo"],
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
          }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(cors({
            origin: 'https://www.eluneypucon.cl',
            methods: 'GET,POST,PUT,DELETE',
            credentials: true
        }));
    }

    routes(){
        this.app.use(this.pathMessages, emailRouter);
    }

    listen() {
        this.app.listen(9000, () => {
            console.log('listening on http://localhost:9000');
        });
    }

}

module.exports = Server;
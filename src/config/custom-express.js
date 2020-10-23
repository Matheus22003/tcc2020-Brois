const express = require("express");
const app = express();
const session = require("express-session")
const passport = require("passport")
const flash = require('connect-flash');
const bodyParser = require('body-parser');
require("./auth")(passport)
const methodOverride = require('method-override');
const handlebars = require("express-handlebars");
const path = require('path');
const uuid = require('uuid/v4');
const MongoStore = require('connect-mongo')(session);
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const { eLogado } = require("../helpers/eLogado")


// Sessão
var mongoStore = new MongoStore({ url: "mongodb+srv://admin:admin@cluster0-z85sx.gcp.mongodb.net/rivals?retryWrites=true&w=majority" })
app.use(session({
    secret: "220303mat",
    genid: function (req) {
        return uuid()
    },
    store: mongoStore,
    resave: true,
    saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Body Parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Middleware

app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();

})

// io.use(passportSocketIo.authorize({
//     key: "connect.sid",
//     secret: '220303mat',
//     store: mongoStore ,
//     passport: passport,
//     cookieParser: cookieParser
// }))



// HandleBars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Public
app.use(express.static(path.join(__dirname, "../../public")));


module.exports = {
    app: app,
    passport: passport,
    path: path,
    eLogado: eLogado,
    express: express,
    io: io,
    server: server

}
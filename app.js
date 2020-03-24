'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    restFul = require('method-override')('_method'),
    config = require('./config'),
    cookieSession = require("cookie-session"),
    //Index = require('./controlador/index'),
    //Almacen_router = require('./routes/almacen'),
    //session_active = require('./middleware/session-active'),
    passport = require("passport"),
    path = require("path"),
    flash = require("connect-flash"),



    // session_admin = require('./middleware/session-admin'),
    // session_general_admin = require('./middleware/session-general-admin'),
    //
    // session_active_sucursal = require('./middleware/session-active-sucursal'),
app = express()

app
    // configuracion app
    .set("view engine","ejs")
    .set("views", path.join(__dirname,"views"))
    .set('port',config.PORT)
    // ejecutando middleware
    .use( config.PUBLIC, express.static('public') )
    // parse application/json
    .use( bodyParser.json())
    // parse applicaction/x-www-form-urlencoded
    .use( bodyParser.urlencoded({extended:false}) )
    // para put y delete
    .use( restFul )
    .use(cookieSession({
        name: "session",
        keys: ["ford","time"]
    }))

    .use(flash())
    .use(passport.initialize())
    .use(passport.session());

/*
app
    .get('/', Index.index )
    .post('/login', Index.loginPost )
    .get('/logout', Index.logout )
    .get('/inicio', Index.inicio )
*/

    //.use("/inicio",Almacen_router)
// gelishtime/consumos
/*app
    .use("/consumos",session_active)
    .use("/consumos",Consumo_router)
// gelishtime/basicos
*/
//requires
require('./controlador/passport')(passport);

//routes
const rutaIndex = require("./routes/index")(app, passport);
const rutaUsuario = require("./routes/usuario")(app, passport);
const rutaAreaGeo = require("./routes/areageo")(app, passport);
const rutaAreaOrg = require("./routes/areaorg")(app, passport);
const rutaProcesos = require("./routes/procesos")(app, passport);
const rutaInventario = require("./routes/inventario")(app, passport);
const rutaReportes = require("./routes/reportes")(app, passport);

const rutaSeguridad = require("./routes/seguridad")(app, passport);

module.exports = app

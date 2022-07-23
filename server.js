const express = require("express");
//routes folder has been updated to controllers
const routes = require("./controllers/");
const sequelize = require("./config/connection");

//this adds the stylesheets
const path = require("path");

//uses express-handlebar to use template for html
const exphbs = require("express-handlebars");
//passes the helpers and tests
//implements the helpers/tests into the server.  so the __tests__ and utilities
//also need to include the helpers into the const hbs = exphbs above
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

//this is for the cookies, express-session allow to connect to back end, mini data passing data from back end to front
const session = require("express-session");

//automatically stores the sessions created by express-session into session of SQL
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//uses with the cookies, best to make the secret: very difficult, resave: means do we want to save everything at once (false, only does one variable instead of multiple)
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

//uses with session & sequelizestore to track user data
app.use(session(sess));

//the apps using express-handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sets the stylesheet for the app to use.  express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder an serve them as static assets.  useful for front end files like images, style sheets, and javascripte files
//http://localhost:3001/stylesheets/style.css
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

//turn on connection to db and server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

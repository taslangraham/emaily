const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const configKeys = require("./config/keys");
const bodyParser = require('body-parser');  // needed to parse requests

require("./models/User");
require("./models/Surveys");
require("./services/passport");

mongoose.connect(configKeys.mongoURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());

// setup cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [configKeys.cookieKey]
  })
);

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());
//passport is used on all request. so a user available via req.user on all requests
require("./routes/authRoutes")(app);

/* the format require("./routes/billingRoutes")(app);
  allows the route to be immediately used instead of
  having to import the route to a variable the
  use 'app.use('route name', variable name)
*/
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === 'production') {
  /*Express will serve up production assets 
  like main.js or main.css
  */
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ Greeting: "welcome to emaily" });
});


app.listen(PORT, () => {
  console.log(
    "Welcome to emaily feedback server. Proudly running on Port",
    PORT
  );
});

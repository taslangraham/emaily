const Passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    Passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback",
    Passport.authenticate("google"),
    (req, res) => { res.redirect('/surveys') });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/')
  });
  app.get("/api/current-user", (req, res) => {
    // res.status(200)
    res.send({ user: req.user });
  });
};

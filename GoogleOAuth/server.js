require("dotenv").config();
const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const app = express();

morgan("dev");
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLEINT_SCERET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName },
      process.env.JWT_SECRET,
    );
    console.log(token);
    res.send("Gooooooooooggggggllllleeeeeeee");
  },
);

app.get("/", (req, res) => {
  res.send("Test API");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});

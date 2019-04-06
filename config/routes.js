const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const db = require("../database/actions/db_actions.js");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function theHash(pass, salt) {
  try {
    const newHash = await new Promise((res, rej) => {
      bcrypt.hash(pass, salt, function(err, hash) {
        if (err) rej(err);
        res(hash);
      });
    });
    return newHash;
  } catch (err) {
    console.log(err);
  }
}

async function loginHashCheck(pass, userPass) {
  try {
    const loginCheck = await new Promise((res, rej) => {
      bcrypt.compare(pass, userPass, function(err, pass) {
        if (err) rej(err);
        res(pass);
      });
    });
    return loginCheck;
  } catch (err) {
    console.log(err);
  }
}

async function register(req, res) {
  const { username, password } = req.body;
  let creds = req.body;
  if (username && password) {
    try {
      const hash = await theHash(password, 10);
      creds.password = hash;
      const userCheck = await db.single_user(username);
      if (userCheck) {
        res
          .status(400)
          .json({
            Error: "The username is alread taken. Please select another"
          });
      } else {
        const newUser = await db.add_user(creds);
        res.status(201).json(newUser);
      }
    } catch (err) {
      res.status(err);
    }
  } else {
    res.status(400).json({ Error: "The username and password are required" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const creds = req.body;
  if (username && password) {
    try {
      const user = await db.single_user(username);
      if (user) {
        const loginCheck = await loginHashCheck(password, user.password);
        if (loginCheck === true) {
          const payload = {
            subject: user.id,
            username: user.username
          };
          const options = {
            expiresIn: "1d"
          };
          const token = await jwt.sign(payload, jwtSecret, options);
          res.status(200).json(token);
        } else {
          res.status(401).json({ Error: "Invalid Credentials" });
        }
      } else {
        res.status(401).json({ Error: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ Error: "The username and password are required" });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

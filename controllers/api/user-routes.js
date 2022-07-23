const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//GET /api/users
router.get("/", (req, res) => {
  //Access our User model and run .findAll() method, findAll method is the same as SQL's SELECT * FROM users;
  //exclude: password so we do not have it shown
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET single user by id
router.get("/:id", (req, res) => {
  //almost same as SELECT * FROM users Where id = 1 on SQL, but we are using findOne instead
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    //when query a single user, will recieve the title informatino of every post they've ever voted on.
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_text", "created_at"],
      },
      //include comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create/api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    //gives server easier access to user's user_id & username and boolean describing if the user is logged in, set this after the cookies in server.js
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Post a login route that will verify the user's identiy, we verify the idenity by using the user's email address and password. , email is the unique identifier and preferred in case there are duplicate usernames
//found in http://localhost:3001/api/users/login
//we queried the User table using the findOne() method for the email entered by the user and assigned it to th req.body.email, if that user's email was not found, message sent back as a response to the client, if found, verify the user's idenity by matching the password from the user and the hashed password in the database. this is done in the Promise of thequery.
router.post("/login", (req, res) => {
  //expects {email: 'lernantino@gmail.com', password 'password 1234'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    //Verify user and the password
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    //making sure that the cookies session is created before we send back the response
    req.session.save(() => {
      //declare session variable
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

//logging out
router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//PUT update the user /api/users/1
router.put("/:id", (req, res) => {
  User.update(req.body, {
    //this provides the async beforeUpdate in the User.js models folder
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete("/:id", withAuth, (req, res) => {
  //use the destory() method to delete data
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

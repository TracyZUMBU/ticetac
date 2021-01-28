var express = require('express');
var router = express.Router();
const usersModel = require('../models/users');

/* GET users listing. */

/* GET SIGN UP */
router.post('/sign-up', async function (req, res, next) {
  /* GET USERS ALREADY OR NOT. */
  var searchUser = await usersModel.findOne({
    email: req.body.emailFromFront,
  });

  if (!searchUser) {
    var newUser = new usersModel({
      name: req.body.NameFromFront,
      firstName: req.body.FirstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    });

    var newUserSave = await newUser.save();

    // rajouter la session pour chaque utilisateur//
    req.session.user = {
      email: req.body.emailFromFront,
      id: newUserSave._id,
    };

    console.log(req.session.user, 'hellooooooooooooooo');

    res.redirect('/homepage');
  } else {
    res.redirect('/');
  }
});

/* GET SIGN IN */
router.post('/sign-in', async function (req, res, next) {
  var searchUser = await usersModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  });

  console.log(searchUser, 'je cherche si tu existes');

  if (searchUser != null) {
    req.session.user = {
      name: searchUser.name,
      id: searchUser._id,
    };
    res.redirect('/homepage');
  } else {
    res.redirect('/');
  }
});

/** Get My Tickets Page */
router.get('/my-tickets', (req, res) => {
  res.render('myTickets', { title: 'My tickets' });
});

/** Get My Last Trips Page */
router.get('/last-trips', (req, res) => {
  res.render('lastTrips', { title: 'My last trips' });
});

module.exports = router;

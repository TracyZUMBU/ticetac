var express = require('express');
var router = express.Router();
const usersModel = require('../models/users');
const journeyModel = require('../models/journeys');

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

    res.redirect('/homepage');
  } else {
    res.redirect('/');
  }
});

/* GET SIGN IN */
router.post('/sign-in', async function (req, res, next) {
  let searchUser = await usersModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  });

  console.log(searchUser, 'je cherche si tu existes');

  if (searchUser != null) {
    req.session.user = {
      firstName: searchUser.firstName,
      id: searchUser._id,
    };
    res.redirect('/homepage');
  } else {
    res.redirect('/');
  }
});

/** Get / page */
router.get('/sign-in', (req, res) => {
  res.redirect('/');
});

/** Get / page */
router.get('/sign-up', (req, res) => {
  res.redirect('/');
});

/** Logout */
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/homepage');
});

/** Add Ticket */
router.get('/add-ticket/', (req, res) => {
  if (!req.session.ticketCart) {
    req.session.ticketCart = [];
  }

  req.session.ticketCart.push({
    _id: req.query.id,
    departure: req.query.dep,
    arrival: req.query.arv,
    date: req.query.date,
    departuretime: req.query.depTime,
    price: req.query.price,
  });
  console.log(req.session.ticketCart);

  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  const getItemPrice = () => {
    const prices = [];
    req.session.ticketCart.forEach((item) => {
      prices.push(+item.price);
    });
    return prices;
  };

  console.log(getItemPrice().reduce(reducer));
  // getItemPrice();

  res.render('myTickets', {
    ticketCart: req.session.ticketCart,
    getTicketPrice: getItemPrice().reduce(reducer),
  });
});

/** Get My Last Trips Page */
router.get('/last-trips', (req, res) => {
  res.render('lastTrips', { title: 'My last trips' });
});

module.exports = router;

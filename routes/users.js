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

  
  // getItemPrice();

  res.render('myTickets', {
    ticketCart: req.session.ticketCart,
    getTicketPrice: getItemPrice().reduce(reducer),
  });
});

/** Get My Last Trips Page */
router.get('/last-trips', async (req, res) => {
  
  const userTickets = await usersModel
  .findById({_id: req.session.user.id})
  .populate('tickets')
  .exec()
  res.render('lastTrips', {userTickets });
});

/** Get all tickets that have been confirmed */
router.get('/allTickets', async (req, res) => {
  console.log("query from front: ", req.query.allTicket);
  const idUser = req.session.user.id;
  const arrayId = req.query.allTicket
  const itemsId = arrayId[0].split(",")
  
  // 1. add id to the DB
  
  for(var i = 0; i < itemsId.length; i++) {
    const addTicket = await usersModel.updateOne(
      { _id: idUser },
      { $push: {tickets: itemsId[i]}}
    );
  }
  const userTickets = await usersModel
  .findById(idUser)
  .populate('tickets')
  .exec()
  // 2.if DB fill send popup

  // 3. redirect to last ticket
  res.render('lastTrips', {userTickets})
  
})

module.exports = router;

var express = require('express');
var router = express.Router();
const usersModel = require('../models/users');

/* GET users listing. */
router.post('/sign-up', async function(req,res,next){
    /* GET USERS ALREADY OR NOT. */
  var searchUser = await usersModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new usersModel({
      name: req.body.NameFromFront,
      firstName: req.body.FirstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    // rajouter la session pour chaque utilisateur//
    req.session.user = {
      email: req.body.emailFromFront,
      id: newUserSave._id,
    }
  
    console.log(req.session.user, "hellooooooooooooooo");
  
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/** Get My Last Trips Page */
router.get('/last-trips', (req, res) => {
  res.render('lastTrips', { title: 'My last trips' });
});

module.exports = router;

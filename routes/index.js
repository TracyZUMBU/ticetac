const express = require('express');
const router = express.Router();
const journeyModel = require('../models/journeys');

const city = [
  'Paris',
  'Marseille',
  'Nantes',
  'Lyon',
  'Rennes',
  'Melun',
  'Bordeaux',
  'Lille',
];
const date = [
  '2018-11-20',
  '2018-11-21',
  '2018-11-22',
  '2018-11-23',
  '2018-11-24',
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/** Get Tickets page */
router.get('/tickets', (req, res) => {
  res.render('tickets', { title: 'Tickets' });
});

/* Resume of order */
router.get('/myTickets', (req, res) => {
  res.render('myTickets', { title: 'Tickets' });
});

/* Get users's last tickets */
router.get('/lastTrips', (req, res) => {
  res.render('lastTrips', { title: 'Tickets' });
});

/* Get hompe page */
router.get('/homepage', function (req, res, next) {
  res.render('homepage');
});

/* Route that retrieve trip's details */
router.post('/search-ticket', async function (req, res, next) {
  // stock details trip from front
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const date = new Date(req.body.date);

  // retrieve all the tickets that match above conditions
  const aggregate = journeyModel.aggregate();
  aggregate.match({
    "departure": departure,
    "arrival": arrival,
    "date": date,
  });
  const ticketList = await aggregate.exec();

  // redirect the client toward a page depending on available tickets or not
  if (ticketList.length > 0) {
    res.render('tickets', { ticketList, user: req.session.user });
  } else if (ticketList.length == 0) {
    res.render('noTrain');
  }
});

// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function (req, res, next) {
  // How many journeys we want
  var count = 300;

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {
    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))];
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))];

    if (departureCity != arrivalCity) {
      var newUser = new journeyModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ':00',
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();
    }
  }
  res.render('index', { title: 'Express' });
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function (req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {
        console.log(
          `Nombre de trajets au départ de ${journey[0].departure} : `,
          journey.length
        );
      }
    );
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;

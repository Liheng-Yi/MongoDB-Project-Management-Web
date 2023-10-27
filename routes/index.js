let express = require('express');
let router = express.Router();

const { getTripData} = require("../db/dbConnector_Sqlite.js")





/* GET home page. */
router.get('/', async function(req, res, next) {

  const tripdata = await getTripData();

  res.render('index', { title: 'SF BikeShare Riders!', tripdata: tripdata});



});

module.exports = router;

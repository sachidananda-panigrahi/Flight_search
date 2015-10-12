var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),
    airportDB = new Bourne('airports.json'),
    searchFlight = new Bourne('searchFlight.json'),
    router = express.Router();

router.use(bodyParser.json())
    .route('/cities')
    .get(function (req, res) {
        airportDB.find({}, function (err, data) {
            res.json(data);
        });
    })
    .put(function (req, res) {
        searchFlight.insert({}, function(){

        })
    });
router.use(bodyParser.json())
    .route('/search')
    .get(function (req, res) {

    });


module.exports = router;

var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),
    airportDB = new Bourne('airports.json'),
    searchFlight = new Bourne('searchFlight.json'),
    router = express.Router(),
    dummyJson = require('dummy-json');

router.use(bodyParser.json())
    .route('/cities')
    .get(function (req, res) {
        airportDB.find({}, function (err, data) {
            res.json(data);
        });
    })
    .post(function (req, res) {
        searchFlight.find({"twoWayFromAirport": {}}, function (err, data) {
            console.log(data.length);
            if (data.length > 0 ) {
                console.log("inside if update");
                searchFlight.update({"twoWayFromAirport": {}}, req.body, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        res.json(data);
                    }
                });
            } else {
                console.log("inside else insert");
                searchFlight.insert(req.body, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        res.json(data);
                    }
                });
            }
        });

    });
router.use(bodyParser.json())
    .route('/search')
    .get(function (req, res) {
        var searchedFlightDetails = {};
        searchFlight.find({}, function (err, data) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {

                res.json(data);
            }
        });
    });


module.exports = router;

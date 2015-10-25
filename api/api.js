var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),
    airportDB = new Bourne('airports.json'),
    searchFlight = new Bourne('searchFlight.json'),
    router = express.Router(),
    Qs = require('qs'),
    dummyJson = require('dummy-json'),
    dummyData = {
        boarding: [],
        destination: [],
        depart: [],
        duration: [],
        arrival: [],
        airline: ['Air India', 'IndiGo', 'Jet Airways', 'SpiceJet', 'AirAsia India', 'TruJet'],
        price: []
    };
var companies = ['Air India', 'IndiGo', 'Jet Airways', 'SpiceJet', 'AirAsia India', 'TruJet'];

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
            if (data.length > 0) {
                searchFlight.update({"twoWayFromAirport": {}}, req.body, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        res.json(data);
                    }
                });
            } else {
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
        var searchedFlightDetails = {}, flightTemplate, flightSearch = {data: []};
        searchFlight.find({}, function (err, data) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                dummyData.boarding = [];
                dummyData.destination = [];

                dummyData.boarding.push(data[0][0].twoWayFromAirport.name);
                dummyData.destination.push(data[0][1].twoWayToAirport.name);
                flightTemplate = '["id": {{index}}, from: "{{boarding}}", "to": "{{destination}}", "depart": {{time}}, "arrival": {{time}}, "duration": {{time}}, "airlines": "{{company}}" , "price": {{number 1500 10000}} ]';

                var partials = {
                    person: flightTemplate
                };

                var template = 'people[{{#repeat 3}}{{> person }}{{/repeat}}]';
                searchedFlightDetails = dummyJson.parse(template, {
                    partials: partials,
                    data: dummyData,
                    companies: companies
                });

                res.send(Qs.parse(searchedFlightDetails));
            }
        });
    });


module.exports = router;

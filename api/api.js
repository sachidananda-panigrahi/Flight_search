var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),
    airportDB = new Bourne('airports.json'),
    searchFlight = new Bourne('flights.json'),
    flightDet = new Bourne('flightDet.json'),
    router = express.Router(),
    Qs = require('qs'),
    S = require('string'),
    parser = require('json-parser'),
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
        var searchedFlightDetails = {}, flightTemplate, flightSearch = {data: []}, partials, template;
        searchFlight.find({}, function (err, data) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                dummyData.boarding = [];
                dummyData.destination = [];

                dummyData.boarding.push(data[0][0].twoWayFromAirport.name);
                dummyData.destination.push(data[0][1].twoWayToAirport.name);
                console.log(dummyData);
                flightTemplate = '{ "id": {{index}}, "from": "{{boarding}}", "to": "{{destination}}", "depart": "{{time}}", "arrival": "{{time}}", "duration": "{{time}}", "airlines": "{{company}}" , "price": "{{number 1500 10000}}" }';

                partials = {
                    flightPartial: flightTemplate
                };

                template = '{ "flights": [{{#repeat 100}}{{> flightPartial }}{{/repeat}}] }';
                searchedFlightDetails = dummyJson.parse(template, {
                    partials: partials,
                    data: dummyData,
                    companies: companies
                });
                flightSearch.data.push(JSON.parse(searchedFlightDetails));

                flightDet.find({"flights": {}}, function (err, data) {
                    if (data.length > 0) {
                        flightDet.update({"flights": {}}, flightSearch.data[0], function (err, data) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            } else {
                                res.json(data);
                            }
                        });
                    } else {
                        flightDet.insert(flightSearch.data[0], function (err, data) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            } else {
                                res.json(data);
                            }
                        });
                    }
                });
            }
        });
    });


module.exports = router;

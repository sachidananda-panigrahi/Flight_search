
var express = require('express'),
    api     = require('./api/api'),
    app     = express();

app.use(express.static('./public'))
    .use('/api', api)
    .get('*', function (req, res) {
        res.sendFile('public/main.html', {"root": "."});
    })
    .listen(8085);
console.log("Server is listing on the port 8085");

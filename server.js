var hapi = require('hapi');
var inert = require('inert');
var moment = require('moment');

var server = new hapi.Server();
server.connection({ port: 3000 });



server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.register(inert, function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function handler(request, reply) {
            reply.file('./public/index.html');
        }
    });
});

var testDateUtc = moment.utc("2015-01-30 10:00:00");
var localDate = moment(testDateUtc).local();

server.route({
    method: 'GET',
    path: '/time',
    handler: function (request, reply) {
        reply(localdate.format("YYYY-MM-DD HH:mm:ss"));
    }
});
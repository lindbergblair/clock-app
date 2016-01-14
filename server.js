var hapi = require('hapi');
var inert = require('inert');
var moment = require('moment-timezone');

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

server.route({
    method: 'GET',
    path: '/time',
    handler: function (request, reply) {
        //reply(moment().tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a'));
        reply.file('./public/time.html');
    }
});

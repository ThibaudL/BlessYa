const WebSocket = require('ws');
const fetch = require('node-fetch');
const key = require('./giphyKey').key;

const wss = new WebSocket.Server({port: 9000});
const express = require('express'),
    app = express(),
    port = 9001;

wss.on('connection', function connection(ws) {
    console.log('connection');
    ws.on('message', function incoming(message) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=' + key + '&tag=sneez')
            .then((res) => res.json())
            .then((json) => {
                console.log(json.data.image_url)
                ws.send(json.data.image_url);
            });
    });
    wss.broadcast = function broadcast(res) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                fetch('http://api.giphy.com/v1/gifs/random?api_key=' + key + '&tag=sneez')
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json.data.image_url);
                        client.send(json.data.image_url);
                    });
            }
        });
        res.send('OK');
    };

});

app.listen(port);
app.route('/reload')
    .get((req, res) => {
        wss.broadcast(res);
    });

const Room = require('../models/room');
let request = require('request');
require('dotenv').config();

module.exports = (app) => {
    app.post('/updateCreatorAccessToken', (req, res) => {

        //Find the room and update it
        Room.findById(req.body.roomId, (err, room) => {
            if (err) {
                console.error(err);
                console.error('(updateCreatorAccessToken) There was an error when trying to find the room');
            }
            if (room) {
                //Update token from server
                let authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                        grant_type: 'refresh_token',
                        refresh_token: room.creator.refreshToken
                    },
                    headers: {
                        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
                    },
                    json: true
                };
                request.post(authOptions, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        //Update room
                        room.creator.accessToken = body.access_token;
                        room.save((err, room) => {
                            if (err) {console.error('(updateCreatorAccessToken) could not save room.');}
                        });
                    }
                    else {
                        console.error('(updateCreatorAccessToken)');
                        console.error(error);
                    }
                });
            }
        });
    });
}
const Room = require('../models/room');
let fetch = require('node-fetch');

module.exports = (app, io) => {
    //When a listener joins a room
    app.post('/joinRoom', async (req, res) => {
        Room.findById(req.body.roomId, async (err, room) => {
            if (err) {
                console.error('(joinRoom) There was an error');
            }
            else {
                if (room) {
                    let infoRes = await fetch('https://api.spotify.com/v1/me', {
                        headers: { 'Authorization': 'Bearer ' + req.body.accessToken }
                    });
                    let infoResJSON = await infoRes.json();

                    let pictureSrc = infoResJSON.images.length > 0 ?
                        infoResJSON.images[0].url : '../defaultPerson.png';

                    if (infoResJSON) {
                        let newListener = {
                            name: infoResJSON.display_name ? infoResJSON.display_name : 'Listener',
                            spotifyURI: infoResJSON.uri,
                            pictureSrc: pictureSrc,
                            refreshToken: req.body.refreshToken
                        }
                        //1. Add the new listener to the room
                        room.roomListeners.push(newListener);
                        //2. Save the room
                        room.save((err, room) => {
                            if (err) {
                                console.log('(joinRoom)' + err);
                            }
                            else {
                                //3. Tell the current listeners about the new one
                                io.sockets.in(req.body.roomId).emit('newListeners', room.roomListeners);
                                //4. Send a response back
                                res.json({ success: true });
                            }
                        });
                    }
                }
                else {
                    res.json({ success: false });
                }
            }
        });
    });
}


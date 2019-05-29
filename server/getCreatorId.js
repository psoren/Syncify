const Room = require('../models/room');

module.exports = (app) => {
    app.post('/getCreatorId', function (req, res, next) {
        Room.findById(req.body.roomId, (err, room) => {
            if (err) {
                console.error('(getCreatorId) There was an error');
                console.error(err);
            }
            else {
                if (room) {
                    res.json({
                        success: true,
                        name: room.creator.name,
                        creatorId: room.creator.spotifyURI,
                        accessToken: room.creator.accessToken,
                        pictureSrc: room.creator.pictureSrc,
                        listeners: room.roomListeners
                    });
                }
                else {
                    res.json({ success: false });
                    console.log('(getCreatorId) Error finding room');
                }
            }
        });
    });
}
const Room = require('../models/room');

module.exports = (app) => {
    //When a listener joins a room
    app.get('/getRooms', async (req, res) => {
        //Find all rooms
        Room.find({}, function (err, rooms) {
            if (err) {
                res.json({ rooms: [] });
            }
            else {
                if (rooms && rooms.length === 0) {
                    res.json({ rooms: [] });
                }
                else {
                    res.json({ rooms: rooms });
                }
            }
        });
    });
}


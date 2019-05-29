const Room = require('../models/room');

module.exports = (app) => {
    app.post('/addToQueue', (req, res) => {
        //The type of request (song, playlist, songs)
        let type = req.body.type;

        //The data to be added
        let data = req.body.data;

        //Find the room and update it
        Room.findById(req.body.roomId, (err, room) => {
            if (err) {
                console.error(err);
                console.error('(addToQueue) Could not find the room.');
            }
            if (room) {
                if (type === 'song') {
                    if (room.currentSong.spotifyURI === data.spotifyURI) {
                        res.json({
                            success: false,
                            message: 'A song can only be added once'
                        });
                    }
                    else {
                        let songAlreadyAdded = false;
                        room.upcomingSongs.forEach(song => {
                            if (song.spotifyURI === data.spotifyURI) {
                                songAlreadyAdded = true;
                            }
                        });
                        if (songAlreadyAdded) {
                            res.json({
                                success: false,
                                message: 'A song can only be added once'
                            });
                        }
                        else {
                            //Play the song later
                            if(req.body.shouldAppend){
                                room.upcomingSongs.push(data);
                            }
                            //Play the song now
                            //Performance may be impacted here since we are adding
                            //to the beginning of an array
                            else {
                                room.upcomingSongs.unshift(data);
                            }
                            room.save((err, room) => {
                                if (err) {
                                    console.error('(addToQueue) saving room');
                                    console.error(err);
                                }
                                else {
                                    if (room) {
                                        res.json({
                                            success: true,
                                            nextSongs: room.upcomingSongs
                                        });
                                    }
                                } 
                            });
                        }
                    }
                }
                else if (type === 'songs') {
                    let songs = [];
                    data.forEach(songObject => {
                        /*
                        Currently, the songs we are getting from the client are saved in the form
                        { title, artist, album, imgSrc, uri}
                        They need to be in the form
                         {name, artist, album, spotifyURI, albumArtSrc}
                         */
                        let newSong = {
                            name: songObject.props.title,
                            artist: songObject.props.artist,
                            album: songObject.props.album,
                            spotifyURI: songObject.props.uri,
                            albumArtSrc: songObject.props.imgSrc
                        }
                        songs.push(newSong);
                    });

                    //If we should append the songs to the queue
                    if(req.body.shouldAppend){
                        room.upcomingSongs = room.upcomingSongs.concat(songs);
                    }
                    //If we should play the songs next
                    else {
                        room.upcomingSongs = songs.concat(room.upcomingSongs);
                    }
                    room.save((err, room) => {
                        if (err) {
                            console.error('(addToQueue) playlistSaveError: ' + err);
                            res.json({
                                success: false,
                                message: 'Sorry, we could not add play that playlist'
                            });
                        }
                        if (room) {
                            res.json({
                                success: true,
                                nextSongs: room.upcomingSongs,
                                message: ''
                            });
                        }
                    });
                }             
                //They did not specify the correct type, send an error
                else {
                    res.json({
                        success: false,
                        message: 'Not the correct data type'
                    });
                }
            }
        });
    });
}
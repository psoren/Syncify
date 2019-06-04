import React from 'react';
import CurrentRoom from './CurrentRoom';
import './currentRooms.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentRooms: [] };
    }

    componentWillReceiveProps = async (nextProps) => {
        let newRooms = [];
        if (nextProps.currentRooms && nextProps.currentRooms.rooms) {
            nextProps.currentRooms.rooms.forEach(room => {
                let newRoom = <CurrentRoom
                    photo={room.currentSong.albumArtSrc}
                    song={room.currentSong.name}
                    artist={room.currentSong.artist}
                    creator={room.creator.name}
                    roomName={room.name}
                    key={room._id}
                    roomId={room._id}
                />
                newRooms.push(newRoom);
            });
        }
        this.setState({ currentRooms: newRooms });
    }

    render() {
        return (
            <div className='currentRoomsOuter'>
                <h2 className='currentRoomsTitle'>
                    Now Playing
                </h2>
                <div className='rooms'>
                    {this.state.currentRooms.length > 0 ?
                        this.state.currentRooms :
                        <div className='noRoomsOuter'>
                            <p className='noRoom'>
                                There are no rooms playing right now.
                            </p>
                            <p className='noRoom'>
                                Click Create to get started.
                             </p>
                        </div>}
                </div>
            </div>
        );
    }
}
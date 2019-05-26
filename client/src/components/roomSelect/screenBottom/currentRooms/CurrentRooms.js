import React from 'react';
import CurrentRoom from './CurrentRoom';

const h2style = {
    borderBottom: '3px solid white',
    font: 'bold 32px "helvetica neue", helvetica, arial, sans-serif',
    color: 'white',
    textAlign: 'center'
}

const noRoomsStyle = {
    font: 'bold 28px "helvetica neue", helvetica, arial, sans-serif',
    color: 'white',
    textAlign: 'center',
    paddingLeft: '25px',
    paddingRight: '25px',
    maxWidth: '200px'
}

const divStyle = {
    height: '400px',
    overflow: 'auto'
}

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
        let comp;

        //If there is at least one room playing
        if (this.state.currentRooms.length > 0) {
            comp = this.state.currentRooms;
        }
        else {
            comp =
                <React.Fragment>
                    <div style={noRoomsStyle}>
                        There are no rooms playing right now.
                    </div>
                    <br />
                    <div style={noRoomsStyle}>
                        Click Create to get started.
                     </div>
                </React.Fragment>
        }

        return (
            <div>
                <h2 style={h2style}>Now Playing</h2>
                <div style={divStyle}>
                    {comp}
                </div>
            </div>
        );
    }
}
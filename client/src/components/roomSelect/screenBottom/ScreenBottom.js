import React from 'react';
import CreateButton from './createButton/CreateButton';
import JoinButton from './joinButton/JoinButton';
import CurrentRooms from './currentRooms/CurrentRooms';

const mainStyle = {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '75px',
    justifyContent: 'space-around'
}

export default class extends React.Component {

    render() {
        return (
            <div style={mainStyle}
                onClick={this.onClick}>
                <CreateButton />
                <CurrentRooms currentRooms={this.props.currentRooms} />
                <JoinButton />
            </div>
        );
    }
}
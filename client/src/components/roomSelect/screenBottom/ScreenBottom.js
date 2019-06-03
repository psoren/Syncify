import React from 'react';
import CreateButton from './createButton/CreateButton';
import JoinButton from './joinButton/JoinButton';
import CurrentRooms from './currentRooms/CurrentRooms';
import './screenBottom.scss';

export default (props) => (
    <div className='screenBottomMain'>
        <CreateButton />
        <CurrentRooms currentRooms={props.currentRooms} />
        <JoinButton />
    </div>
);
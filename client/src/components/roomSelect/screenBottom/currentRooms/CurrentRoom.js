import React from 'react';
import JoinCurrentRoomButton from './JoinCurrentRoomBtn';
import './currentRoom.scss';

export default (props) => (
    <div className='currentRoomOuterMain'>
        <h2 className='currentRoomTitle'>{props.roomName}</h2>
        <div className='currentRoomLowerMain'>
            <div className='currentRoomInnerLeft'>
                <img
                    src={props.photo}
                    className='currentRoomImg'
                    alt="Room"
                />
                <p className='currentRoomCreator'>
                    {props.creator.split(' ')[0]}
                </p>
            </div>
            <div className='currentRoomInnerMiddle'>
                {props.song}
                <hr className='currentRoomInnerMiddleHr' />
                {props.artist}
            </div>
            <JoinCurrentRoomButton
                roomId={props.roomId}
                onClick={props.onClick}
            />
        </div>
    </div>
);

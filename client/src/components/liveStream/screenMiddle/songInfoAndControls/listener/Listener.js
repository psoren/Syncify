import React from 'react';
import './listener.scss';

export default (props) => (
    <div
        className='listenerOuter'
        key={props.i}>
        <img
            src={props.imgSrc}
            className='listenerImg'
            alt='Profile Picture' >
        </img>
        <p>
            {props.firstName}
        </p>
    </div>
);
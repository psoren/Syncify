import React from 'react';
import './createButton.scss';

export default (props) => (
    <button
        className='createButton'
        style={props.style}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseOut={props.onMouseOut}>
        Create
    </button>
);
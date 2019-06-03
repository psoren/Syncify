import React from 'react';
import { Link } from 'react-router-dom'
import './homeButton.scss';

export default (props) => (<Link
	to="/roomselect"
	className='homeButton'>
	Home</Link>
);
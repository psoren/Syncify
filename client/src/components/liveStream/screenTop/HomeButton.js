import React from 'react';
import { Link } from 'react-router-dom'
import './homeButton.scss';

export default () => (<Link
	to="/roomselect"
	className='homeButton'>
	Home</Link>
);
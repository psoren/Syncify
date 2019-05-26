import React from 'react';
import { Link } from 'react-router-dom'
import 'styling/styles.scss';

const unclickedStyle = {
	font: '20px arial, sans-serif',
	borderRadius: '1em',
	color: '#fff',
	background: '#2e3192',
	padding: '0.7em 1.5em',
	width: '5em',
	border: '1px solid white'
}

const clickedStyle = {
	...unclickedStyle,
	background: '#00005F'
}

export default class extends React.Component {

	constructor(props){
		super(props);
		this.state = {style: unclickedStyle}
	}

	onMouseDown = () => this.setState({style: clickedStyle});
	onMouseOut = () => this.setState({style: unclickedStyle});

	render(){
		return (
			<Link 
			to="/roomselect" 
			className='btn'
			onMouseDown={this.onMouseDown}
			onMouseOut={this.onMouseOut}
			style={this.state.style}>
			Home </Link>
		);
	}
}
import React from 'react';
import LoginButton from './LoginButton.js';

const centerStyle = {
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center'
}

const child1 = {
	display: 'inline-block',
	color: '#fff',
	font: 'bold 5.5vw "helvetica neue"',
	padding: '25px 0 25px 0'
}

const child2 = {
	display: 'inline-block',
	color: '#fff',
	font: 'bold 3.5vw helvetica neue',
	paddingBottom: '15px'
}

const buttonDiv = {
	padding: '25px 0 0 0',
	textAlign: 'center'
}

const hrStyle = {
	color: '#fff',
	border: '2px solid white',
	margin: '25px 50px 0 50px'
}

const top = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
}

const logoStyle = {
	position: 'relative',
	left: '10px',
	top: '50px',
	color: 'white',
	font: 'bold 48px "helvetica neue", helvetica, arial, sans-serif',
	paddingLeft: '25px'
}

const spotifyStyle = {
	height: '100px',
	width: '100px',
	paddingRight: '25px',
	paddingTop: '25px'
}

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div style={top}>
					<div style={logoStyle}>Syncify</div>
					<img style={spotifyStyle} src='./SpotifyGreen.png' alt='Spotify Logo' />
				</div>

				<div style={centerStyle}>
					<hr style={hrStyle} />
					<div style={child1}>Listen to songs with your friends</div>
					<div style={child2}>Login to your Spotify account to begin</div>
					<div style={buttonDiv}><LoginButton /></div>
				</div>
			</React.Fragment>
		)
	}
}
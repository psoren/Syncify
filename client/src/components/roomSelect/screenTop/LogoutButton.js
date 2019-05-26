import React from 'react';
import { NavLink } from 'react-router-dom';

const style = {
	font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif',
	borderRadius: '3em',
	background: '#2e3192',
	color: 'white',
	width: '7em',
	height: '3em',
	border: '1px solid white',
	outline: '0',
	position: 'relative',
	left: '10px',
	top: '10px',
	padding: '1em'
}

export default class extends React.Component {

	submit = () => {
		localStorage.removeItem('name');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		const url = 'https://www.spotify.com/logout/';
		const spotifyLogoutWindow = window.open(url, 'Spotify Logout',
			'width=400,height=300,top=80,left=80');
		setTimeout(() => spotifyLogoutWindow.close(), 1000);
	}

	render() {
		return (
			<NavLink
				to='login'
				style={style}
				onClick={this.submit}
				onMouseDown={() => this.setState({ background: '#10AC47' })}
				onMouseUp={() => this.setState({ background: '#43DF7A' })}
				onMouseOut={() => this.setState({ background: '#43DF7A' })}>
				LOG OUT
			</NavLink>
		)
	}
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import './logoutButton.scss';

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
				className='logout'
				onClick={this.submit}>
				LOG OUT
			</NavLink>
		)
	}
}

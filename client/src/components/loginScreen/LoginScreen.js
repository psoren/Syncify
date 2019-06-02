import React from 'react';
import LoginButton from './LoginButton.js';
import './login.scss';

export default class extends React.Component {
	render() {
		return (
			<div >
				<div className='top'>
					<div className='syncify'>Syncify</div>
					<img
						className='spotifyLogo'
						src='./SpotifyGreen.png'
						alt='Spotify Logo'
					/>
				</div>
				<div className='loginBottom'>
					<hr className='loginHr' />
					<p
						className='child1'>
						Listen to songs with your friends
					</p>
					<p className='child2'>
						Login to your Spotify account to begin
					</p>
					<LoginButton />
				</div>
			</div >
		);
	}
}
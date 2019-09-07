import React from 'react';
import LoginButton from './LoginButton.js';
import './login.scss';

export default () => (
	<div >
		<div className='top'>
			<div className='syncify'>Octave</div>
			<img
				className='spotifyLogo'
				src='./SpotifyGreen.png'
				alt='Spotify Logo'
			/>
		</div>
		<div className='loginBottom'>
			<hr className='loginHr' />
			<p className='child1'>Listen to songs with your friends</p>
			<p className='child2'>Login to your Spotify account to begin</p>
			<LoginButton />
			<div className='appStoreOuter'>
				<div className='appStoreCtoA'>We are now on the App Store!</div>
				<div className='appStoreInner'>
					<a href="https://apps.apple.com/us/app/octave-music/id1477676061?ls=1">
						<img
							className='octaveLogo'
							src='/octaveLogo.png'
						/>
					</a>
					<a href="https://apps.apple.com/us/app/octave-music/id1477676061?ls=1">
						<img
							className='appStore'
							src='/appStore.svg'
							href="https://apps.apple.com/us/app/octave-music/id1477676061?ls=1"
						/>
					</a>
				</div>
			</div>

		</div>
	</div >
);
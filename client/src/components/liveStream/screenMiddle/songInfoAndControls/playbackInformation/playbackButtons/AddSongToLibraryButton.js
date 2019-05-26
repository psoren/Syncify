import React from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';

const buttonStyle = {
	display: 'inline-block',
	width: '24px',
	height: '24px',
	background: 'url(../plus.svg)',
	backgroundSize: '100% 100%',
	border: 'none',
	margin: '4px 4px',
	outline: '0'
}

export default class extends React.Component {
	onClick = async () => {
		//1. Get current playback
		let currentPlaybacRes = await fetch('https://api.spotify.com/v1/me/player', {
			headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
		});
		let currentPlaybacResJSON = await currentPlaybacRes.json();

		if (currentPlaybacResJSON) {
			//2. Save current song
			await fetch('https://api.spotify.com/v1/me/tracks', {
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: [currentPlaybacResJSON.item.id] })
			});
			let song = currentPlaybacResJSON.item.name;
			let artists = '';
            currentPlaybacResJSON.item.artists.forEach((artist, i) => {
                i === 0 ? artists += artist.name :
				artists += ', ' + artist.name;
            });
			toaster.notify('Added ' + song + ' by ' + artists + ' to your library', { duration: 2000 });
		}
	}

	render() {
		return (<button 
			onClick={this.onClick} 
			className='btn'
			style={buttonStyle}></button>);
	}
}

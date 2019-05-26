import SongAlbum from './SongAlbum';
import SongArtist from './SongArtist.js';
import SongName from './SongName.js';
import React from 'react';

const dStyle = {
	float: 'left'
}

export default class CurrentSongInfo extends React.Component {

	render() {

		let currentSongName;
		let currentSongArtist;
		let currentSongAlbum;
		if(this.props.playbackInfo){
			currentSongName = this.props.playbackInfo.currentSongName;
			currentSongArtist = this.props.playbackInfo.currentSongArtist;
			currentSongAlbum = this.props.playbackInfo.currentSongAlbum;
		}
		else{
			currentSongName = '';
			currentSongArtist = '';
			currentSongAlbum = '';
		}

		return (
			<div style={dStyle}>
				<SongName name={currentSongName}/>
				<SongArtist name={currentSongArtist}/>
				<SongAlbum name={currentSongAlbum} />
			</div>
		);
	}
}

import React from 'react';
import AlbumArt from './albumArt/AlbumArt.js';
import SongInfoAndControls from './songInfoAndControls/SongInfoAndControls.js';

const outerStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	padding: '10px'
}

export default class extends React.Component {
	render() {
		return (
			<div style={outerStyle}>
				<AlbumArt albumArt={this.props.albumArt}/>
				<SongInfoAndControls 
				playbackInfo={this.props.playbackInfo}
				isCreator={this.props.isCreator}
				player={this.props.player}
				upNext={this.props.upNext}
				listeners={this.props.listeners}/>
			</div>
		)
	}
}

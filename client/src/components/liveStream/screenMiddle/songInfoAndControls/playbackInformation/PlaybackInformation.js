import React from 'react';
import CurrentSongInfo from './currentSongInfo/CurrentSongInfo.js'
import PlaybackButtons from './playbackButtons/PlaybackButtons.js'

const outerStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center'
}

export default class extends React.Component {
	render() {
		let isPlaying = this.props.playbackInfo ?
			this.props.playbackInfo.isPlaying : false;

		return (
			<div style={outerStyle}>
				<PlaybackButtons
					isPlaying={isPlaying}
					player={this.props.player}
					isCreator={this.props.isCreator}
				/>
				<CurrentSongInfo playbackInfo={this.props.playbackInfo} />
			</div>
		);
	}
}

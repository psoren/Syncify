import React from 'react'
import Listeners from './listener/Listeners';
import PlaybackInformation from './playbackInformation/PlaybackInformation.js'
import UpNextSongs from './upNext/UpNextSongs';

const outerStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around',
	maxHeight: '350px',
	paddingTop: '10px',
}

export default class extends React.Component {
	render() {
		return (
			<div style={outerStyle}>
				<Listeners listeners={this.props.listeners} />
				<div>
					<PlaybackInformation
						playbackInfo={this.props.playbackInfo}
						isCreator={this.props.isCreator}
						player={this.props.player}
					/>
				</div>
				<UpNextSongs upNext={this.props.upNext} />
			</div>
		);
	}
}

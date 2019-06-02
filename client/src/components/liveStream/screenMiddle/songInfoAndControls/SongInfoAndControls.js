import React from 'react'
import Listeners from './listener/Listeners';
import PlaybackInformation from './playbackInformation/PlaybackInformation.js'
import UpNextSongs from './upNext/UpNextSongs';
import './songInfoAndControls.scss';

export default class extends React.Component {
	render() {
		return (
			<div className='songInfoOuter'>
				<Listeners
					listeners={this.props.listeners}
				/>
				<div>
					<PlaybackInformation
						playbackInfo={this.props.playbackInfo}
						isCreator={this.props.isCreator}
						player={this.props.player}
					/>
				</div>
				<UpNextSongs
					upNext={this.props.upNext}
				/>
			</div>
		);
	}
}

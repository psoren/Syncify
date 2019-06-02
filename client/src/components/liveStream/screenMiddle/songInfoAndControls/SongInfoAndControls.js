import React from 'react'
import Listeners from './listener/Listeners';
import PlaybackInformation from './playbackInformation/PlaybackInformation.js'
import UpNextSongs from './upNext/UpNextSongs';
import './songInfoAndControls.scss';

export default (props) => (
	<div className='songInfoOuter'>
		<Listeners listeners={props.listeners} />
		<PlaybackInformation
			playbackInfo={props.playbackInfo}
			isCreator={props.isCreator}
			player={props.player}
		/>
		<UpNextSongs upNext={props.upNext} />
	</div>
);
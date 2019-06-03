import React from 'react';
import AlbumArt from './albumArt/AlbumArt.js';
import SongInfoAndControls from './songInfoAndControls/SongInfoAndControls.js';
import './screenMiddle.scss';

export default (props) => (
	<div className='screenMiddleOuter'>
		<AlbumArt albumArt={props.albumArt} />
		<SongInfoAndControls
			playbackInfo={props.playbackInfo}
			isCreator={props.isCreator}
			player={props.player}
			upNext={props.upNext}
			listeners={props.listeners}
		/>
	</div>
);

import AlbumLeft from './AlbumLeft.js';
import AlbumMiddle from './AlbumMiddle.js';
import AlbumRight from './AlbumRight.js';
import React from 'react';

const outerStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around'
}

export default class extends React.Component {

	render() {

		let albumLeft;
		let albumMiddle;
		let albumRight;
		if(this.props.albumArt){
			albumLeft = this.props.albumArt.albumLeft === '' ? '../notPlaying.jpg' : this.props.albumArt.albumLeft
			albumMiddle = this.props.albumArt.albumMiddle === '' ? '../notPlaying.jpg' : this.props.albumArt.albumMiddle
			albumRight = this.props.albumArt.albumRight === '' ? '../notPlaying.jpg' : this.props.albumArt.albumRight
		}
		else{
			albumLeft = '../notPlaying.jpg';
			albumMiddle = '../notPlaying.jpg';
			albumRight = '../notPlaying.jpg';
		}

		return (
			<div style={outerStyle}>
					<AlbumLeft albumSrc={albumLeft} />
					<AlbumMiddle albumSrc={albumMiddle} />
					<AlbumRight albumSrc={albumRight} />
			</div>
		);
	}
}


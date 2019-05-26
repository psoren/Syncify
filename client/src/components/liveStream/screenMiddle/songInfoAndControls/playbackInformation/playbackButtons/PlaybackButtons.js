import PreviousSongButton from './PreviousSongButton.js';
import AddSongToLibraryButton from './AddSongToLibraryButton.js';
import NextSongButton from './NextSongButton.js';
import TogglePlaybackButton from './TogglePlaybackButton.js';
//import ToggleShuffleButton from './ToggleShuffleButton.js';
import ShareButton from './ShareButton';
import { LiveStreamContext } from '../../../../LiveStream.js';
import React from 'react';

const outerStyle = {
	display: 'flex',
	flexDirection: 'row',
	textAlign: 'center',
	justifyContent: 'center',
	paddingRight: '75px'
}

class PlaybackButtons extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isPlaying: props.context.isPlaying,
			sock: props.context.socket,
			loading: true
		}
	}

	componentWillReceiveProps = (nextProps) => this.setState({
		sock: nextProps.context.socket,
		isPlaying: nextProps.context.isPlaying,
		loading: false
	});

	render() {

		//Only render togglePlayback, previous, and next if the user is the creator
		if (this.props.isCreator) {
			return (
				<div style={outerStyle}>
					<PreviousSongButton socket={this.state.sock} />
					<TogglePlaybackButton socket={this.state.sock}
						isPlaying={this.state.isPlaying} />
					<NextSongButton socket={this.state.sock} />
					<ShareButton />
					<AddSongToLibraryButton />
				</div>
			);
		}
		else {
			return (
				<div style={outerStyle}>
					<ShareButton />
					<AddSongToLibraryButton />
				</div>
			);
		}
	}
}

export default props => (
	<LiveStreamContext.Consumer>
		{context => { return <PlaybackButtons {...props} context={context} /> }}
	</LiveStreamContext.Consumer>
);
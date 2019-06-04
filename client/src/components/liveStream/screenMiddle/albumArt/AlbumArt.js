import React from 'react';
import { LiveStreamContext } from '../../LiveStream';
import './albums.scss';

class AlbumArt extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isPlaying: true };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isPlaying !== this.state.isPlaying) {
			this.setState({ isPlaying: !this.state.isPlaying });
		}
	}

	render() {
		return (
			<div className='albumsOuter'>
				<img className='side' src={this.props.albumArt.albumLeft ?
					this.props.albumArt.albumLeft : '../notPlaying.jpg'}
					alt='Left Album'
				/>
				<div className='middleContainer'>
					<img className='middleImg'
						src={this.props.albumArt.albumMiddle ?
							this.props.albumArt.albumMiddle : '../notPlaying.jpg'}
						alt='Middle Album'
					/>
					{this.state.isPlaying ?
						<img className='middlePaused'
							src='liveStreamPause.svg'
							alt='Paused'
						/> : null}
					{this.state.isPlaying ?
						<div className='middleGrayBackground'
						/> : null}
				</div>
				<img className='side' src={this.props.albumArt.albumRight ?
					this.props.albumArt.albumRight : '../notPlaying.jpg'}
					alt='Right Album'
				/>
			</div>
		);
	}

}

export default props => (<LiveStreamContext.Consumer>
	{context => { return <AlbumArt {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
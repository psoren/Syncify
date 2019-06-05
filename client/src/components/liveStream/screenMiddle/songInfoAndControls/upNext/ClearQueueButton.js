import React from 'react';
import { LiveStreamContext } from 'components/liveStream/LiveStream';
import './clearQueueButton.scss';

class ClearQueueButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isCreator: false };
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.context.socket) {
			this.setState({
				socket: nextProps.context.socket,
				isCreator: nextProps.isCreator
			});
		}
	}

	clearQueue = () => {
		if (this.state.socket && this.state.isCreator) {
			let currentURL = new URL(window.location.href);
			this.state.socket.emit('clearQueue',
				currentURL.searchParams.get('roomId'));
		}
	}

	render() {
		return (
			<button
				onClick={this.clearQueue}
				style={{ background: 'url(clear.svg)' }}
				className='clearQueueBtn'>
			</button>
		);
	}
}

export default props => (<LiveStreamContext.Consumer>
	{context => { return <ClearQueueButton {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
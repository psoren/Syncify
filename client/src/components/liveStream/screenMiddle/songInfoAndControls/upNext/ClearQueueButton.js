import React from 'react';
import { LiveStreamContext } from 'components/liveStream/LiveStream';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='confirmDialogMain'>
						<h1 className='confirmDialogPrompt'
						>Are you sure you want to remove all upcoming songs?</h1>
						<div className='confirmDialogInner'>
							<button
								className='confirmDialogBtn'
								onClick={onClose}>No</button>
							<button
								className='confirmDialogBtn'
								onClick={() => {
									if (this.state.socket && this.state.isCreator) {
										let currentURL = new URL(window.location.href);
										this.state.socket.emit('clearQueue',
											currentURL.searchParams.get('roomId'));
									}
									onClose();
								}}>
								Yes
							  </button >
						</div>
					</div>
				);
			}
		});
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
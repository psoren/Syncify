import React from 'react';
import { LiveStreamContext } from '../LiveStream';
import './roomName.scss';

class RoomName extends React.Component {
	render() {
		return (
			<form
				onSubmit={this.handleSubmit}
				className='roomNameForm'
			>
				<input
					ref={this.myRef}
					className={this.state.focused ?
						'roomNameInputFocus' :
						'roomNameInputBlur'}
					type="text"
					onFocus={this.inputBlur}
					onBlur={this.inputFocus}
					value={this.state.name}
					onChange={this.handleChange}
					autoComplete="off"
					autoCorrect="off"
					autcapitalize="off"
					spellCheck="false">
				</input>
			</form>
		);
	}

	inputFocus = () => this.setState({ focused: true });
	inputBlur = () => this.setState({ focused: false });

	constructor(props) {
		super(props);
		this.state = {
			name: props.roomName,
			focused: true,
			userIsEditing: false,
			loading: true,
			socket: props.context.socket
		}
		this.myRef = React.createRef();
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.context.socket) {
			this.setState({
				socket: nextProps.context.socket,
				loading: false
			});
		}
		if (!this.state.userIsEditing) {
			this.setState({ name: nextProps.roomName });
		}
	}

	handleChange = (e) => this.setState({
		userIsEditing: true,
		name: e.target.value
	});

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ userIsEditing: false });
		let currentURL = new URL(window.location.href);
		this.state.socket.emit('changeRoomName', {
			roomId: currentURL.searchParams.get('roomId'),
			newRoomName: this.state.name
		});
		this.myRef.current.blur();
	}
}

export default props => (<LiveStreamContext.Consumer>
	{context => { return <RoomName {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
import React from 'react';
import { LiveStreamContext } from '../LiveStream';

const formStyle = {
	textAlign: 'center'
}

const blurStyle = {
	width: '60%',
	textAlign: 'center',
	background: 'transparent',
	color: '#fff',
	border: 'none',
	borderBottom: '3px solid #fff',
	display: 'inline-block',
	margin: '0',
	fontSize: '50px',
	outline: '0',
	marginBottom: '5px',
	cursor: 'pointer',
	paddingTop: '25px'
}

const focusStyle = {
	...blurStyle,
	width: '90%',
	borderBottom: '5px solid #fff',
	marginBottom: '3px',
}

class RoomName extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.roomName,
			style: blurStyle,
			userIsEditing: false,
			loading: true,
			socket: props.context.socket,
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

		//blur when user is done editing
		this.myRef.current.blur();
	}

	inputFocus = () => this.setState({ style: focusStyle });
	inputBlur = () => this.setState({ style: blurStyle, userIsEditing: false });

	render() {
		return (
			<form onSubmit={this.handleSubmit} style={formStyle} >
				<input
					ref={this.myRef}
					style={this.state.style}
					type="text"
					onFocus={this.inputFocus}
					onBlur={this.inputBlur}
					value={this.state.name}
					onChange={this.handleChange}
					autoComplete="off"
					autoCorrect="off"
					autcapitalize="off"
					spellCheck="false">
				</input>
			</form>
		)
	}
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <RoomName {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
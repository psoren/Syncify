import React from 'react';
import querystring from 'querystring';
import './login.scss';
require('dotenv').config();

const generateRandomString = function (length) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export default class extends React.Component {

	constructor() {
		super();
		this.state = {
			font: 'bold 20px "helvetica neue", helvetica, arial, sans-serif',
			borderRadius: '4em',
			color: 'white',
			padding: '0.7em 1.5em',
			width: '9em',
			border: '1px solid #00C292',
			outline: '0'
		}
	}

	render() {
		//let redirect_uri = 'https://syncify33.herokuapp.com/roomselect';
		let redirect_uri = 'http://localhost:3000/roomselect';
		let client_id = 'd76ab0506f804a148cd10e9671f0aab7';
		let scope = 'user-read-private user-read-email user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-birthdate streaming user-library-read playlist-read-private user-library-modify user-read-recently-played';

		console.log(redirect_uri);

		const link = 'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: generateRandomString(16)
			});

		return (
			<a href={link}
				style={this.state}
				className='loginBtn'
				onMouseDown={() => this.setState({ background: '#10AC47' })}
				onMouseUp={() => this.setState({ background: '#43DF7A' })}
				onMouseOut={() => this.setState({ background: '#43DF7A' })}>
				LOGIN
				</a>
		);
	}
}
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
		this.state = {};
	}

	render() {
		let dev = process.env.NODE_ENV === 'development';
		let redirect_uri = dev ?
			'http://localhost:3000/roomselect' :
			'https://octavemusic.herokuapp.com/roomselect';

		let client_id = 'd76ab0506f804a148cd10e9671f0aab7';
		let scope = 'user-read-private user-read-email user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-birthdate streaming user-library-read playlist-read-private user-library-modify user-read-recently-played user-top-read';

		const link = 'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: generateRandomString(16)
			});

		return (
			<a
				href={link}
				style={this.state}
				className='loginBtn'>
				Login
				</a>
		);
	}
}
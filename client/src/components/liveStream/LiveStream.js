import React from 'react';
import { Redirect } from 'react-router-dom'
import socketIOClient from 'socket.io-client';
import ScreenTop from './screenTop/ScreenTop.js'
import ScreenMiddle from './screenMiddle/ScreenMiddle.js'
import ScreenBottom from './screenBottom/ScreenBottom.js'
import 'styling/styles.scss';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

//Function imports
import updateTokens from './functions/updateTokens.js';
import updateCreatorAccessToken from './functions/updateCreatorAccessToken.js';
import checkIfCreator from './functions/checkIfCreator.js';
import setInitialPlayback from './functions/setInitialPlayback.js';

let mainStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '0px',
	margin: '0px',
	position: 'relative',
	top: '-100px',
	maxHeight: '25px'
}

let bottomStyle = {
	maxWidth: '50%',
	padding: '0px',
	margin: '0px',
	paddingBottom: '100px',
	maxHeight: '25px'
}

export const LiveStreamContext = React.createContext();

export default class extends React.Component {

	constructor(props) {
		super(props);
		let currentURL = new URL(window.location.href);
		let roomId = currentURL.searchParams.get('roomId');
		localStorage.setItem('roomId', roomId);

		this.state = {
			roomName: '',
			percentDone: 0,
			albumArt: {
				albumLeft: '',
				albumMiddle: '',
				albumRight: ''
			},
			listeners: [],
			upNext: [],
			playbackInfo: {
				isPlaying: false,
				currentSongName: '',
				currentSongArtist: '',
				currentSongAlbum: ''
			},
			currentSongURI: '',
			isCreator: false,
			loading: true,
			currentSongDone: false,
			isPlaying: true,
			nextSongRequested: false,
			roomDeleted: false
		};
	}

	async componentDidMount() {
		//1. Make sure that tokens are being refreshed
		await updateTokens();
		let refreshInterval = 1000 * 60 * 5;
		this.refreshTokenIntervalId = setInterval(updateTokens, refreshInterval);

		//2. Check if the user is the creator
		let userIsCreator = await checkIfCreator();
		this.setState({ isCreator: userIsCreator });
		if (userIsCreator) {
			this.updateCreatorAccessTokenIntervalId = setInterval(updateCreatorAccessToken, refreshInterval);
			this.sendCurrentTimeId = setInterval(this.sendCurrentTime, 1000);
		}
		this.checkForRoomId = setInterval(this.checkForRoom, 5000);

		//Display a message welcoming the user to the room
		await this.showWelcomeMessage();

		//3. If we are coming straight from the RoomSelect screen,
		//set this.state.player to be the player that already was created
		//If not, create a new player
		//Also, setup the setInterval method for checking the percentDone of the song
		if (this.props.player) {
			this.setState({ player: this.props.player });
			let playbackInfo = await setInitialPlayback(this.state.isCreator);
			this.updateState(playbackInfo);
			this.state.player.on('player_state_changed', state => this.playbackStateChange(state));
			this.updateSongProgress();
			this.connectToSocket();
		}
		//If we are not coming from the RoomSelect screen, we need to initialize the player
		else {
			const script = document.createElement("script");
			document.head.appendChild(script);
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.onload = this.createPlayer();
			this.connectToSocket();
		}

		//Finally, set up the listener for the unload event
		this.setupBeforeUnloadListener();
	}

	//If the user closes the browser, need to emit leaveRoom
	setupBeforeUnloadListener = () => {
		window.addEventListener('beforeunload', (e) => {
			e.preventDefault();

			if (this.socket) {
				this.socket.emit('leaveRoom', {
					name: localStorage.getItem('name').split(' ')[0],
					roomId: localStorage.getItem('roomId'),
					isCreator: this.state.isCreator,
					accessToken: localStorage.getItem('accessToken'),
					refreshToken: localStorage.getItem('refreshToken')
				});
				this.socket.disconnect();
			}
		});
	}

	showWelcomeMessage = async () => {
		let currentURL = new URL(window.location.href);
		let roomId = currentURL.searchParams.get('roomId');
		let playbackInfoRes = await fetch('/getPlaybackInfo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ roomId: roomId })
		});
		let playbackInfoResJSON = await playbackInfoRes.json();
		let message = '';
		if (this.state.isCreator) {
			message = 'You have created the room ' + playbackInfoResJSON.name +
				'.  Your room id is ' + roomId +
				'.  Share this code with your friends to have them join this room.';
		}
		else {
			message = 'Welcome to the room ' + playbackInfoResJSON.name +
				'.  Your room id is ' + roomId +
				'.  Share this code with your friends to have them join this room.';
		}
		toaster.notify(message, { duration: 4000 });
	}

	//Send the current time to the server
	sendCurrentTime = () => {
		let today = new Date();
		if (this.socket) {
			let currentURL = new URL(window.location.href);
			this.socket.emit('sendTime', {
				roomId: currentURL.searchParams.get('roomId'),
				date: today
			});
		}
	}

	//Check to make sure the room exists every 5 seconds
	checkForRoom = async () => {
		let currentURL = new URL(window.location.href);
		let roomId = currentURL.searchParams.get('roomId');
		let checkForRoomRes = await fetch('/checkForRoom', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ roomId: roomId })
		});
		let checkForRoomResJSON = await checkForRoomRes.json();

		//Tell the user that the room does not exist any more
		if (!checkForRoomResJSON.exists) {
			alert('Sorry, the room with id ' + roomId + ' no longer exists.');
			this.setState({ roomDeleted: true });
		}
	}

	connectToSocket = () => {
		let currentURL = new URL(window.location.href);
		let roomId = currentURL.searchParams.get('roomId');
		this.socket = socketIOClient('/');

		this.socket.on('connect', () => {
			if (this.state.isCreator) {
				this.socket.emit('createRoom', roomId);
			}
			else {
				let name = localStorage.getItem('name');
				let firstName = name.split(' ')[0];
				this.socket.emit('joinRoom', {
					roomId: roomId,
					name: firstName
				});
			}
		});

		this.socket.on('updatePlayback', (newPlaybackInfo) => this.updateState(newPlaybackInfo));

		this.socket.on('newRoomInfo', data => {
			//If the song was added by a Spotify recommendation
			if (data.user === 'Syncify') {
				let message = 'Syncify added ' + data.currentSong.name + ' by ' + data.currentSong.artist +
					" based on what you've been listening to.";
				toaster.notify(message, { duration: 4000 });
			}
			this.playNewSong(data);
		});

		this.socket.on('listenerJoined', (name) =>
			toaster.notify(name + ' has joined the room.', { duration: 4000 }));

		this.socket.on('updateRoomName', name => this.setState({ roomName: name }));

		this.socket.on('updateSongs', (data) => {
			let upcomingSongs = data.upcomingSongs;
			this.setState({ upNext: upcomingSongs });
			if (upcomingSongs[0].albumArtSrc) {
				this.setState({
					albumArt: {
						...this.state.albumArt,
						albumRight: upcomingSongs[0].albumArtSrc
					}
				});
			}
		});

		this.socket.on('togglePlayback', async (newIsPlaying) => {
			//Play or pause based on what the creator is doing
			let endpoint = newIsPlaying ? 'pause' : 'play';
			this.setState({ isPlaying: !newIsPlaying });
			await fetch('https://api.spotify.com/v1/me/player/' + endpoint, {
				method: 'PUT',
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
			});
		});

		this.socket.on('newListeners', listeners => this.setState({ listeners: listeners }));
		this.socket.on('alertNewInfo', message => toaster.notify(message, { duration: 4000 }));
		this.socket.on('listenerLeft', data => {
			//Update list
			this.setState({ listeners: data.listeners });
			//Notification
			toaster.notify(data.name + ' has left the room.', { duration: 3000 })
		});

		this.socket.on('creatorLeft', newRoomData => {

			//If we are now the creator
			if (newRoomData.creator.refreshToken === localStorage.getItem('refreshToken')) {
				this.setState({ isCreator: true });
				this.sendCurrentTimeId = setInterval(this.sendCurrentTime, 1000);
				this.setState({ listeners: newRoomData.roomListeners });
				toaster.notify('You are now the creator of this room.  You can now control playback', { duration: 3000 })
			}

			//Someone else was promoted to creator
			else {
				let creatorName = newRoomData.creator.name.split(' ')[0];
				toaster.notify(creatorName + ' is now the creator of this room.  They can control playback now.',
					{ duration: 3000 });
			}
		});
	}

	playNewSong = async (roomInfo) => {
		//Start playing new song
		await fetch('https://api.spotify.com/v1/me/player/play', {
			method: 'PUT',
			headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
			body: JSON.stringify({ uris: [roomInfo.currentSong.spotifyURI] })
		});

		//Update UI
		let albumLeft = '';
		if (roomInfo.previousSongs.length >= 1) {
			//Get the item at the end of the array
			let recentSongsLength = roomInfo.previousSongs.length;
			albumLeft = roomInfo.previousSongs[recentSongsLength - 1].albumArtSrc;
		}

		let albumMiddle = '';
		if (roomInfo.currentSong) {
			albumMiddle = roomInfo.currentSong.albumArtSrc;
		}

		let albumRight = '';
		if (roomInfo.nextSongs.length >= 1) {
			albumRight = roomInfo.nextSongs[0].albumArtSrc;
		}

		this.setState({
			albumArt: {
				albumLeft: albumLeft,
				albumMiddle: albumMiddle,
				albumRight: albumRight
			},
			upNext: roomInfo.nextSongs,
			playbackInfo: {
				isPlaying: true,
				currentSongName: roomInfo.currentSong.name,
				currentSongArtist: roomInfo.currentSong.artist,
				currentSongAlbum: roomInfo.currentSong.album
			}
		});
	}

	//We need to emit the leaveRoom event because otherwise we
	//will not be able to track when users leave
	componentWillUnmount() {
		clearInterval(this.percentDoneIntervalID);
		clearInterval(this.refreshTokenIntervalId);
		clearInterval(this.updateCreatorAccessTokenIntervalId);
		clearInterval(this.sendCurrentTimeId);
		clearInterval(this.checkForRoomId);

		//window.removeEventListener('beforeunload');

		if (this.socket) {
			this.socket.emit('leaveRoom', {
				name: localStorage.getItem('name').split(' ')[0],
				roomId: localStorage.getItem('roomId'),
				isCreator: this.state.isCreator,
				accessToken: localStorage.getItem('accessToken'),
				refreshToken: localStorage.getItem('refreshToken')
			});
			this.socket.disconnect();
		}
	}

	//This method will run every 500ms to update the song progress bar
	updateSongProgress = async () => {
		this.percentDoneIntervalID = setInterval(() => {
			this.state.player.getCurrentState().then(state => {
				if (state) {
					this.setState({
						percentDone: state.position / state.duration,
						currentSongURI: state.track_window.current_track.uri
					}, () => {
						//If we are playing a song, make sure that
						//we reset the nextSongRequested field
						if (this.state.percentDone !== 0) {
							this.setState({ nextSongRequested: false });
						}
					});
				}
			});
		}, 500);
	}

	//If we are refreshing the page, we need to create a player
	createPlayer = () => {
		window.onSpotifyWebPlaybackSDKReady = async () => {
			this.setState({
				player: new window.Spotify.Player({
					name: 'Syncify',
					getOAuthToken: cb => { cb(localStorage.getItem('accessToken')) }
				})
			});
			this.state.player.connect();
			this.props.addPlayerToParent(this.state.player);
			this.createEventHandlers();
			let playbackInfo = await setInitialPlayback(this.state.isCreator);
			this.updateState(playbackInfo);
		}
	}

	//Create the event handlers for the player
	//Once the player is ready, start playback
	createEventHandlers = async () => {
		this.state.player.on('initialization_error', e => console.error(e));
		this.state.player.on('authentication_error', e => console.error(e));
		this.state.player.on('account_error', e => console.error(e));
		this.state.player.on('playback_error', e => console.error(e));
		this.state.player.on('player_state_changed', state => this.playbackStateChange(state));
		this.state.player.on('ready', async (data) => {
			this.setState({ deviceID: data.device_id });
			await this.transferPlaybackToBrowser();
			this.updateSongProgress();
		});
	}

	//Transfer the playback to the web player object
	transferPlaybackToBrowser = async () => {
		let res = await fetch('https://api.spotify.com/v1/me/player', {
			headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
		});
		if (res.status === 200) {
			let data = await res.json();
			if (data.device.id && data.device.id !== this.state.deviceID) {
				await fetch('https://api.spotify.com/v1/me/player', {
					method: 'PUT',
					headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
					body: JSON.stringify({
						device_ids: [this.state.deviceID],
						play: true
					})
				});
			}
			let playbackInfo = await setInitialPlayback(this.state.isCreator);
			this.updateState(playbackInfo);
		}
		else if (res.status === 204) {
			await fetch('https://api.spotify.com/v1/me/player', {
				method: 'PUT',
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
				body: JSON.stringify({
					device_ids: [this.state.deviceID],
					play: true
				})
			});
		}
		else {
			console.log("There was an error when getting the current user's playback: " + res.status);
		}
	}

	playbackStateChange = async (playerState) => {
		if (playerState && this.state.isCreator && playerState.paused) {
			if (!this.state.currentSongURI) {
				this.setState({ currentSongURI: playerState.track_window.current_track.uri })
			}
			//We need to check for the nextSongRequested field
			//otherwise we are sending the nextSong event
			//multiple times and concurrently modifying a document
			//in the database
			if (this.state.currentSongURI === playerState.track_window.current_track.uri
				&& playerState.position === 0
				&& !this.state.nextSongRequested) {
				this.setState({ nextSongRequested: true }, () => {
					this.socket.emit('nextSong', localStorage.getItem('roomId'));
				});
			}
		}
	}

	//Update the state of the component based on response from the server
	updateState = (roomInfo) => {
		let albumLeft = '';
		if (roomInfo.recentSongs.length >= 1) {
			//Get the item at the end of the array
			let recentSongsLength = roomInfo.recentSongs.length;
			albumLeft = roomInfo.recentSongs[recentSongsLength - 1].albumArtSrc;
		}

		let albumMiddle = '';
		if (roomInfo.currentSong) {
			albumMiddle = roomInfo.currentSong.albumArtSrc;
		}

		let albumRight = '';
		if (roomInfo.upcomingSongs.length >= 1) {
			albumRight = roomInfo.upcomingSongs[0].albumArtSrc;
		}

		if (roomInfo) {
			this.setState({
				roomName: roomInfo.name,
				albumArt: {
					albumLeft: albumLeft,
					albumMiddle: albumMiddle,
					albumRight: albumRight
				},
				listeners: roomInfo.listeners,
				upNext: roomInfo.upcomingSongs,
				playbackInfo: {
					isPlaying: true,
					currentSongName: roomInfo.currentSong.name,
					currentSongArtist: roomInfo.currentSong.artist,
					currentSongAlbum: roomInfo.currentSong.album
				}
			});
		}
	}

	render() {
		if (this.state.roomDeleted) {
			return (<Redirect to='/roomselect' />);
		}

		return (
			<LiveStreamContext.Provider value={{
				socket: this.socket,
				isPlaying: this.state.isPlaying
			}}>
				<ScreenTop
					percentDone={this.state.percentDone}
					roomName={this.state.roomName} />
				<ScreenMiddle
					albumArt={this.state.albumArt}
					playbackInfo={this.state.playbackInfo}
					isCreator={this.state.isCreator}
					player={this.state.player}
					listeners={this.state.listeners}
					upNext={this.state.upNext} />
				<div style={mainStyle}>
					<div style={bottomStyle}><ScreenBottom /></div>
				</div>
			</LiveStreamContext.Provider>
		);
	}
}
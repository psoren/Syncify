import React from 'react';
import { Redirect } from 'react-router-dom';
import 'styling/styles.scss';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const formStyle = {
  textAlign: 'center'
}

const inputFieldStyle = {
  outline: '0',
  borderRadius: '5px',
  border: 'none',
  height: '25px',
  font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif',
  margin: '0px'
}

const btnStyle = {
  font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif',
  borderRadius: '4em',
  background: '#fff',
  color: '#000',
  padding: '0.7em 1.5em',
  width: '9em',
  border: '1px solid white',
  outline: '0',
  margin: '0px'
}

const labelStyle = {
  font: 'bold 24px "helvetica neue", helvetica, arial, sans-serif',
  textAlign: 'center',
  margin: '0px'
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    let fullName = '';
    if (localStorage.getItem('name')) {
      fullName = localStorage.getItem('name');
    }
    let roomName = 'New Room';
    if (fullName) {
      roomName = fullName.split(' ')[0] + "'s Room"
    }

    this.state = {
      roomName: '',
      selectedOption: 'Public',
      roomIsCreated: false,
      defValue: roomName,
      modified: false
    }
  }

  handleChange = (e) => {
    this.setState({
      roomName: e.target.value,
      modified: true
    });
  }

  //Create the room in the database
  handleSubmit = async (e) => {
    e.preventDefault();

    //Get the current song so we can add it to the database
    let playbackInfoRes = await fetch('https://api.spotify.com/v1/me/player', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
    });

    let playbackInfoResJSON = await playbackInfoRes.json();

    let songArtists = '';
    playbackInfoResJSON.item.artists.forEach((artist, i) => {
      i === 0 ? songArtists += artist.name :
        songArtists += ', ' + artist.name;
    });

    let currentSong = {
      name: playbackInfoResJSON.item.name,
      artist: songArtists,
      album: playbackInfoResJSON.item.album.name,
      spotifyURI: playbackInfoResJSON.item.uri,
      albumArtSrc: playbackInfoResJSON.item.album.images[0].url
    }

    //For default value
    //This is not a great solution, but it works
    let name = this.state.defValue;
    if (this.state.modified) {
      name = this.state.roomName
    }

    let res = await fetch('/createRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isPublic: this.state.selectedOption === 'Public' ? true : false,
        roomName: name,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        currentSong: currentSong
      })
    });

    let resJSON = await res.json();
    if (resJSON.success) {
      this.setState({
        roomIsCreated: resJSON.success,
        roomID: resJSON.roomID
      });
    }
    else {
      this.setState({ roomCreationError: true });
      toaster.notify('We could not create the room at this time.', { duration: 4000 });
    }
  }

  handleRadioChange = (e) => this.setState({ selectedOption: e.target.value });

  //When we attempt to create a room, either it
  //was created successfully and we should redirect or
  //there is an error.  If neither of those is set, 
  //then the user has not attempted to create a room yet.
  render() {
    if (this.state.roomIsCreated && 
      !this.state.roomCreationError) {
      return (<Redirect to={
        '/livestream?roomId=' + this.state.roomID} />);
    }
    else {
      return (
        <form onSubmit={this.handleSubmit} style={formStyle}>

          <label style={labelStyle}>
            <input type="radio" value="Public"
              checked={this.state.selectedOption === 'Public'}
              onChange={this.handleRadioChange} />
            Public
          </label>
          <br />

          <label style={labelStyle}>
            <input type="radio" value="Private"
              checked={this.state.selectedOption === 'Private'}
              onChange={this.handleRadioChange} />
            Private
          </label>
          <br />

          <input type="text" value={this.state.value}
            onChange={this.handleChange}
            defaultValue={this.state.defValue}
            style={inputFieldStyle} />
          <br />

          <input type="submit"
            className='btn'
            value="Create Room"
            style={btnStyle} />
        </form>
      );
    }
  }
}
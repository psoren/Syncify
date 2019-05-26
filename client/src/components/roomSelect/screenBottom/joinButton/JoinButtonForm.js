import React from 'react';
import { Redirect } from 'react-router-dom';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';

const formStyle = {
  paddingTop: '40px',
  textAlign: 'center'
}

const inputFieldStyle = {
  outline: '0',
  borderRadius: '5px',
  border: 'none',
  height: '25px',
  font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif'
}

const btnStyle = {
  font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif',
  borderRadius: '4em',
  background: '#fff',
  color: '#000',
  padding: '0.7em 1.5em',
  width: '9em',
  border: '1px solid white',
  outline: '0'
}

export default class extends React.Component {

  constructor() {
    super();
    this.state = {
      roomId: '',
      roomFound: false
    }
  }

  handleChange = (e) => this.setState({ roomId: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('/joinRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        roomId: this.state.roomId,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      })
    });
    let resJSON = await res.json();

    if (resJSON.success) {
      this.setState({ roomFound: true });
    }
    else {
      toaster.notify("We couldn't find the room with id '" + this.state.roomId + "'", { duration: 2000 });
    }
  }

  render() {
    if (this.state.roomFound) {
      return (<Redirect to={'/livestream/?roomId=' + this.state.roomId} />);
    }
    else {
      return (
        <form onSubmit={this.handleSubmit} style={formStyle}>
          <input type="text" value={this.state.value}
            onChange={this.handleChange}
            placeholder='Room Id'
            style={inputFieldStyle} />
          <input 
          type="submit" 
          value="Join Room" 
          className='btn'
          style={btnStyle} />
        </form>
      );
    }
  }
}
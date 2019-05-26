import React from 'react';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
require('dotenv').config();

const background = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
}

const inner = {
  maxWidth: '50%',
  background: 'rgba(255,255,255,0.5)',
  borderRadius: '15px',
  paddingBottom: '25px',
  paddingLeft: '25px',
  paddingRight: '25px'

}

const h2Style = {
  color: '#fff'
}

let redirect_uri = '';
if (process.env.NODE_ENV === 'production') {
  redirect_uri = process.env.REACT_APP_PROD_URI;
}
else {
  redirect_uri = process.env.REACT_APP_DEV_URI;
}

const link = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: process.env.REACT_APP_SCOPE,
    redirect_uri: redirect_uri
  });

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      font: 'bold 20px "helvetica neue", helvetica, arial, sans-serif',
      borderRadius: '4em',
      background: '#43DF7A',
      color: 'white',
      padding: '0.7em 1.5em',
      width: '9em',
      border: '1px solid #00C292',
      outline: '0'
    }
  }

  render() {
    const loggedIn = localStorage.getItem('accessToken') ? true : false;

    if (loggedIn) {
      return (
        <div style={background}>
          <div style={inner}>
            <h2 style={h2Style}> (404) We couldn't find that page</h2>
            <a href={link}
              style={this.state}
              onMouseDown={() => this.setState({ background: '#10AC47' })}
              onMouseUp={() => this.setState({ background: '#43DF7A' })}
              onMouseOut={() => this.setState({ background: '#43DF7A' })}>
              HOME</a>
          </div>
        </div>
      );
    }
    else {
      return (
        <div style={background}>
          <div style={inner}>
            <h2 style={h2Style}> (404) We couldn't find that page</h2>
            <Link style={this.state} to='/login'>LOGIN</Link>
          </div>
        </div>
      );
    }
  }
}

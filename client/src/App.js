import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoomSelect from './components/roomSelect/RoomSelect';
import LiveStream from './components/liveStream/LiveStream';
import LoginScreen from './components/loginScreen/LoginScreen';
import Error from './components/Error';

/**
 * When we create this app, we want to pass a callback to the roomselect screen.
 * When the web player is created in the roomselect screen, the callback will execute and we will
 * set the state of the app to contain the player.  That way, we can control playback from all
 * screens of the application.  If player is already set in the state of the App, we will not create
 * another one. 
 */

/**
 * We also need to check to make sure that the player of the App is not set
 * in the roomselect component.
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      redirectToLivestream: false
    }
  }

  //Add the player created in roomselect to the state of this component
  createPlayer = (newPlayer) => {
    //Only set the player if there is no current player
    if (!this.state.player) { this.setState({ player: newPlayer }); }
  };

  //If the user refreshed on the livestream page,
  //set the app player to be the player that is
  //newly created
  refreshLiveStreamPlayer = (player) => this.setState({ player: player });

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/roomselect" render={(props) => (
            <RoomSelect
              setWebPlayer={this.createPlayer}
              appPlayer={this.state.player}
              {...props} />
          )} />
          <Route path='/login' component={LoginScreen} />
          <Route path={'/livestream'}
            render={(props) => (
              <LiveStream
                player={this.state.player}
                roomID={this.state.roomID}
                addPlayerToParent={this.refreshLiveStreamPlayer}
                {...props} />
            )} />
          <Route path='/' component={LoginScreen} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
} 

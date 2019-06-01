import React from 'react';
import Listener from './Listener';
import Btn from '../../../screenBottom/search/artist/Btn';
import './listeners.scss';

export default class extends React.Component {

  render() {
    return (
      <div className='surround'>
        <Btn
          class='bigBtn'
          val='Listeners'
          onClick={this.toggleState}
        />
        <div className='listeners'>
          {this.state.clicked ?
            this.state.currentListeners : null}
        </div>
      </div>);
  }

  toggleState = () => this.setState({ clicked: !this.state.clicked });

  constructor(props) {
    super(props);
    this.state = {
      currentListeners: [],
      clicked: false
    };

    console.log('need to add listener for mouse click outside of button');


  }

  componentWillReceiveProps = async (nextProps) => {
    let currentListeners = [];
    let currentURL = new URL(window.location.href);
    let res = await fetch('/getCreatorId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId: currentURL.searchParams.get('roomId') })
    });
    let resJSON = await res.json();
    if (resJSON.success) {
      let firstName = resJSON.name.split(' ')[0];
      //The creator
      currentListeners.push(
        <Listener
          imgSrc={resJSON.pictureSrc}
          firstName={firstName}
          key={resJSON.creatorId} />
      );

      //Each of the listeners
      nextProps.listeners.forEach((listener) => {
        let pictureSrc = '';
        if (listener.pictureSrc === '../defaultPerson.png') {
          pictureSrc = '/defaultPerson.png';
        }
        else {
          pictureSrc = listener.pictureSrc;
        }
        let newListener =
          <Listener
            imgSrc={pictureSrc}
            firstName={listener.name.split(' ')[0]}
            key={listener.spotifyURI}
          />
        currentListeners.push(newListener);
      });
      this.setState({ currentListeners: currentListeners });
    }
    else {
      console.error('(Listeners) Error when getting creator info');
    }
  }

  componentWillUnmount = () => {
    console.log('need to remove listener');


  }
}
import React from 'react';
import Listener from './Listener';
import '../toggleSwitch.scss';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentListeners: [],
      clicked: false
    };
  }

  componentWillMount = () =>
    document.addEventListener('mousedown', this.outsideClick);

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.outsideClick);

  outsideClick = (e) => {
    if (!this.listenersRef.contains(e.target)
      && this.state.clicked
      && !this.buttonRef.contains(e.target)
    ) { this.setState({ clicked: false }); }
  }

  toggleState = () => this.setState({ clicked: !this.state.clicked });

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
        let newListener =
          <Listener
            imgSrc={listener.pictureSrc}
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

  render() {
    return (
      <div className='listenersOuter'>
        <div className='listeners'
          ref={listenersRef => this.listenersRef = listenersRef}>
          {this.state.clicked ? this.state.currentListeners : null}
        </div>
        <button
          ref={buttonRef => this.buttonRef = buttonRef}
          className={this.state.clicked ?
            'listenerBtnClicked' :
            'listenerBtn'}
          onClick={this.toggleState} >
          Listeners
        </button>
      </div>
    );
  }
}
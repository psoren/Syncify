import React from 'react';
import Listener from './Listener';
import ListenerBtn from './ListenerBtn';

const surroundStyle = {
  position: 'relative',
  top: '-275px',
  marginLeft: '75px'
}

const listClicked = {
  height: '300px',
  overflow: 'auto',
  width: '225px',
  background: 'rgba(10,10,10,0.85)',
  position: 'relative',
  top: '-20px',
  right: '30px',
  borderRadius: '10px',
  border: '2px solid #000',
  margin: '0'
}

const listUnclicked = {
  ...listClicked,
  background: 'none',
  border: 'none',
  margin: '2px'
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentListeners: [],
      showMenu: false
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    let currentListeners = [];
    let currentURL = new URL(window.location.href);

    let res = await fetch('/getCreatorId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId: currentURL.searchParams.get('roomId') })
    });
    try {
      let resJSON = await res.json(); 
      if (resJSON.success) {
        let firstName = resJSON.name.split(' ')[0];

        //The creator
        currentListeners.push(<Listener
          imgSrc={resJSON.pictureSrc}
          firstName={firstName}
          key={resJSON.creatorId} />);

        //Each of the listeners
        nextProps.listeners.forEach((listener) => {
          let pictureSrc = '';
          if (listener.pictureSrc === '../defaultPerson.png') {
            pictureSrc = '/defaultPerson.png';
          }
          else {
            pictureSrc = listener.pictureSrc;
          }
          let newListener = <Listener
            imgSrc={pictureSrc}
            firstName={listener.name.split(' ')[0]}
            key={listener.spotifyURI} />
          currentListeners.push(newListener);
        });
        this.setState({ currentListeners: currentListeners });
      }
      else {
        console.error('(Listeners) Error when getting creator info');
      }
    }
    catch (error) {
      console.error('(Listeners) Error when getting creator info');
    }
  }

  showMenu = (e) => {
    e.preventDefault();
    this.setState({ showMenu: true }, () =>
      document.addEventListener('click', this.closeMenu));
  }

  closeMenu = (e) => {
    if (this.dropdownMenu && !this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () =>
        document.removeEventListener('click', this.closeMenu));
    }
  }

  componentWillUnmount = () => document.removeEventListener('click', this.closeMenu);

  render() {
    return (
      <div style={surroundStyle}>
        <div style={this.state.showMenu ? listClicked : listUnclicked}> {
          this.state.showMenu ? (
            <div ref={(element) => { this.dropdownMenu = element; }}>
              {this.state.currentListeners}
            </div>)
            : (null)}
        </div>
        <ListenerBtn
          onClick={this.showMenu}
          clicked={this.state.showMenu} />
      </div>);
  }
}
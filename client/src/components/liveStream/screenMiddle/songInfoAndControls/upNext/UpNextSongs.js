import React, { Component } from 'react';
import UpNext from './UpNext';
import UpNextBtn from './UpNextBtn';

const surroundStyle = {
  position: 'relative',
  top: '-275px',
}

const listClicked = {
  height: '300px',
  overflow: 'auto',
  width: '225px',
  background: 'rgba(10,10,10,0.85)',
  position: 'relative',
  top: '-20px',
  right: '40px',
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUpNext: [],
      showMenu: false
    }
  }

  showMenu = (e) => {
    e.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu = (e) => {
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  componentWillUnmount = () => document.removeEventListener('click', this.closeMenu);

  componentWillReceiveProps = (nextProps) => {
    const currentUpNext = [];
    if (nextProps.upNext) {
      nextProps.upNext.forEach((track) => {
        let newSong = <UpNext
          imgSrc={track.albumArtSrc}
          song={track.name}
          artist={track.artist}
          key={track.spotifyURI} />
        currentUpNext.push(newSong);
      });
      this.setState({ currentUpNext: currentUpNext });
    }
  }

  render() {
    return (
      <div style={surroundStyle}>
        <div style={this.state.showMenu ? listClicked : listUnclicked}> {
          this.state.showMenu ? (
            <div ref={(element) => { this.dropdownMenu = element; }}>
              {this.state.currentUpNext}
            </div>)
            : (null)}
        </div>
        <UpNextBtn
          onClick={this.showMenu}
          clicked={this.state.showMenu} />
      </div>
    );
  }
}
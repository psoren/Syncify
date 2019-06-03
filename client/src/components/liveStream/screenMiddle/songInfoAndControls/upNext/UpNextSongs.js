import React, { Component } from 'react';
import UpNext from './UpNext';
import './upNextSongs.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUpNext: [],
      clicked: false
    }
  }

  componentWillMount = () =>
    document.addEventListener('mousedown', this.outsideClick);

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.outsideClick);

  outsideClick = (e) => {
    if (!this.upNextRef.contains(e.target)
      && this.state.clicked
      && !this.buttonRef.contains(e.target)
    ) {
      this.setState({ clicked: false });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let currentUpNext = [];
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
      <div className='surround'>
        <div
          className='upNextSongs'
          ref={upNextRef => this.upNextRef = upNextRef} >
          {this.state.clicked ? this.state.currentUpNext : null}
        </div>
        <button
          ref={buttonRef => this.buttonRef = buttonRef}
          className={this.state.clicked ?
            'upNextBtnClicked' :
            'UpNextBtn'}
          onClick={this.toggleState}
        >
          Up Next
        </button>
      </div>
    );
  }
}
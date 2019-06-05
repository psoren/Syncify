import React from 'react';
import { LiveStreamContext } from 'components/liveStream/LiveStream';
import UpNext from './UpNext';
import ClearQueueButton from './ClearQueueButton';
import '../toggleSwitch.scss';

class UpNextSongs extends React.Component {
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
    ) { this.setState({ clicked: false }); }
  }

  toggleState = () => this.setState({ clicked: !this.state.clicked });

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.context.socket) {
      this.setState({
        socket: nextProps.context.socket,
        isCreator: nextProps.isCreator
      });
    }
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
      <div className='upNextSongsOuter'>
        <div className='upNextSongs'
          style={this.state.currentUpNext.length === 0
            && this.state.clicked ?
            {
              minHeight: '100px',
              fontWeight: '600',
              textAlign: 'center',
              paddingTop: '75px'
            } : { minHeight: '0px' }
          }
          ref={upNextRef => this.upNextRef = upNextRef} >
          {this.state.clicked ? this.state.currentUpNext : null}
          {this.state.clicked &&
            this.state.currentUpNext.length === 0
            ? 'No upcoming songs' : null
          }
        </div>
        <button
          ref={buttonRef => this.buttonRef = buttonRef}
          className={this.state.clicked ?
            'upNextBtnClicked' :
            'upNextBtn'}
          onClick={this.toggleState}>
          Up Next
        </button>
        {this.state.isCreator ? <ClearQueueButton
          isCreator={this.state.isCreator}
        /> : null}
      </div>
    );
  }
}

export default props => (<LiveStreamContext.Consumer>
  {context => { return <UpNextSongs {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
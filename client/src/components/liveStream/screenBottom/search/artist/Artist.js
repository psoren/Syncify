import React from 'react';
import './artistStyles.scss';
import { LiveStreamContext } from '../../../LiveStream';
import Song from '../song/Song';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const outer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

const imgStyle = {
    width: '125px',
}

const nameStyle = {
    font: '20px arial, sans-serif',
    fontWeight: '900',
    color: '#fff',
    marginTop: '10px'
}
class Artist extends React.Component {

    constructor(props) {
        super(props);
        this.state = { socket: props.context.socket };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.context.socket) {
            this.setState({
                socket: nextProps.context.socket,
            });
        }
    }

    //Play the top songs by this artist
    playTopSongs = async () => {
        let topSongsRes = await fetch(`https://api.spotify.com/v1/artists/${this.props.id}/top-tracks?country=US`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let topSongsResJSON = await topSongsRes.json();
        let currentSongs = [];
        topSongsResJSON.tracks.forEach(track => {
            let songArtists = '';
            track.artists.forEach((artist, i) => {
                i === 0 ? songArtists += artist.name :
                    songArtists += ', ' + artist.name;
            });
            let imgSrc = '/notPlaying.jpg';
            if (track.album.images.length !== 0) {
                imgSrc = track.album.images[0].url;
            }
            let newSong = <Song
                key={track.id}
                title={track.name}
                artist={songArtists}
                album={track.album.name}
                imgSrc={imgSrc}
                uri={track.uri} />
            currentSongs.push(newSong);
        });

        //Send the array of current songs to the server
        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');

        //Play all songs in the search list
        if (this.state.socket && currentSongs.length > 0) {
            let res = await fetch('/addToQueue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    type: 'songs',
                    data: currentSongs,
                    name: localStorage.getItem('name')
                })
            });
            let resJSON = await res.json();

            let name = '';
            if (localStorage.getItem('name')) {
                name = localStorage.getItem('name').split(' ')[0];
            }

            let message = name + ' added the top ten songs by ' +
                this.props.name + ' to the queue.';

            if (resJSON.success) {
                this.state.socket.emit('initUpdateSongs', {
                    roomId: currentURL.searchParams.get('roomId'),
                    upcomingSongs: resJSON.nextSongs,
                    message: message
                });
            }
            else {
                toaster.notify(resJSON.message, { duration: 2000 });
            }
        }
    }

    render() {
        return (
            <div style={outer}>
                <div className='imageWrapper'
                    onClick={this.playTopSongs}>
                    <img className='overlayImage'
                        src={this.props.imgSrc}
                        style={imgStyle} alt='Artist'>
                    </img>
                    <img
                        className='playImage'
                        src='/play.svg'
                        alt='playButton'>
                    </img>
                </div>
                <p style={nameStyle}>
                    {this.props.name}
                </p>
            </div>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <Artist {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
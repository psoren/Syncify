import React from 'react';
import { LiveStreamContext } from '../../../LiveStream';
import Song from '../song/Song';
import GoBackBtn from './GoBackBtn';
import Btn from './Btn';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './artists.scss';
//import 'styling/styles.scss';

const buttonsDiv = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
}

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            //socket: props.context.socket,
            albumSrc: '/notPlaying.jpg',
            songs: []
        };
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.context.socket) {
            this.setState({
                socket: nextProps.context.socket,
            });
        }
    }*/

    //Fetch album data
    componentWillMount = async () => {
        let albumSongs = [];
        let albumInfoRes = await fetch(`https://api.spotify.com/v1/albums/${this.state.id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let albumInfoResJSON = await albumInfoRes.json();

        let albumArtists = '';
        albumInfoResJSON.artists.forEach((artist, i) => {
            i === 0 ? albumArtists += artist.name :
                albumArtists += ', ' + artist.name;
        });

        this.setState({
            albumName: albumInfoResJSON.name,
            artistName: albumArtists
        });

        if (albumInfoResJSON.images.length !== 0) {
            this.setState({ albumSrc: albumInfoResJSON.images[0].url });
        }
        albumInfoResJSON.tracks.items.forEach(track => {
            let songArtists = '';
            track.artists.forEach((artist, i) => {
                i === 0 ? songArtists += artist.name :
                    songArtists += ', ' + artist.name;
            });
            let newSong = <Song
                key={track.id}
                title={track.name}
                artist={songArtists}
                album={albumInfoResJSON.name}
                imgSrc={this.state.albumSrc}
                uri={track.uri}
            />
            albumSongs.push(newSong);
        });
        this.setState({ songs: albumSongs });
    }

    //Play the album's songs
    playSongs = async (shouldAppend) => {
        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');

        //Play all songs in the search list
        if (this.state.socket && this.state.songs.length > 0) {
            let res = await fetch('/addToQueue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    type: 'songs',
                    data: this.state.songs,
                    name: localStorage.getItem('name'),
                    shouldAppend: shouldAppend
                })
            });
            let resJSON = await res.json();
            let name = '';
            if (localStorage.getItem('name')) {
                name = localStorage.getItem('name').split(' ')[0];
            }

            let message = name + ' added the album album1 by artist1 to the queue';

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
            <React.Fragment>
                <div style={buttonsDiv}>
                    <GoBackBtn onClick={this.props.showArtist} />
                    <Btn
                        class={'bigBtn'}
                        val={'Play Next'}
                        onClick={this.playSongs.bind(this, false)}
                    />
                    <Btn
                        class={'bigBtn'}
                        val={'Play Later'}
                        onClick={this.playSongs.bind(this, true)}
                    />
                </div>
                <div className='middleDiv'>
                    <div className='artistNameOuter'>
                        <div className='artistName'>
                            {this.state.albumName}
                            <hr />
                            {this.state.artistName}
                        </div>
                    </div>
                    <img
                        className='artistImage'
                        src={this.state.albumSrc}
                        alt='Album'>
                    </img>
                </div>
                <h2 className='label'>Songs</h2>
                <div className='songs'>
                    {this.state.songs}
                </div>
            </React.Fragment>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <Album {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
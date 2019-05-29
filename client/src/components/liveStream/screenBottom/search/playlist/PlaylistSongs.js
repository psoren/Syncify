import React from 'react';
import PlaylistSong from '../song/Song';
import Btn from './Btn';
import PlaylistSongsFilter from './PlaylistSongsFilter';
import { LiveStreamContext } from '../../../LiveStream';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const filterStyle = {
    textAlign: 'center',
    paddingTop: '15px'
}

const outer = {
    paddingTop: '0px',
    marginTop: '0px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center'
}

const inner = {
    height: '400px',
    overflow: 'auto'
}

const buttonDiv = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
}

class PlaylistSongs extends React.Component {

    constructor(props) {
        super(props);
        let uri = this.props.playlistURI;
        this.state = {
            playlistId: uri.split(':')[2],
            songs: [],
            filteredSongs: [],
            searchText: '',
            socket: props.context.socket,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.context.socket) {
            this.setState({ socket: nextProps.context.socket });
        }
    }

    //Initially, we will display all songs in the playlist
    componentWillMount = async () => {
        //For now, we are just getting the first 100 tracks in the playlist
        let songsRes = await fetch('https://api.spotify.com/v1/playlists/' + this.state.playlistId + '/tracks', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let songsResJSON = await songsRes.json();
        let currentSongs = [];
        songsResJSON.items.forEach(item => {
            let track = item.track;
            let songArtists = '';
            track.artists.forEach((artist, i) => {
                i === 0 ? songArtists += artist.name :
                    songArtists += ', ' + artist.name;
            });
            let imgSrc = '/notPlaying.jpg';
            if (track.album.images.length !== 0) {
                imgSrc = track.album.images[0].url;
            }
            let newSong = <PlaylistSong
                key={track.id}
                title={track.name}
                artist={songArtists}
                album={track.album.name}
                imgSrc={imgSrc}
                uri={track.uri} />
            currentSongs.push(newSong);
        });
        this.setState({ songs: currentSongs });
    }

    //When the user types in a string, compare it to each of
    //the songs in the playlist
    setSearchedSongs = async (searchText) => {
        this.setState({ searchText: searchText });
        let lowerCaseSearchText = searchText.toLowerCase();
        if (searchText !== '') {
            let filteredSongs = [];
            this.state.songs.forEach(song => {
                let lowerCaseSongName = song.props.title.toLowerCase();
                if (lowerCaseSongName.indexOf(lowerCaseSearchText) !== -1) {
                    filteredSongs.push(song);
                }
            });
            this.setState({ filteredSongs: filteredSongs });
        }
    }

    playAllSongs = async () => {

        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');

        //If the user has searched for something, play the search results
        //Otherwise, play all songs in the playlist
        let songList = this.state.songs;
        if (this.state.searchText !== '') {
            songList = this.state.filteredSongs;
        }

        //Play all songs in the search list
        if (this.state.socket && songList.length > 0) {
            let res = await fetch('/addToQueue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    type: 'playlist',
                    data: songList,
                    name: localStorage.getItem('name')
                })
            });
            let resJSON = await res.json();

            let name = localStorage.getItem('name').split(' ')[0];
            let message = name + ' added the playlist ' +
                this.props.playlistName + ' to the queue.';

            console.log(message);

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

        //If the user has searched for something, and there is at least one result
        let songList = this.state.songs;
        if (this.state.searchText !== '') {
            songList = this.state.filteredSongs;
        }

        return (
            <div style={outer}>
                <div style={buttonDiv}>
                    <Btn
                        onClick={this.props.goToAllPlaylists}
                        btnValue='All Playlists' />
                    <Btn
                        onClick={this.playAllSongs}
                        btnValue='Play All' />
                </div>
                <div style={filterStyle}>
                    <PlaylistSongsFilter setSearchedSongs={this.setSearchedSongs} />
                </div>
                <div style={inner}>
                    {songList}
                </div>
            </div>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <PlaylistSongs {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
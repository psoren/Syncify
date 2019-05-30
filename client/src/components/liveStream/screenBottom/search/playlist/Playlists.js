import React from 'react';
import Playlist from './Playlist';
import querystring from 'querystring';
import PlaylistSongs from './PlaylistSongs';

const outerGrid = {
    display: 'grid',
    height: '450px',
    overflow: 'auto',
    gridTemplateColumns: 'auto auto auto',
    margin: '10px',
    gridColumnGap: '40px',
    gridRowGap: '10px'
}

const selectedPlaylistStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-around'
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedPlaylist: null };
        this.setLibraryPlaylists();
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.searchResult &&
            nextProps.searchResult.playlists) {
            this.setSearchedPlaylists(nextProps);
        }
        else if (nextProps.searchResult === '') {
            this.setLibraryPlaylists();
        }
    }

    setSelectedPlaylist = (uri, name) => this.setState({
        selectedPlaylist: uri,
        selectedPlaylistName: name
    });

    setSearchedPlaylists = (props) => {
        let playlists = [];
        props.searchResult.playlists.items.forEach((playlist) => {
            let imgSrc = '/notPlaying.jpg'
            if (playlist.images[0]) {
                imgSrc = playlist.images[0].url;
            }
            let newPlaylist = <Playlist
                key={playlist.id}
                name={playlist.name}
                imgSrc={imgSrc}
                uri={playlist.uri}
                setSelectedPlaylist={this.setSelectedPlaylist}
            />
            playlists.push(newPlaylist);
        });
        this.setState({ playlists: playlists });
    }

    setLibraryPlaylists = async () => {
        const playlists = [];
        let numItemsToSearchFor = 20;
        let offset = 0;

        let params = querystring.stringify({
            offset: offset,
            limit: numItemsToSearchFor
        });

        //For now, just get the 40 most recent songs
        let libraryRes = await fetch('https://api.spotify.com/v1/me/playlists?' + params, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let libraryResJSON = await libraryRes.json();

        libraryResJSON.items.forEach((playlist) => {
            let imgSrc = '/notPlaying.jpg'
            if (playlist.images[0]) {
                imgSrc = playlist.images[0].url;
            }
            let newPlaylist = <Playlist
                key={playlist.id}
                name={playlist.name}
                imgSrc={imgSrc}
                uri={playlist.uri}
                setSelectedPlaylist={this.setSelectedPlaylist}
            />
            playlists.push(newPlaylist);
        });
        this.setState({ playlists: playlists });
    }

    goToAllPlaylists = () => this.setState({ selectedPlaylist: null });

    render() {
        //If we are viewing a single playlist
        if (this.state.selectedPlaylist) {
            return (
                <div style={selectedPlaylistStyle}>
                    <PlaylistSongs
                        playlistURI={this.state.selectedPlaylist}
                        playlistName={this.state.selectedPlaylistName}
                        goToAllPlaylists={this.goToAllPlaylists}
                    />
                </div>
            );
        }

        //If we are viewing all playlists
        else {
            return (
                <div style={outerGrid}>
                    {this.state.playlists}
                </div>
            );
        }
    }
}
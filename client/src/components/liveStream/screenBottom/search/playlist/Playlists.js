import React from 'react';
import PlaylistImage from './PlaylistImage';
import querystring from 'querystring';
import Playlist from './Playlist';
import './playlists.scss';

export default class extends React.Component {

    render() {
        //If we are viewing a single playlist
        if (this.state.selectedPlaylist) {
            return (
                <div className='playlistSelected'>
                    <Playlist
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
                <div className='playlistMainGrid'>
                    {this.state.playlists}
                </div>
            );
        }
    }

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
            let newPlaylist = <PlaylistImage
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
            let newPlaylist = <PlaylistImage
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

    
}
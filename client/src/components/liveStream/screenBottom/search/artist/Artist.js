import React from 'react';
import { LiveStreamContext } from '../../../LiveStream';
import Song from '../song/Song';
import Album from './Album';
import AlbumImage from './AlbumImage';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './artist.scss';
import Btn from './Btn';
import GoBackBtn from './GoBackBtn';
import querystring from 'querystring';

class Artist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.context.socket,
            name: 'Loading...',
            image: '/defaultPerson.png',
            selectedAlbumId: null
        };
    }

    componentWillMount = async () => {
        //Get artist's info
        let artistInfoRes = await fetch(`https://api.spotify.com/v1/artists/` +
            `${this.props.id}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            });
        let artistInfoResJSON = await artistInfoRes.json();

        let artistImg = artistInfoResJSON.images[0] ?
            artistInfoResJSON.images[0].url : '/defaultPerson.png';
        this.setState({
            name: artistInfoResJSON.name,
            image: artistImg
        });

        //Get artist's albums
        //Doing the first 50 for now (should be enough)
        let params = querystring.stringify({
            country: 'US',
            limit: '50'
        });
        let albumsRes = await fetch(`https://api.spotify.com/v1/artists/` +
            `${this.props.id}/albums/?` + params, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            });
        let albumsResJSON = await albumsRes.json();
        let albums = [];
        albumsResJSON.items.forEach((album) => {
            let imgSrc = '/notPlaying.jpg'
            if (album.images[0]) {
                imgSrc = album.images[0].url;
            }
            let newAlbumImage = <AlbumImage
                key={album.id}
                id={album.id}
                uri={album.uri}
                src={imgSrc}
                name={album.name}
                onClick={this.setSelectedAlbumId}
            />
            albums.push(newAlbumImage);
        });
        this.setState({ albums: albums });

        //Get top songs in US
        let topSongsRes = await fetch(`https://api.spotify.com/v1/artists/${this.props.id}/top-tracks?country=US`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let topSongsResJSON = await topSongsRes.json();
        let topSongs = [];
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
            let song = <Song
                key={track.id}
                title={track.name}
                artist={songArtists}
                album={track.album.name}
                imgSrc={imgSrc}
                uri={track.uri} />
            topSongs.push(song);
        });
        this.setState({ topSongs: topSongs });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.context.socket) {
            this.setState({ socket: nextProps.context.socket });
        }
    }

    setSelectedAlbumId = (id) => this.setState({ selectedAlbumId: id });

    //Play the top songs by this artist
    playTopSongs = async (shouldAppend) => {
        //Send the array of current songs to the server
        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');

        //Play all songs in the search list
        if (this.state.socket && this.state.topSongs.length > 0) {
            let res = await fetch('/addToQueue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    type: 'songs',
                    data: this.state.topSongs,
                    name: localStorage.getItem('name'),
                    shouldAppend: shouldAppend
                })
            });
            let resJSON = await res.json();

            let name = '';
            if (localStorage.getItem('name')) {
                name = localStorage.getItem('name').split(' ')[0];
            }

            let message = name + ' added the top songs by ' +
                this.state.name + ' to the queue.';

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

    //This method is called from album when we go back
    //from the album page to the artist page
    showArtist = () => this.setState({ selectedAlbumId: null });

    render() {
        if (this.state.selectedAlbumId) {
            return (
                <div className='main'>
                    <Album
                        id={this.state.selectedAlbumId}
                        showArtist={this.showArtist}
                    />
                </div>
            );
        }
        else {
            return (
                <div className='main'>
                    <div className='buttons'>
                        <GoBackBtn onClick={this.props.showArtists} />
                        <Btn
                            class='bigBtn'
                            val='Play Next'
                            onClick={this.playTopSongs.bind(this, false)}
                        />
                        <Btn
                            class='bigBtn'
                            val='Play Later'
                            onClick={this.playTopSongs.bind(this, true)}
                        />
                    </div>
                    <div className='artistNameOuter'>
                        <div className='artistName'>
                            {this.state.name}
                        </div>
                        <img
                            className='artistImage'
                            src={this.state.image}
                            alt='Artist'>
                        </img>
                    </div>
                    <h2 className='label'>Top Songs</h2>
                    <div className='songs'>
                        {this.state.topSongs}
                    </div>
                    <h2 className='label'>Albums</h2>
                    <div className='albums'>
                        {this.state.albums}
                    </div>
                </div>
            );
        }
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <Artist {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
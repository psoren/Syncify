import React from 'react';
import Song from './Song';
import { LiveStreamContext } from '../../../LiveStream';
import querystring from 'querystring';
import 'styling/styles.scss';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

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
    paddingBottom: '15px'
}

const playAllButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
}

class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: props.context.socket,
            loading: true,
            librarySongs: true,
            playAllNextClicked: false,
            playAllLaterClicked: false
        }
        this.setLibrarySongs();
    }

    setLibrarySongs = async () => {
        const songs = [];
        let numItemsToSearchFor = 20;
        let offset = 0;

        let params = querystring.stringify({
            offset: offset,
            limit: numItemsToSearchFor
        });
        //Getting the numItemsToSearchFor most recent items
        let libraryRes = await fetch('https://api.spotify.com/v1/me/tracks?' + params, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let libraryResJSON = await libraryRes.json();

        if (libraryResJSON.items) {
            libraryResJSON.items.forEach((trackObj) => {
                let track = trackObj.track;
                let songArtists = '';
                track.artists.forEach((artist, i) => {
                    i === 0 ? songArtists += artist.name :
                        songArtists += ', ' + artist.name;
                });

                let newSong = <Song
                    key={track.id}
                    title={track.name}
                    artist={songArtists}
                    album={track.album.name}
                    imgSrc={track.album.images[0].url}
                    uri={track.uri} />
                songs.push(newSong);
                this.setState({ songs: songs });
            });
        }
        else {
            console.error("(Songs) There was an error getting the songs from the user's library.");
        }
    }

    setSearchedSongs = (props) => {
        const songs = [];
        props.searchResult.tracks.items.forEach((track) => {
            //Get artists' names
            let songArtists = '';
            track.artists.forEach((artist, i) => {
                i === 0 ? songArtists += artist.name :
                    songArtists += ', ' + artist.name;
            });

            let imgSrc = '';
            if (track.album.images.length === 0) {
                imgSrc = '/notPlaying.jpg';
            }
            else {
                imgSrc = track.album.images[0].url;
            }

            let newSong = <Song
                key={track.id}
                title={track.name}
                artist={songArtists}
                album={track.album.name}
                imgSrc={imgSrc}
                uri={track.uri} />
            songs.push(newSong);
            this.setState({ songs: songs });
        });
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.context.socket) {
            this.setState({
                socket: nextProps.context.socket,
                loading: false
            });
        }

        if (nextProps.searchResult &&
            nextProps.searchResult.tracks) {
            this.setState({ librarySongs: false });
            this.setSearchedSongs(nextProps);
        }
        else if (nextProps.searchResult === '') {
            this.setState({ librarySongs: true });
            //only rerender when they deleted their query
            if (!this.state.librarySongs) {
                this.setLibrarySongs();
            }
        }
    }

    async playAllSongs(shouldAppend) {

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

            let name = localStorage.getItem('name').split(' ')[0];
            let message = name + ' added songs to the queue.';

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

    playAllNextClicked = () => this.setState({ playAllNextClicked: true });
    playAllNextUnclicked = () => this.setState({ playAllNextClicked: false });

    playAllLaterClicked = () => this.setState({ playAllLaterClicked: true });
    playAllLaterUnclicked = () => this.setState({ playAllLaterClicked: false });

    render() {

        let playAllNextClass = this.state.playAllNextClicked ? 'bigBtnClicked' : 'bigBtn';
        let playAllLaterClass = this.state.playAllLaterClicked ? 'bigBtnClicked' : 'bigBtn';

        return (
            <div style={outer}>
                <div style={playAllButtonsStyle}>
                    <div style={buttonDiv}>
                        <input type='button'
                            className={playAllNextClass}
                            value='Play All Next'
                            onClick={this.playAllSongs.bind(this, false)}
                            onMouseDown={this.playAllNextClicked}
                            onMouseOut={this.playAllNextUnclicked}
                            onMouseUp={this.playAllNextUnclicked}
                        />
                    </div>
                    <div style={buttonDiv}>
                        <input type='button'
                            className={playAllLaterClass}
                            value='Play All Later'
                            onClick={this.playAllSongs.bind(this, true)}
                            onMouseDown={this.playAllLaterClicked}
                            onMouseOut={this.playAllLaterUnclicked}
                            onMouseUp={this.playAllLaterUnclicked}
                        />
                    </div>
                </div>
                <div style={inner}>
                    {this.state.songs}
                </div>
            </div>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <Songs {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
import React from 'react';
import { LiveStreamContext } from '../../../LiveStream';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';
import './playlist.scss';

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%'
}

const imgStyle = { width: '75px' }

const tdStyle = {
    width: '25%',
    height: '75px',
    textAlign: 'center',
}

const pStyle = {
    font: '20px arial, sans-serif',
    fontWeight: '900',
    color: '#fff'
}

class PlaylistSong extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.context.socket,
            loading: true,
            btnClicked: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.context.socket) {
            this.setState({
                socket: nextProps.context.socket,
                loading: false
            });
        }
    }

    addSong = async () => {
        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');

        let song = {
            name: this.props.title,
            artist: this.props.artist,
            album: this.props.album,
            spotifyURI: this.props.uri,
            albumArtSrc: this.props.imgSrc
        };

        let res = await fetch('/addToQueue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomId: roomId,
                type: 'song',
                data: song,
                name: localStorage.getItem('name')
            })
        });
        let resJSON = await res.json();

        if (resJSON.success) {
            //Create the message that we will send to the other users
            //The person that added the song/artist's songs/playlist
            let user = localStorage.getItem('name').split(' ')[0];
            let nextSongsLength = resJSON.nextSongs.length;
            let addedSongName = resJSON.nextSongs[nextSongsLength - 1].name;
            let addedSongArtist = resJSON.nextSongs[nextSongsLength - 1].artist;
            let message = user + ' added ' +
                addedSongName + ' by ' + addedSongArtist + ' to the queue.';

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

    clicked = () => this.setState({ btnClicked: true });
    unclicked = () => this.setState({ btnClicked: false });

    render() {

        let btn_class = this.state.btnClicked ? 'btnClicked' : 'btn';

        return (
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td style={tdStyle}>
                            <img src={this.props.imgSrc} style={imgStyle} alt='Song Art'></img>
                        </td>
                        <td style={tdStyle}>
                            <p style={pStyle}> {this.props.title}</p>
                        </td>
                        <td style={tdStyle}>
                            <p style={pStyle}>{this.props.artist}</p>
                        </td>
                        <td style={tdStyle}>
                            <input type='button'
                                className={btn_class}
                                value='Add Song'
                                onClick={this.addSong} 
                                onMouseDown={this.clicked}
                                onMouseOut={this.unclicked}
                                onMouseUp={this.unclicked}
                                />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <PlaylistSong {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
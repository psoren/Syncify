import React from 'react';
import { LiveStreamContext } from '../../../LiveStream';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';
import Btn from '../artist/Btn';
import './song.scss';

class Song extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.context.socket,
            loading: true
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

    async addSong(shouldAppend) {
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
                shouldAppend: shouldAppend
            })
        });
        let resJSON = await res.json();

        if (resJSON.success) {
            //Create the message that we will send to the other users
            //The person that added the song/artist's songs/playlist
            let user = localStorage.getItem('name').split(' ')[0];
            let message = user + ' added ' + resJSON.msg + ' to the queue.';

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

    render() {
        return (
            <div className='songOuter'>
                <img
                    src={this.props.imgSrc}
                    alt='Song Art'>
                </img>
                <p className='songInfo'> {this.props.title}</p>
                <p className='songInfo'>{this.props.artist}</p>
                <Btn
                    class={'mainBtn'} val={'Play Next'}
                    onClick={this.addSong.bind(this, false)}
                />
                <Btn
                    class={'mainBtn'} val={'Play Later'}
                    onClick={this.addSong.bind(this, true)}
                />
            </div>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <Song {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
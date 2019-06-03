import React from 'react';

export default class extends React.Component {
    render() {
        //Make things shorter if they are too long
        let song = this.props.song;
        let maxLength = 28;
        if (this.props.song.length > maxLength) {
            song = this.props.song.slice(0, maxLength - 3) + '...';
        }
        let artist = this.props.artist;
        if (this.props.artist.length > maxLength) {
            artist = this.props.artist.slice(0, maxLength - 3) + '...';
        }
        return (
            <div className='upNextOuter'>
                <div className='upNextInnerLeft'>
                    <p className='upNextP'>{song}</p>
                    <p classname='upNextP'>{artist}</p>
                </div>
                <img
                    className='upNextImg'
                    src={this.props.imgSrc}
                    alt='Profile'
                />
            </div>
        );
    }
}
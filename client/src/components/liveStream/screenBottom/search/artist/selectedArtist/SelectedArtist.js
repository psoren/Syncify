import React from 'react';
import SelectedArtistHeader from './SelectedArtistHeader';
import ArtistAll from './ArtistAll';
import ArtistLibrary from './ArtistLibrary';
import SelectedArtistAlbum from './SelectedArtistAlbum';
import SelectedArtistSong from './SelectedArtistSong';

const buttonStyle = {
    font: 'bold 18px "helvetica neue", helvetica, arial, sans-serif',
    borderRadius: '2em',
    background: '#2e3192',
    color: 'white',
    width: '9em',
    height: '2em',
    outline: '0',
    margin: '0',
    padding: '0'
}

const artistNameStyle = {
    font: 'bold 28px "helvetica neue", helvetica, arial, sans-serif',
    color: '#fff',
    textAlign: 'center',
    padding: '0',
    margin: '0'
}

const topStyle ={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
}

export default class extends React.Component {

    constructor(props) {
        super(props);

        let imgSrc1 = 'https://upload.wikimedia.org/wikipedia/en/3/35/FooFightersGreatestHits.jpg';
        let imgSrc2 = 'https://milanote.cdn.prismic.io/milanote/df7eeb83a07162b45ac2e882cac055de9411054a_cover.jpg';
        let imgSrc3 = 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2015/12/2015Coldplay_AHeadFullOfDreams271115-1.jpg';

        const albumsRes = [
            {
                id: 1,
                name: 'Album1',
                imgSrc: imgSrc1,
                uri: 'album1'
            },
            {
                id: 2,
                name: 'Album2',
                imgSrc: imgSrc2,
                uri: 'album2'
            },
            {
                id: 3,
                name: 'Album3',
                imgSrc: imgSrc3,
                uri: 'album3'
            },
            {
                id: 4,
                name: 'Album4',
                imgSrc: imgSrc1,
                uri: 'album4'
            }
        ];

        let topAlbums = [];

        albumsRes.forEach((album) => {
            let newAlbum = <SelectedArtistAlbum
                key={album.id}
                name={album.name}
                imgSrc={album.imgSrc}
                uri={album.uri}/>
            topAlbums.push(newAlbum);
        });

        const songsRes = [
            {
                id: 1,
                name: 'Song1',
                imgSrc: imgSrc1,
                uri: 'song1'
            },
            {
                id: 2,
                name: 'Song2',
                imgSrc: imgSrc2,
                uri: 'song2'
            },
            {
                id: 3,
                name: 'Song3',
                imgSrc: imgSrc3,
                uri: 'song3'
            },
            {
                id: 4,
                name: 'Song4',
                imgSrc: imgSrc1,
                uri: 'song4'
            }
        ];

        let topSongs = [];

        songsRes.forEach((song) => {
            let newSong = <SelectedArtistSong
                key={song.id}
                name={song.name}
                imgSrc={song.imgSrc}
                uri={song.uri} />
            topSongs.push(newSong);
        });

        const userSongsRes = [
            {
                id: 1,
                name: 'Song1',
                imgSrc: imgSrc1,
                uri: 'song1'
            },
            {
                id: 2,
                name: 'Song2',
                imgSrc: imgSrc2,
                uri: 'song2'
            },
            {
                id: 3,
                name: 'Song3',
                imgSrc: imgSrc3,
                uri: 'song3'
            },
            {
                id: 4,
                name: 'Song4',
                imgSrc: imgSrc1,
                uri: 'song4'
            },
            {
                id: 5,
                name: 'Song5',
                imgSrc: imgSrc1,
                uri: 'song4'
            },
            {
                id: 6,
                name: 'Song6',
                imgSrc: imgSrc1,
                uri: 'song4'
            },
            {
                id: 7,
                name: 'Song7',
                imgSrc: imgSrc1,
                uri: 'song4'
            }
            
        ];

        const userSongs = []

        userSongsRes.forEach((song) => {
            let newSong = <SelectedArtistSong
                key={song.id}
                name={song.name}
                imgSrc={song.imgSrc}
                uri={song.uri}/>
            userSongs.push(newSong);
        });

        this.state = {
            topAlbums: topAlbums,
            topSongs: topSongs,
            userSongs: userSongs,
            selected: 'Library',
            artistName: 'artistName'
        }
    }

    changeOption = (option) => this.setState({ selected: option });

    render() {
        let selectedComponent;
        if (this.state.selected === 'Library') {
            selectedComponent = <ArtistLibrary
                songs={this.state.userSongs} />
        }
        else if (this.state.selected === 'All') {
            selectedComponent = <ArtistAll
                songs={this.state.topSongs}
                albums={this.state.topAlbums} />
        }
        return (
            <div>
                <div style={topStyle}>
                <input type='button'
                    value='All Artists'
                    style={buttonStyle}
                    onClick={this.props.returnToMainPage} />
                <p style={artistNameStyle}>{this.state.artistName}</p>
                </div>
                <SelectedArtistHeader
                    changeOption={this.changeOption} />
                {selectedComponent}
            </div>
        );
    }
}
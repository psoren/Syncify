import React from 'react';
import Artist from './Artist';
import ArtistImage from './ArtistImage';
import './artists.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedArtistId: null };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult && nextProps.searchResult.artists) {
            this.setSearchedArtists(nextProps);
        }
        else if (nextProps.searchResult === '') {
            this.setTopArtists();
        }
    }

    //Set the state of this component to be the search result
    setSearchedArtists = (props) => {
        let artists = [];
        props.searchResult.artists.items.forEach((artist) => {
            let imgSrc = artist.images[0] ?
                artist.images[0].url : '/defaultPerson.png';
            let newArtistImage = <ArtistImage
                key={artist.id}
                id={artist.id}
                name={artist.name}
                src={imgSrc}
                onClick={this.setSelectedArtistId}
            />
            artists.push(newArtistImage);
        });
        this.setState({
            artists: artists,
            title: 'Results'
        });
    }

    //Set the state of this component to be the user's top artists
    setTopArtists = async () => {
        let topArtistsRes = await fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let topArtistsResJSON = await topArtistsRes.json();
        let artists = [];
        topArtistsResJSON.items.forEach((artist) => {
            let imgSrc = artist.images[0] ?
                artist.images[0].url : '/defaultPerson.png';
            let newArtistImage = <ArtistImage
                key={artist.id}
                id={artist.id}
                name={artist.name}
                src={imgSrc}
                onClick={this.setSelectedArtistId}
            />
            artists.push(newArtistImage);
        });
        this.setState({
            artists: artists,
            title: 'Your Top Artists'
        });
    }

    setSelectedArtistId = (id) =>  this.setState({selectedArtistId: id});

    showArtists = () => this.setState({selectedArtistId: null});

    render() {
        if (this.state.selectedArtistId) {
            return (
                <div className='main'>
                    <Artist
                        id={this.state.selectedArtistId}
                        showArtists={this.showArtists}
                    />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h2 className='artistsTitle'>
                        {this.state.title}
                    </h2>
                    <div
                        className='outerGrid'>
                        {this.state.artists}
                    </div>
                </div>
            );
        }
    }
}
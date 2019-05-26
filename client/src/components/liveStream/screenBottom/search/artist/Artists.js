import React from 'react';
import Artist from './Artist';
//import SelectedArtist from './selectedArtist/SelectedArtist';

const outerGrid = {
    display: 'grid',
    height: '500px',
    overflow: 'auto',
    gridTemplateColumns: 'auto auto auto',
    margin: '10px',
    gridColumnGap: '40px',
    gridRowGap: '10px'
}

const noSearchStyle = {
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    paddingLeft: '75px',
    paddingBottom: "75px",
    font: 'bold 36px "helvetica neue", helvetica, arial, sans-serif',
}

export default class extends React.Component {

    //goToArtistPage = (artistURI) => this.setState({ selectedArtist: artistURI });
    //returnToMainPage = () => this.setState({ selectedArtist: '' });

    setSearchedArtists = (props) => {
        let artists = [];
        props.searchResult.artists.items.forEach((artist) => {
            let imgSrc = '/defaultPerson.png';
            if (artist.images[0]) {
                imgSrc = artist.images[0].url
            }

            let newArtist = <Artist
                key={artist.id}
                id={artist.id}
                name={artist.name}
                imgSrc={imgSrc}
                uri={artist.uri}
                goToArtistPage={this.goToArtistPage}
            />
            artists.push(newArtist);
        });
        this.setState({ artists: artists });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult &&
            nextProps.searchResult.artists) {
            this.setSearchedArtists(nextProps);
        }
        else if (nextProps.searchResult === '') {
            this.setState({ artists: [] });
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    //We will add in the more complicated artist functionality later
    render() {
        let comp = this.state.artists ? this.state.artists :
            <div style={noSearchStyle}>Search for an artist</div>;
        return (<div style={outerGrid}>{comp} </div>);
    }
}
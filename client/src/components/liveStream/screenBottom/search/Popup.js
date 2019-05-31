import React from 'react';
import Header from './Header';
import Songs from './song/Songs';
import Artists from './artist/Artists';
import Playlists from './playlist/Playlists';

let popup = {
    position: 'relative',
    top: '-85%',
    borderRadius: '10px',
    background: 'rgba(10,10,10,0.85)',
    width: '600px', 
    height: '600px'
}

export default class extends React.Component {
    render() {
        let selectedComponent;

        if (this.state.selected === 'track') {
            selectedComponent = <Songs
                searchResult={this.props.searchResult}
                searchParam={this.props.searchParam} />
        }
        else if (this.state.selected === 'artist') {
            selectedComponent = <Artists
                searchResult={this.props.searchResult}
                searchParam={this.props.searchParam} />
        }
        else if (this.state.selected === 'playlist') {
            selectedComponent = <Playlists
                searchResult={this.props.searchResult}
                searchParam={this.props.searchParam} />
        }
        return (
            <div style={popup}>
                <Header changeOption={this.changeOption} />
                {selectedComponent}
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { selected: 'track' };
    }

    changeOption = (option) => {
        this.setState({ selected: option });
        this.props.changeToSearchFor(option);
    }
}
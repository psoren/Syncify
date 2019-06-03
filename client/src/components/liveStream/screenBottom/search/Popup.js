import React from 'react';
import Header from './Header';
import Songs from './song/Songs';
import Artists from './artist/Artists';
import Playlists from './playlist/Playlists';
import './popup.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'track' };
    }

    changeOption = (option) => {
        this.setState({ selected: option });
        this.props.changeToSearchFor(option);
    }

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
            <div className='popupMain'>
                <Header changeOption={this.changeOption} />
                {selectedComponent}
            </div>
        );
    }
}
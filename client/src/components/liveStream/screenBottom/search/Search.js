import React from 'react';
import Popup from './Popup';
import './searchStyles.scss';

const outer = {
	width: '350px'
};

const search = {
	width: '100%',
	border: 'none',
	borderBottom: '5px solid white',
	font: 'bold 80px "helvetica neue", sans-serif',
	background: 'none',
	color: 'white',
	outline: 'none'
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			showPopup: false,
			toSearchFor: 'track'
		};
	}

	//Either songs, artists, or playlists
	changeToSearchFor = (option) => this.setState({ toSearchFor: option });
	componentDidMount = () => document.addEventListener('mousedown', this.handleClick, false);
	componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClick, false);

	handleClick = (e) => this.setState({
		showPopup: this.node.contains(e.target),
		value: (this.node.contains(e.target)) ? this.state.value : '',
		searchResult: (this.node.contains(e.target)) ? this.state.searchResult : ''
	});

	performSearch = async (val) => {
		let searchArr = val.split(' ');
		let properSearchTerm = searchArr.join('%20');
		let numItemsToSearchFor = 20;
		let params = 'q=' + properSearchTerm + '&' +
			'type=' + this.state.toSearchFor + '&' +
			'limit=' + numItemsToSearchFor + '&' +
			'market=US';
		let searchRes = await fetch('https://api.spotify.com/v1/search?' + params, {
			headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
		});
		let searchResJSON = await searchRes.json();
		this.setState({ searchResult: searchResJSON });
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
		if (e.target.value !== '') {
			this.performSearch(e.target.value);
		}
		else {
			this.setState({ searchResult: '' });
		}
	}

	handleSubmit = (e) => e.preventDefault();

	render() {
		return (
			<div
				style={outer}
				ref={node => this.node = node}
			>
				{(this.state.showPopup) ? <Popup
					changeToSearchFor={this.changeToSearchFor}
					searchResult={this.state.searchResult}
					searchParam={this.value}
				/> : null}
				<form onSubmit={this.handleSubmit}
					onChange={this.handleChange}>
					<input
						placeholder='Search...'
						style={search}
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</form>
			</div>
		);
	}
}
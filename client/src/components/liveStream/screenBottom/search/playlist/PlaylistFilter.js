import React from 'react';

const searchStyle = {
	width: '200px',
	border: 'none',
	borderBottom: '2px solid white',
	font: 'bold 24px "helvetica neue", helvetica, arial, sans-serif',
	background: 'none',
	color: 'white',
	outline: 'none',
	placeholder: '#fff'
}

export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {value:''};
    }

    handleChange = (e) => {
		this.setState({ value: e.target.value });
        this.props.setSearchedSongs(e.target.value);
	}

    render() {
        return (
            <input placeholder='Filter'
                style={searchStyle}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}
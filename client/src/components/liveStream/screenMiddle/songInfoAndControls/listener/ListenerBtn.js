import React from 'react';
import 'styling/styles.scss';

const clickedStyle = {
    font: '20px arial, sans-serif',
    borderRadius: '1em',
    color: '#fff',
    background: '#00005F',
    padding: '0.7em 1.5em',
    width: '7em',
    outline: '0',
    border: '1px solid white'
}

const unClickedStyle = {
    ...clickedStyle,
    background: '#2e3192'
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clicked: false }
    }

    btnClicked = (e) => {
        this.setState({ clicked: !this.state.clicked });
        this.props.onClick(e);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ clicked: nextProps.clicked });
    }

    render() {
        return (
            <button style={this.state.clicked ?
                clickedStyle : unClickedStyle}
                onClick={this.btnClicked}
                togglestate={this.toggle}
                className='btn'>
                Listeners
                </button>
        );
    }
}



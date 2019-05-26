import React from 'react';
import './headerStyles.css';

const outer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    margin: '25px',
    padding: '10px',
    borderBottom: '1px solid white'
}

const innerUnselected = {
    font: 'bold 32px "helvetica neue", helvetica, arial, sans-serif',
    color: '#fff'
}

const innerSelected = {
    ...innerUnselected,
    borderBottom: '3px solid #2e3192'
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'Library' }
    }

    libraryClicked = () => {
        this.setState({ selected: 'Library' });
        this.props.changeOption('Library');
    }

    allClicked = () => {
        this.setState({ selected: 'All' });
        this.props.changeOption('All');
    }

    render() {
        return (
            <div style={outer}>
                <div className='innerItem'
                    style={this.state.selected === 'Library' ?
                        innerSelected : innerUnselected}
                    onClick={this.libraryClicked}>
                    Library</div>
                <div className='innerItem'
                    style={this.state.selected === 'All' ?
                        innerSelected : innerUnselected}
                    onClick={this.allClicked}>
                    All</div>
            </div>
        );
    }
}
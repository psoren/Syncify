import React from 'react';
import 'styling/styles.scss';

export default class extends React.Component {
    render() {
        return (<button 
            style = {this.props.style}
            onClick = {this.props.onClick}
            className='btn'
            onMouseDown = {this.props.onMouseDown}
            onMouseOut={this.props.onMouseOut}
            >Create</button>);
    }
}
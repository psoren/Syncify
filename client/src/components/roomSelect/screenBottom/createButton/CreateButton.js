import React from 'react';
import CreateButtonForm from './CreateButtonForm';
import CreateButtonInit from './CreateButtonInit';
import './createButton.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    componentWillMount = () => document.addEventListener('mousedown', this.handleClick);
    componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClick);

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.setState({ clicked: false });
        }
    }

    onMouseDown = () => {
        if (!this.state.clicked) {
            this.setState({ clicked: true });
        }
    }

    onMouseOut = () => this.setState({ clicked: false });

    onClick = () => this.setState({ clicked: true });

    render() {
        return (<div ref={node => this.node = node}
            style={this.state.style}>
            {this.state.clicked ?
                <CreateButtonForm /> :
                <CreateButtonInit
                    onClick={this.onClick}
                    onMouseOut={this.onMouseOut}
                    onMouseDown={this.onMouseDown}
                />
            }</div>);
    }
}
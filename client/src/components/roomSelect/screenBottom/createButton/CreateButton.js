import React from 'react';
import CreateButtonForm from './CreateButtonForm';
import CreateButtonInit from './CreateButtonInit';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            style: {
                font: 'bold 36px "helvetica neue", helvetica, arial, sans-serif',
                borderRadius: '4em',
                background: '#2e3192',
                color: 'white',
                width: '6em',
                height: '6em',
                border: '1px solid white',
                outline: 0
            }
        }
    }

    componentWillMount = () => document.addEventListener('mousedown', this.handleClick, false);
    componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClick, false);

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.setState({
                clicked: false,
                style: { ...this.state.style, background: '#2e3192' }
            });
        }
    }

    onMouseDown = () => {
        if (!this.state.clicked) {
            this.setState({style:{...this.state.style,  background: '#00005F'}});
        }
    }

    onMouseOut = () => this.setState({ style: { ...this.state.style, background: '#2e3192' } });

    onClick = () => this.setState({ background: '#00005F', clicked: true });

    render() {
        let comp = this.state.clicked ? <CreateButtonForm /> :
            <CreateButtonInit
                style={this.state.style}
                onClick={this.onClick}
                onMouseOut={this.onMouseOut}
                onMouseDown={this.onMouseDown} />

        return (<div ref={node => this.node = node}
            style={this.state.style}>{comp}</div>);
    }
}
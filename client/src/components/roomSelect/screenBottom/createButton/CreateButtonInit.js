import React from 'react';
import '../screenBottom.scss';

export default class extends React.Component {

    componentWillMount = () =>
        document.addEventListener('mousedown', this.handleClick);

    componentWillUnmount = () =>
        document.removeEventListener('mousedown', this.handleClick);

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            this.props.goToForm();
        }
    }

    render() {
        return (
            <button
                ref={node => this.node = node}
                className='roomSelectOuterBtn'
            >
                Create
            </button>
        );
    }
}
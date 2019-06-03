import React from 'react';
import JoinButtonForm from './JoinButtonForm';
import JoinButtonInit from './JoinButtonInit';

export default class extends React.Component {
    constructor() {
        super();
        this.state = { clicked: false };
    }

    changeState = () => this.setState({ clicked: !this.state.clicked });

    render() {
        return this.state.clicked ?
            <JoinButtonForm resetState={this.changeState} /> :
            <JoinButtonInit goToForm={this.changeState} />;
    }
}
import React from 'react';
import CreateButtonForm from './CreateButtonForm';
import CreateButtonInit from './CreateButtonInit';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    changeState = () => this.setState({ clicked: !this.state.clicked });

    render() {
        return this.state.clicked ?
            <CreateButtonForm
                resetState={this.changeState}
            /> :
            <CreateButtonInit
                goToForm={this.changeState}
            />;
    }
}
import React from 'react';
import 'styling/styles.scss';

export default class extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    clicked = () => this.setState({ clicked: true });
    unclicked = () => this.setState({ clicked: false });

    render() {
        let btnClass = this.state.clicked ?
            this.props.class + 'Clicked' : this.props.class;

        return (
            <input type='button'
                className={btnClass}
                value={this.props.val}
                onClick={this.props.onClick}
                onMouseDown={this.clicked}
                onMouseOut={this.unclicked}
                onMouseUp={this.unclicked}
            />
        );
    }
}
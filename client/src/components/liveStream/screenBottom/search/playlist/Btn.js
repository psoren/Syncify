import React from 'react';
import 'styling/styles.scss';

const buttonStyle = {
    font: 'bold 16px "helvetica neue", helvetica, arial, sans-serif',
    borderRadius: '4em',
    background: '#2e3192',
    color: 'white',
    padding: '0.5em 1.2em',
    width: '9em',
    outline: '0'
}

export default class extends React.PureComponent {
    render() {
        return (
            <input
                className='btn'
                type='button'
                style={buttonStyle}
                value={this.props.btnValue}
                onClick={this.props.onClick}
            />);
    }
}
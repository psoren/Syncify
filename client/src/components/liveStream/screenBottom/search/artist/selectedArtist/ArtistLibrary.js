import React from 'react';

const outerStyle = {
    height: '325px',
    overflow: 'auto',
}

const songStyle = {
    width: '90%',
    textAlign: 'center'
}

export default class extends React.Component {
    render() {
        return (
            <div style={outerStyle}>
                <div style={songStyle}>
                    {this.props.songs}
                </div>
            </div>);
    }
}
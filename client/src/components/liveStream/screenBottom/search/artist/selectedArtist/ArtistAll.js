import React from 'react';

const outerStyle = {
    height: '325px',
    overflow: 'auto'
}

const songStyle = {
    width: '90%',
    textAlign: 'center'
}

const albumsList = {
    display: 'grid',
    height: '500px',
    overflow: 'auto',
    gridTemplateColumns: 'auto auto auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    justifyContent: 'center',
    gridColumnGap: '40px',
    gridRowGap: '0px'
}

const hrStyle = {
    color: '#fff',
    width: '80%'
}

export default class extends React.Component {
    render() {
        return (
            <div style={outerStyle}>
                <div style = {songStyle}>
                    {this.props.songs}
                </div>
                <hr style ={hrStyle}></hr>

                <div style={albumsList}>
                    {this.props.albums}
                </div>
            </div>
        );
    }
}
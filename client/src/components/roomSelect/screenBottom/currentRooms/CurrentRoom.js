import React from 'react';
import JoinCurrentRoomButton from './JoinCurrentRoomButton';

const mainStyle = {
    marginBottom: '10px'
}

const rowStyle = {
    height: '100px'
}

const friendsStyle = {
    color: '#fff',
    textAlign: 'center',
    margin: '0'
}

const right = {
    borderLeft: '2px solid #fff',
    height: '80%',
    padding: '10px 0 10px 10px'
}

const middle = {
    borderLeft: '2px solid #fff',
    height: '80%',
    padding: '10px 0 10px 10px',
    width: '100px'

}

const imgStyle = {
    width: '100px',
    padding: '5px'
}

const titleStyle = {
    padding: '0px',
    margin: '0px',
    textAlign: 'center'
}

export default class extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2 style={titleStyle}>{this.props.roomName}</h2>
                <table style={mainStyle}>
                    <tbody>
                        <tr style={rowStyle}>
                            <td>
                                <img src={this.props.photo}
                                    style={imgStyle}
                                    alt="a pic" />
                                <h5 style={friendsStyle}>{this.props.creator.split(' ')[0]}</h5>
                            </td>
                            <td style={middle}>
                                {this.props.song}
                                <br />
                                {this.props.artist}
                            </td>
                            <td style={right}>
                                <JoinCurrentRoomButton
                                    roomId={this.props.roomId}
                                    onClick={this.props.onClick}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
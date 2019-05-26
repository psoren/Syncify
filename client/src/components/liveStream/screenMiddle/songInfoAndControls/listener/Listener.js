import React from 'react';

const tableStyle = {
    borderCollapse: 'collapse'
}

const imgStyle = {
    width: '75px'
}

const td1Style = {
    width: '50px',
    height: '75px',
    textAlign: 'center',
}

const td2Style = {
    width: '200px',
    height: '75px',
    textAlign: 'center',
}

const pStyle = {
    font: '20px arial, sans-serif',
    fontWeight: '900',
    color: '#fff'
}

export default class extends React.Component {
    render() {
        return (
            <table style={tableStyle} key={this.props.i}>
                <tbody key={this.props.i}>
                    <tr key={this.props.i}>
                        <td style={td1Style} key={this.props.i}>
                            <img
                                src={this.props.imgSrc}
                                style={imgStyle}
                                alt='Profile'
                                key={this.props.i}></img>
                        </td>
                        <td style={td2Style} key={this.props.i}>
                            <p style={pStyle}
                                key={this.props.i}>
                                {this.props.firstName}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>);
    }
}
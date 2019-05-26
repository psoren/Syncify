import React from 'react';

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginLeft: '75px',
    marginRight: 'auto'
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

const buttonStyle = {
    font: 'bold 12px "helvetica neue", helvetica, arial, sans-serif',
    borderRadius: '4em',
    background: '#2e3192',
    color: 'white',
    padding: '0.7em 1.5em',
    width: '9em',
    outline: '0'
}

export default class extends React.Component {

    addSong = () => console.log('(Song) Add the clicked song to the queue');
    
    render() {
        return (
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td style={td1Style}>
                            <img src={this.props.imgSrc} style={imgStyle} alt='Song Art'></img>
                        </td>
                        <td style={td2Style}>
                            <p style={pStyle}> {this.props.name}</p>
                        </td>
                        <td>
                            <input type='button'
                                value='Add Song'
                                style={buttonStyle}
                                onClick={this.addSong} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
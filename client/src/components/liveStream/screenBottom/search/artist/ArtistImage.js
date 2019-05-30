import React from 'react';
import './artists.scss';

export default class ArtistImage extends React.PureComponent {

    onClick = () => this.props.onClick(this.props.id);
    
    render() {
        return (
            <div className='albumImageMain'>
                <h3 className='albumImageName'>
                    {this.props.name}
                </h3>
                <img
                    className='albumImage'
                    src={this.props.src}
                    onClick={this.onClick}
                    alt='Artist'
                >
                </img>
            </div>
        );
    }
}


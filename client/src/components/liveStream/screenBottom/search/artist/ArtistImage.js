import React from 'react';
import './artistImage.scss';

export default class ArtistImage extends React.PureComponent {

    onClick = () => this.props.onClick(this.props.id);
    
    render() {
        return (
            <div className='artistImageMain'>
                <img
                    className='artistImage'
                    src={this.props.src}
                    onClick={this.onClick}
                    alt='Artist'
                >
                </img>
                <h3 className='artistImageName'>
                    {this.props.name}
                </h3>
            </div>
        );
    }
}


import React from 'react';
import { LiveStreamContext } from 'components/liveStream/LiveStream';
import './togglePublic.scss';

class TogglePublic extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket,
            isPlaying: props.isPublic,
            loading: true
        };
    }

    componentWillReceiveProps = (nextProps) => this.setState({
        loading: false,
        socket: nextProps.socket,
        isPlaying: nextProps.isPlaying
    });

    togglePlayback = () => {
        if (!this.state.loading) {
            let currentURL = new URL(window.location.href);
            this.state.socket.emit('togglePublic', {
                roomId: currentURL.searchParams.get('roomId'),
                isPublic: this.state.isPublic
            });
        }
    }

    render() {
        return (
            <button
                onClick={this.togglePublic}
                style={{
                    background: this.state.isPublic
                        ? 'url(../unlocked.svg)'
                        : 'url(../locked.svg)'
                }}
                className='togglePublicBtn'>
            </button>
        );
    }
}

export default props => (<LiveStreamContext.Consumer>
    {context => { return <TogglePublic {...props} context={context} /> }}
</LiveStreamContext.Consumer>)
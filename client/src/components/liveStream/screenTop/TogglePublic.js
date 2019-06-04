import React from 'react';
import { LiveStreamContext } from 'components/liveStream/LiveStream';
import './togglePublic.scss';

class TogglePublic extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isPublic: true };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.context.socket) {
            this.setState({
                socket: nextProps.context.socket,
                isPublic: nextProps.isPublic
            });
        }
    }

    togglePublic = () => {
        if (!this.state.loading) {
            let currentURL = new URL(window.location.href);
            if (this.state.socket) {
                this.state.socket.emit('togglePublic',
                    currentURL.searchParams.get('roomId'));
            }
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
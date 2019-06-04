import React from 'react';
import './roomSettings.scss';
import Switch from 'react-switch';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            animate: false
        };
    }

    componentWillMount = () =>
        document.addEventListener('mousedown', this.outsideClick);

    componentWillUnmount = () =>
        document.removeEventListener('mousedown', this.outsideClick);

    outsideClick = (e) => {
        if (this.state.clicked
            && !this.settingsRef.contains(e.target)
            && !this.buttonRef.contains(e.target)) {
            this.setState({ clicked: false });
        }
    }

    toggleState = () => this.setState({ clicked: !this.state.clicked });

    toggleAnimate = () => {
        this.setState({ animate: !this.state.animate }, () => {
            if (this.state.animate) {
                document.body.classList.remove('staticBackground');
                document.body.classList.add('animateBackground');
            }
            else {
                document.body.classList.remove('animateBackground');
                document.body.classList.add('staticBackground');
            }
        });
    }

    render() {
        return (
            <div className='roomSettingsOuter'>
                <button
                    ref={buttonRef => this.buttonRef = buttonRef}
                    style={{ background: 'url(../settings.svg)' }}
                    className='roomSettingsBtn'
                    onClick={this.toggleState}>
                </button>
                {this.state.clicked ? <div className='roomSettingsList'
                    ref={settingsRef => this.settingsRef = settingsRef}>
                    {
                        <div className='switchAndLabel'>
                            <span>Animate:</span>
                            <Switch
                                onChange={this.toggleAnimate}
                                checked={this.state.animate}
                                handleDiameter={28}
                                offColor="#9b17d8"
                                onColor="#40e6ca"
                                offHandleColor="#40e6ca"
                                onHandleColor="#9b17d8"
                                height={40}
                                width={70}
                                className="react-switch"
                                id="small-radius-switch"
                            />
                        </div>
                    }
                </div> : null}
            </div>
        );
    }
}
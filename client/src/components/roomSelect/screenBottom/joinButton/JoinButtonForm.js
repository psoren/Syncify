import React from 'react';
import { Redirect } from 'react-router-dom';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../screenBottom.scss';

export default class extends React.Component {

  constructor() {
    super();
    this.state = {
      roomId: '',
      roomFound: false
    };
  }

  handleChange = (e) => this.setState({ roomId: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('/joinRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: this.state.roomId,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      })
    });
    let resJSON = await res.json();

    if (resJSON.success) {
      this.setState({ roomFound: true });
    }
    else {
      toaster.notify("We couldn't find the room with id '" + this.state.roomId + "'", { duration: 2000 });
    }
  }

  componentWillMount = () =>
    document.addEventListener('mousedown', this.handleClick);

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.handleClick);

  handleClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.props.resetState();
    }
  }

  render() {
    if (this.state.roomFound) {
      return (<Redirect to={'/livestream/?roomId=' + this.state.roomId} />);
    }
    else {
      return (
        <form
          ref={node => this.node = node}
          onSubmit={this.handleSubmit}
          className='roomSelectForm'
        >
          <input
            className='roomSelectInput'
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder='Room id:'
          />
          <input
            type="submit"
            value="Join Room"
            className='roomSelectBtn'
          />
        </form>
      );
    }
  }
}
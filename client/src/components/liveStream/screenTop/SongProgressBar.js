import React from 'react';
import './songProgressBar.scss';

export default class SongProgressBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = { percentDone: 0 };
	}

	componentWillReceiveProps = (nextProps) =>
		this.setState({ percentDone: nextProps.percentDone });

	render() {
		return (
			<div className='barOuter'>
				<div className='barInner'
					style={{ width: `${this.state.percentDone * 100}%` }}
				>
				</div>
			</div>
		);
	}
}

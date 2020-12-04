import React, { Component } from 'react';
import { isIE } from 'react-device-detect';
import './ButtonSet.scss';

class ButtonSet extends Component {
	renderDeleteIcon() {
		if (this.props.isStatic) {
			return;
		}
		if(isIE) {
			return(
				<span className="rmv" onClick={this.props.remove}>
					<img src={process.env.PUBLIC_URL + 'images/btn_delete.png'}  alt="remove table" />
				</span>
			);
		}
		return(
			<span className="rmv" onClick={this.props.remove}>
				<img src={process.env.PUBLIC_URL + 'images/btn_delete.svg'}  alt="remove table" />
			</span>
		);
	}

	render() {
		return (
			<div className="buttonset">
				<span>{!!this.props.isStatic}</span>
				<button className="btn" onClick={this.props.copy}>Copy table</button>
				{this.renderDeleteIcon()}
			</div>
		);
	};
}

export default ButtonSet;
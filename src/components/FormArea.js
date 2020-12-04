import React, { Component } from 'react';
import './FormArea.scss';


class FormArea extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.currentUser;
		this.validationRules = {
			name: 'required|alpha_space',
			surname: 'required|alpha_space',
			age: 'required|numeric',
			city: 'required|alpha_space'
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(event, key) {
		this.setState({[key]: event.target.value})
	}

	showCancelButton() {
		if(this.props.currentUser.name.length) {
			return (
				<button type="cancel" className="mainform__input mainform__input_cancel btn btn_cancel" onClick={this.props.cancel}>CANCEL</button>
			);
		}
		return;
	}

	render() {
		if (this.state) {
			const inputList = Object.keys(this.state).map((key) => {
				return (
					<div key={key}>
						<input className="mainform__input" type="text" key={'input-' + key}  name={key} value={this.state[key]} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} onChange={(event) => this.handleChange(event, key)}/>
						{this.props.validator.message(key, this.state[key], this.validationRules[key])}
					</div>
				);

			});
			return (
				<form className="mainform" onSubmit={(event) => {this.props.submit(event, this.state)}}>
					{inputList}
					<button type="submit" className="mainform__input mainform__input_submit btn">{this.props.currentUser.name.length ? 'EDIT' : 'ADD'}</button>
					{this.showCancelButton()}
				</form>
			);
		} else {
			return (
				<p>No Data</p>
			);
		}
	};
}

export default FormArea;
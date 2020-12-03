import React, { Component } from 'react';
import './FormArea.scss';
//валидация, реактивная форма, typescript

class FormArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: {
				name: this.props.currentUser ? this.props.currentUser.name : '',
				surname: this.props.currentUser ? this.props.currentUser.surname : '',
				age: this.props.currentUser ? this.props.currentUser.age : '',
				city: this.props.currentUser ? this.props.currentUser.city : ''
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateField = this.validateField.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.currentUser);
		return this.state.currentUser;
	}

	validateField(event, key) {
		console.log(event, key);
	}

	render() {
		if (this.state.currentUser) {
			const inputList = Object.keys(this.state.currentUser).map((key) => {
				return <input className="mainform__input" type="text" key={key} value={this.state.currentUser[key]} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} onChange={(event) => this.validateField(event, key)}/>
			});
			return (
				<form className="mainform" onSubmit={this.handleSubmit}>
					{inputList}
					<input type="submit" className="mainform__input mainform__input_submit" value={this.props.currentUser ? 'EDIT' : 'ADD'} />
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
import React, { Component } from 'react';
import './App.scss';
import FormArea from './FormArea';
import Table from './Table';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			tableList: [{
				static: true,
				userList: []
			}, {
				userList: [{
					name: 'Name',
					surname: 'Surname',
					age: 'age',
					city: 'city'
				}]
			}]
		};
		this.handleRowClick = this.handleRowClick.bind(this);
	}

	handleRowClick(e) {
		e.preventDefault();
	}

	render() {
		return (
			<div className="App">
				<FormArea currentUser={this.currentUser}/>
				{this.state.tableList.map((item, key) =>
					<Table key={key} data={item} rowClick={ this.handleRowClick }/>
				)}
			</div>
		);
	}
}

export default App;
import React, { Component } from 'react';
import './App.scss';
import FormArea from './FormArea';
import Table from './Table';
import cloneDeep from 'lodash/cloneDeep';
import SimpleReactValidator from 'simple-react-validator';
const emptyUser =  {
	name: '',
	surname: '',
	age: '',
	city: ''
}

class App extends Component {
	constructor(props) {
		
		super(props);
		this.state = {
			currentUser: emptyUser,
			editableTable: null,
			editableElement: null,
			tableList: [{
				isStatic: true,
				userList: []
			}]
		};
		this.validator = new SimpleReactValidator({autoForceUpdate: this});
		this.validateForm = this.validateForm.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
		this.handleCopyTable = this.handleCopyTable.bind(this);
		this.handleRemoveTable = this.handleRemoveTable.bind(this);
		this.count = 0;
	}

	submitField(userData) {
		const tableListCopy = cloneDeep(this.state.tableList);
		// EDIT
		if (this.state.editableTable && this.state.editableElement) {
			tableListCopy[this.state.editableTable - 1].userList[this.state.editableElement - 1] = userData;
		} else {
		// ADD
			let mainTableCopy = null;
			mainTableCopy = [...tableListCopy[0].userList, userData];
			tableListCopy[0].userList = mainTableCopy;
		}
		
		this.setState({ tableList: tableListCopy });
		this.cancelEdit();
	}

	validateForm(e, userData) {
		e.preventDefault();
		if (this.validator.allValid()) {
			this.validator.hideMessages();
			this.submitField(userData);
		} else {
			this.validator.showMessages();
		}
	}

	cancelEdit(e) {
		if(e) {
			e.preventDefault();
		}
		this.setState({
			currentUser: emptyUser,
			editableTable: null,
			editableElement: null
		});
		this.count++;
	}

	handleEditClick(element, tIndex, eIndex) {
		this.setState({
			currentUser: element,
			editableTable: tIndex,
			editableElement: eIndex
		});
		this.count++;
	}

	handleRemoveClick(tIndex, eIndex) {
		this.setState({
			currentUser: emptyUser,
			editableTable: tIndex,
			editableElement: eIndex
		});
		if (tIndex && eIndex) {
			const tableListCopy = cloneDeep(this.state.tableList)
			tableListCopy[tIndex - 1].userList.splice(eIndex - 1, 1);
			this.setState({ tableList: tableListCopy });
			this.cancelEdit();
		}	
		return;
	}

	handleCopyTable(table) {
		const tableCopy = cloneDeep(this.state.tableList);
		table.isStatic = false;
		tableCopy.push(table);
		this.setState({ tableList: tableCopy });
	}

	handleRemoveTable(table) {
		const tableListCopy = [...this.state.tableList];
		const index = tableListCopy.indexOf(table);
		if (index !== -1) {
			tableListCopy.splice(index, 1);
			this.setState({tableList: tableListCopy});
		}
	}

	render() {
		return (
			<div className="App">
				<section className="container">
					<FormArea
					currentUser={this.state.currentUser}
					key={this.count}
					cancel={this.cancelEdit}
					submit={this.validateForm}
					validator={this.validator}
				/>
				</section>
				{this.state.tableList.map((item, key) =>
					<Table
						key={'table-' + key + '-' + this.count}
						tableIndex={key}
						data={item}
						editItemClick={ this.handleEditClick }
						removeItemClick={ this.handleRemoveClick }
						copyTable={this.handleCopyTable}
						removeTable={this.handleRemoveTable}
					/>
				)}
			</div>
		);
	}
}

export default App;
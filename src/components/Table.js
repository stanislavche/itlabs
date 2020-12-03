import React, { Component } from 'react';
import './Table.scss';
//валидация, реактивная форма, typescript

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userList: this.props.data ? this.props.data.userList : [],
			static: this.props.data ? this.props.data.static : false,
		};

		this.removeTable = this.removeTable.bind(this);
		this.copyTable = this.copyTable.bind(this);
	}

	copyTable(event) {
		event.preventDefault();
		console.log(this.state.currentUser);
		return this.state.currentUser;
	}

	removeTable(event) {
		event.preventDefault();
	}

	render() {
		if (this.state.userList.length) {
			return (
				<table className="table">
					<thead>
						<tr className="table__row">
							<td className="table__cell table__cell_header">
								Name
							</td>
							<td className="table__cell table__cell_header">
								Surname
							</td>
							<td className="table__cell table__cell_header">
								Age
							</td>
							<td className="table__cell table__cell_header">
								City
							</td>
							<td className="table__cell table__cell_header"></td>
						</tr>
					</thead>
					<tbody>
						{this.state.userList.map((item, key) =>
							<tr className="table__row" key={key}>
								<td className="table__cell">
									{ item.name }
								</td>
								<td className="table__cell">
									{ item.surname }
								</td>
								<td className="table__cell">
									{ item.age }
								</td>
								<td className="table__cell">
									{ item.city }
								</td>
								<td className="table__cell">
									edit
									remove
								</td>
							</tr>
						)}
					</tbody>
				</table>
			);
		} else {
			return (<p>Please add first user</p>);
		}
	};
}

export default Table;
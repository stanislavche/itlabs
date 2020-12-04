import React, { Component } from 'react';
import './Table.scss';
import ButtonSet from './ButtonSet';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userList: this.props.data ? this.props.data.userList : [],
			isStatic: this.props.data ? this.props.data.isStatic : false
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(JSON.stringify(this.props.data.userList) !== JSON.stringify(prevState.userList)) {
			this.setState({
				userList: this.props.data ? this.props.data.userList : [],
				isStatic: this.props.data ? this.props.data.isStatic : false
			});
		}
	}

	render() {
		if (this.state.userList && this.state.userList.length) {
			return (
				<section className="container">
					<ButtonSet isStatic={this.props.data.isStatic} copy={() => {this.props.copyTable({...this.props.data})}} remove={() => {this.props.removeTable(this.props.data)}} />
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
								<tr className="table__row" key={this.props.tableIndex + '-' + key} >
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
										<div className="button-container">
											<span className="custom-btn custom-btn_edit" onClick={() => {this.props.editItemClick(item, this.props.tableIndex + 1, key + 1)}}>Edit</span>
											<span className="custom-btn custom-btn_rmv" onClick={() => {this.props.removeItemClick(this.props.tableIndex + 1, key + 1)}}>Delete</span>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</section>
			);
		} else {
			return (
				<section className="container">
					<p>Please add first user</p>
				</section>
			);
		}
	};
}

export default Table;
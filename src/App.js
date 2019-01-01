import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			autor: 'Taras',
			persons: []
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {
		axios
			.get('https://randomuser.me/api/')
			.then((res) => {
				this.setState({
					persons: res.data.results,
					loading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		console.log(this.state);
		const persons = this.state.persons.map((item, i) => (
			<div key={i}>
				<h1>{item.name.first}</h1>
				<span>
					{item.cell}, {item.email}
				</span>
			</div>
		));
		return (
			<div>
				{this.state.loading === false && (
					<div>
						<h1>My name is {this.state.autor}</h1>
						<div>{persons}</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			autor: 'Taras',
			persons: [],
			namePeople: ''
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

	changeName = (e) => {
		e.preventDefault();
		this.setState({
			namePeople: e.target.value
		});
	};

	render() {
		console.log(this.state);
		const persons = this.state.persons.map((item, i) => (
			<div key={i}>
				{this.state.namePeople.length > 0 && <h1>Name: {this.state.namePeople}</h1>}
				{this.state.namePeople.length === 0 && <h1>Name: {item.name.first}</h1>}
				<img src={item.picture.large} alt="" />
				<h4> City: {item.location.city}</h4>
				<span>
					Phone: {item.cell}, Email: {item.email}
				</span>
			</div>
		));
		return (
			<div className="container">
				{this.state.loading === false && (
					<div>
						<h1>My name is {this.state.autor}</h1>
						<div>{persons}</div>
						<form>
							<label>
								Chage Name:
								<input onChange={this.changeName.bind(this)} type="text" name="name" />
							</label>
						</form>
					</div>
				)}
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Image, Grid, Row, Col, Jumbotron, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
				{this.state.namePeople.length > 0 && (
					<h2>
						Name:
						{' ' +
							this.state.namePeople.charAt(0).toUpperCase() +
							this.state.namePeople.substring(1, this.state.namePeople.length)}
					</h2>
				)}
				{this.state.namePeople.length === 0 && (
					<h2>
						Name:
						{' ' +
							item.name.first.charAt(0).toUpperCase() +
							item.name.first.substring(1, item.name.first.length)}
					</h2>
				)}
				<Grid>
					<Row>
						<Col xs={6} md={4}>
							<Image src={item.picture.large} circle />
						</Col>
					</Row>
				</Grid>
				<h4>Age: {item.dob.age}</h4>
				<h4>
					City:
					{' ' +
						item.location.city.charAt(0).toUpperCase() +
						item.location.city.substring(1, item.location.city.length)}
				</h4>
				<span>
					<h5>
						Phone: {item.cell}; Email: {item.email}
					</h5>
				</span>
			</div>
		));
		return (
			<div className="container">
				<Jumbotron>
					{this.state.loading === false && (
						<div>
							<h1>Random users {this.state.autor}</h1>
							<div>{persons}</div>
							<form>
								<FormGroup>
									<ControlLabel>Change Name</ControlLabel>
									<FormControl
										onChange={this.changeName.bind(this)}
										type="text"
										name="name"
										placeholder="Enter name"
									/>
									<FormControl.Feedback />
								</FormGroup>
							</form>
						</div>
					)}
				</Jumbotron>
			</div>
		);
	}
}

export default App;

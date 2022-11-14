import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [
				{name: "Joahn Smith", salary: 500, increase: false, rise: false, id: 1},
				{name: "Mykyta Mandryka", salary: 1250, increase: true, rise: true, id: 2},
				{name: "Alex Fsdf", salary: 5000, increase: false, rise: false, id: 3} 
			],
			term: '',
			filter: 'all'
		}
	}
	
	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
		this.setState(({data}) => ({
			data: data.map((item,i) => ({...item, id: i+1}))
		}))
	}

	addItem = (name, salary) => {
		const newItem = {
			name, 
			salary,
			increase: false,
			rise: false,
			id: this.state.data.length + 1
		}
		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		}); 
    }

	onToggleIncrease = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if(item.id === id) {
					return {...item, increase: !item.increase}
				}
				return item;
			})
		}))
	}

	onToggleRise = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if(item.id === id) {
					return {...item, rise: !item.rise}
				}
				return item;
			})
		}))
	}

	searchEmployee = (items, term) => {
		if(term.length === 0) {
			return items;
		}

		return items.filter(item => item.name.indexOf(term) !== -1)
	}

	onUpdateSeacrh = (term) => {
		this.setState({term});
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case "rise":
				return items.filter(item => item.rise)

			case "salaryOver1000":
				return items.filter(item => item.salary > 1000)
				
			default:
				return items
		}	
	}

	onFIlterSelect = (filter) => {
		this.setState({filter})
	}

	render() {
		const {data, term, filter} = this.state; 
		const incresed = data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmployee(data, term), filter);

		return (
			<div className="app">
				<AppInfo 
				employeesAmount={data.length}
				incresed={incresed}/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSeacrh={this.onUpdateSeacrh}/>
					<AppFilter 
					filter={filter}
					onFIlterSelect={this.onFIlterSelect}/>
				</div>
				
				<EmployeesList 
				data={visibleData}
				onDelete={this.deleteItem}
				onToggleIncrease={this.onToggleIncrease}
				onToggleRise={this.onToggleRise}
				/>
				<EmployeesAddForm onAdd={this.addItem}/>
			</div>
		);
	}
}

export default App;
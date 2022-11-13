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
				{name: "John Smith", salary: 2300, increase: false, id: 1},
				{name: "Mykyta Mandryka", salary: 1250, increase: true, id: 2},
				{name: "Alex Fsdfa", salary: 5000, increase: false, id: 3} 
			]
		}
	}
	
	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
		
	}

	addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            id: this.state.data.length + 1
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

	render() {
		return (
			<div className="app">
				<AppInfo />
	
				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
				
				<EmployeesList 
				data={this.state.data}
				onDelete={this.deleteItem}/>
				<EmployeesAddForm onAdd={this.addItem}/>
			</div>
		);
	}
}

export default App;
import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSeacrh = (e) => {
        const term = e.target.value;
        this.setState({term})
        this.props.onUpdateSeacrh(term)
    }

    render() {
        return (
            <input 
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника" 
                value={this.state.term}
                onChange={this.onUpdateSeacrh}/>
        );
    }
}

export default SearchPanel;
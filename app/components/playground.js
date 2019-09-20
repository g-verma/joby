import React from 'react';
require('./App.css');
import ProductFilter from './playground'
 
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Hoc />
        <ProductFilter />
      </div>
    )
  }
}
 
const withSearch = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      searchTerm: ''
    }
 
    handleSearch = event => {
      this.setState({ searchTerm: event.target.value })
    }
 
    render() {
      return (
        <div className="container">
          <div className="input-container">
            <input className="search-bar" ref="search" name="searchBox" onChange={this.handleSearch} value={this.state.searchTerm} type="text" placeholder="Google" />
          </div>
          <WrappedComponent searchTerm={this.state.searchTerm} />
        </div>
      )
    }
  }
 
}
 
 
//filter code
class ProductFilterMenu extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.props.onFormInput (
      event.target.value
    );
  }
  
  render() {
    return (
      <form className="filter-menu">
       <label for="seriesInput">Filter By Series</label>
        <select id="seriesInput" ref="seriesInput" onChange={this.handleChange}>
          <option value="All">All</option>
          <option value="Year-Round Ales">Year-Round Ales</option>
          <option value="Dictator Series">Dictator Series</option>
          <option value="Holy Trinity">Holy Trinity</option>
        </select>
      </form>
    );
  }
}
 
//filter ends
 
 
 
 
class Location extends React.Component {
  constructor(){
    super();
    this.state = { usersData: [], series:0 }
 
    this.handleFormInput = this.handleFormInput.bind(this);
  }
  
 
  componentDidMount() {
    let response = fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => this.setState({ usersData: data }));
  }
 
  handleFormInput(series) {
    this.setState({
      series: series
    })
 
    console.log('Filter options: ', series)
  }
 
  render() {
    console.log('Inside Loaction', this.props)
    return (
      <div className="row">
        <h2 className="heading">Popular</h2>
 
        <ProductFilterMenu
            series={this.state.series}
            onFormInput={this.handleFormInput}
          /> 
 
        <div className="flex-container">
          {this.state.usersData
            .filter(location => `${location.company.name} ${location.address.city} ${location.company.bs}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
            .map(location => <LocationCard key={location.id} {...location} />)}
        </div>
 
      </div>
    )
  }
}
 
const LocationCard = (props) => {
  return (
    <div className="card border-dark mb-3" >
      <div className="card-header">{props.company.name}</div>
      <div className="card-body text-dark">
        <p className="card-location">{props.address.street}, {props.address.city}</p>
        <p className="card-text">www.{props.website}</p>
        <p className="card-bs">Tags: {props.company.bs}</p>
 
      </div>
    </div>
  )
}
 
const Hoc = withSearch(Location)


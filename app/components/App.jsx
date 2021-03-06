import React from 'react';
require('./App.css');


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Hoc />
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
            <form className="search-form">
              <input className="search-bar" ref="search" name="searchBox" onChange={this.handleSearch} value={this.state.searchTerm} type="text" placeholder="Google" />
            </form>
          </div>
          <WrappedComponent searchTerm={this.state.searchTerm} />
        </div>
      )
    }
  }

}


//filter code
class CompanyFilter extends React.Component {
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
      <form>
       <label>Filter: </label>
        <select id="companyInput" ref="companyInput" onChange={this.handleChange}>
          <option value=''>All</option>
          <option value="Keebler">Keebler</option>
          <option value="Johns">Johns</option>
          <option value="Yost and Sons">Yost and Sons</option>
        </select>
      </form>
    );
  }
}




class Location extends React.Component {
  constructor(){
    super();
    this.state = { usersData: [], company: '' }

    this.handleFormInput = this.handleFormInput.bind(this);
  }
  

  componentDidMount() {
    let response = fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => this.setState({ usersData: data }));
  }

  handleFormInput(company) {
    this.setState({
      company: company
    })
 
    console.log('company selected : ', company)
  }

  render() {
    return (
      <div className="row">
        <div className="row">
            <div> <h2 className="heading">Popular</h2> </div>
            
            <div className="filter-box">
              <CompanyFilter
                  company={this.state.company}
                  onFormInput={this.handleFormInput}
                /> 
            </div>
        </div>

        <div className="flex-container">
          {this.state.usersData
            .filter(location => `${location.company.name} ${location.address.city} ${location.company.bs}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase() || this.state.company.toUpperCase() ) >= 0)
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
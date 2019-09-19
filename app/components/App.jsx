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
            <input className="search-bar" ref="search" name="searchBox" onChange={this.handleSearch} value={this.state.searchTerm} type="text" placeholder="Google" />
          </div>
          <WrappedComponent searchTerm={this.state.searchTerm} />
        </div>
      )
    }
  }

}

class Location extends React.Component {
  state = { usersData: [] }

  componentDidMount() {
    let response = fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => this.setState({ usersData: data }));
  }

  render() {
    console.log('Inside Loaction', this.props)
    return (
      <div className="row">
        <h2 className="heading">Popular</h2>
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
import React from 'react';

class ProductFilter extends React.Component {
    constructor() {
      super();
      
      this.handleFormInput = this.handleFormInput.bind(this);
      
      this.state = {
        series: 0
      }
    }
    
    handleFormInput(series) {
      this.setState({
        series: series
      })
    }
    
    render() {
      const products = [
        {name: 'IPA', abv:5.5, series:'Year-Round Ales'},
        {name: 'White Rascal', abv:5.7, series:'Year-Round Ales'},
        {name: "Joe's Pilsner", abv:3.5, series:'Year-Round Ales'},
        {name: "Ellie's Brown Ale", abv:5.2, series:'Year-Round Ales'},
        {name: 'Out of Bounds Stout', abv:4.5, series:'Year-Round Ales'},
        {name: 'The Maharaja', abv:6.5, series:'Dictator Series'},
        {name: 'The Kaiser', abv:6.5, series:'Dictator Series'},
        {name: 'The Czar', abv:7.5, series:'Dictator Series'},
        {name: 'Hog Heavens', abv:5.5, series:'Holy Trinity'},
        {name: 'The Reverend', abv:6.8, series:'Holy Trinity'},
        {name: 'Salvation', abv:6.4, series:'Holy Trinity'}
      ];
      
      return (
        <div>
           <ProductFilterMenu
            series={this.state.series}
            onFormInput={this.handleFormInput}
          /> 
          <ProductFilterResults
            products={products}
            series={this.state.series}
          />
        </div>
      )
    }
  }



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
 



  class ProductFilterResults extends React.Component {    
    constructor(){
      super();
    }

    render() {
      var results = [];
      
      this.props.products.map((product) => {
        if (this.props.series === 0 || this.props.series === 'All') {
           results.push(<Product product={product} />);
        }
        else if (product.series === this.props.series) {
           results.push(<Product product={product} />);
        }
      });
          
      return (
        <div className="filter-results">
        <ul className="blocks blocks_3up">
          {results}
        </ul>
      </div>
      )
    }
  }



class Product extends React.Component {    
    constructor(){
      super();
    }

    render() {
      return (
        <li key={this.props.product.id}>
        <div className="feature-hd">
          <div className="feature-hd">
            <h2 className="hdg hdg_2">{this.props.product.name}</h2>
          </div>
          <div className="feature-bd">
            <p>{this.props.product.series}</p>
          </div>
        </div>
      </li>
      )
    }
  }          

export default ProductFilter;


import React , {Component} from 'react';
import PropTypes from 'prop-types';
require('./App.css');

export default class App extends React.Component{


  constructor(props){
    super(props);
    this.nlist =  this.nlist.bind(this);
    this.state = {js: null};
  }

  // nlist(){
  //   let names = ['Alice', 'Emily', 'Kate'];
  //   names.map(function (n, i) {return console.log(n)})
  // }

  // nlist = () =>{
  //   let names = ['Alice', 'Emily', 'Kate'];
  //   names.map(function (n, i) {return console.log(n)})
  // }

  // nlist = () =>{   //this works without binding also
  //   console.log('why you clicked me');
  // }

  
  nlist(e){ 
  
    this.setState({ js: e });
    console.log('js : ', this.state);
    console.log('why you clicked me ', e);
  }


  render(){
    let nam = 'gv';
    return(
      <div>
        <h3> justClicked : {this.state.js}</h3>
        <button onClick={this.nlist.bind(this,nam)}> click me </button>
      </div>
    );
  }
}


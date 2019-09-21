import React from 'react';
import './App.css';
import Countries from './Components/Countries.js';


let countries=[];

class App extends React.Component {
  constructor(){
    super();
    this.state={
      countries: countries
    }
  }
  
  render(){
    const request = async () => {
      const response = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
      countries = await response.json();
      this.setState({
        countries: countries
      });
    
    };
    request();
    
    return (
      <Countries data={this.state.countries}/>
    );
  }

}

export default App;

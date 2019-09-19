import React from 'react';
import '../flags/flags.css';
class Countries extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      data: this.props.data
    }
  }
  
  sort=()=>{
  
  };
  
  render(){
    let cells=[];
    cells.push(<tr><th>Name of country</th></tr>);
    this.props.data.map((country,i)=>{
      cells.push(<tr><td><i className={'flag-'+country.cca2}/>{country.name.common}</td></tr>);
    });
    return (
      <table className='country-list-table'>
        <tbody>
          {cells}
        </tbody>

      </table>
    );
  }
  
}

export default Countries;

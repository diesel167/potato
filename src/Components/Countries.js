import React from 'react';
import '../flags/flags.css';
import Papa from 'papaparse';







const fs = require('fs');
const file = fs.createReadStream('../stats/volume.csv');
Papa.parse(file, {
  worker: true,
  complete: function(results) {
    console.log(results);
  }
});


class Countries extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      data: this.props.data,
      showRowsStart: 0,
      showRowsEnd: 10,
      isLoaded: false

    }
  }
  
  static getDerivedStateFromProps(props, state) {
    if(((state.data) !== props.data) && state.isLoaded ===false ) {
      return {
        data: props.data,
        isLoaded:true
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  sortName=(parameter)=>{
    let datatemp = this.state.data.slice();
    datatemp.sort(parameter);
    this.setState({data: datatemp});
  };
  sortByNameDesc = (a, b)=> {
    return b.name.common.localeCompare(a.name.common);
  };
  sortByNameAsc = (a, b)=> {
    return a.name.common.localeCompare(b.name.common);
  };
  next=()=>{
    this.setState( {
      showRowsEnd : this.state.showRowsEnd+10,
      showRowsStart: this.state.showRowsStart+10
    })
  };
  prev=()=>{
    if(this.state.showRowsEnd<=10){
      this.setState( {
          showRowsStart: 0,
          showRowsEnd: 10
      })
    }
    else{
      this.setState( {
        showRowsEnd : this.state.showRowsEnd-10,
        showRowsStart: this.state.showRowsStart-10
      })
    }

  };
  render(){
    let cells=[];
    cells.push(<tr><th>Rank</th><th>Name of country</th><th>Volume</th><th>Price</th></tr>);
    this.state.data.map((country,i)=>{
      if(i<=this.state.showRowsEnd && i>=this.state.showRowsStart)
      cells.push(<tr><td>{i+1}</td><td><i className={'flag-'+country.cca2}/>{country.name.common}</td><td>Volume</td><td>Price</td></tr>);
    });
    return (
      <>
            <header>Your logo</header>
            <table className='country-list-table'>
              <tbody>
              {cells}
              </tbody>

            </table>
            <button onClick={()=>{
              this.prev();
            }}>prev</button>
            <button onClick={()=>{this.next();}}>next</button>
            <button onClick={()=>{this.sortName(this.sortByNameDesc);}}>sortDesc</button>
            <button onClick={()=>{this.sortName(this.sortByNameAsc);}}>sortAsc</button>
            <div id="container"/>
      </>

    );
  }
  
}

export default Countries;

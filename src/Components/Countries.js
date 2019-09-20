import React from 'react';
import '../flags/flags.css';
class Countries extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      data: this.props.data,
      showRowsStart: 0,
      showRowsEnd: 10
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    if((state.data) !== props.data) {
      return {
        data: props.data
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  sort=()=>{
    let datatemp = this.state.data.slice();
    datatemp.sort(this.sortByName);
    this.setState({data: datatemp});
    
  };
  
  sortByName = (a, b)=> {
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
        <div id="container"/>
        <table className='country-list-table'>
          <tbody>
          {cells}
          </tbody>
  
        </table>
        <button onClick={()=>{
          this.prev();
        }}>prev</button>
        <button onClick={()=>{
          this.next();
        }}>next</button>
        <button onClick={()=>{
          this.sort();
        }}>sort</button>
      </>

    );
  }
  
}

export default Countries;

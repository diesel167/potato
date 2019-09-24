import React from 'react';
import '../flags/flags.css';
import stats from '../stats/volume.csv';
import * as d3 from 'd3';





class Countries extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data: this.props.data,
      showRowsStart: 0,
      showRowsEnd: 10,
      isLoaded: false,
      stats: ''
    };
    this.updateStats=this.updateStats.bind(this);
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
  
  componentDidMount() {
    let that=this; //save context
    d3.csv(stats).then(function(stats) {
      that.updateStats(stats);
    }).catch(function(err) {
      throw err;
    });
    
    
    
  }
  
  updateStats=(stats)=>{
    this.setState({stats: stats});
  };
  
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
  sortByVolumeDesc = (a, b)=>{
    let datatemp = this.state.data.slice();
    datatemp.sort((a,b)=>b.volume - a.volume);
    this.setState({data: datatemp});
  };
  next=()=>{
    this.setState( {
      showRowsEnd : this.state.showRowsEnd+10,
      showRowsStart: this.state.showRowsStart+10
    });
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
    this.state.data.map((country,i)=> {
      console.log(country);
      let volume = 0;
      this.state.stats.map(item => {
        if (item.Area == country.name.common) {
          volume = item.Value;
        }
        country.volume = volume;
      });
    });
    
    
    let cells=[];
    cells.push(<tr><th>Rank</th><th>Name of country</th><th>Volume</th><th>Price</th></tr>);
    this.state.data.map((country,i)=>{
      if(i<=this.state.showRowsEnd && i>=this.state.showRowsStart){
        cells.push(<tr>
          <td>{i+1}</td>
          <td><i className={'flag-'+country.cca2}/>{country.name.common}</td>
          <td>{country.volume}</td>
          <td>Price</td>
        </tr>);
      }
      
      
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
            <button onClick={()=>{this.sortByVolumeDesc()}}>sortByVolumeDesc</button>
            <div id="container"/>
      </>

    );
  }
  
}

export default Countries;

import './App.css';
import { useEffect, useState } from "react";


function App() {
  
  let [data, setData] =useState()
  let apiURL = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
  let displayData
  const newArray = []
  
  let [gauge1, setGauge1] = useState()
  let [gauge2, setGauge2] = useState()
  
  let handleGaugeChange1 = (e) => {
    setGauge1(e.target.value)
  }
  let handleGaugeChange2 = (e) => {
    setGauge2(e.target.value)
  }
  const helper =['hi']
  async function pullJSON() {
    const response = await fetch(apiURL)
    const responseData = await response.json()
    //console.log(responseData)
    for(let i = 0; i < responseData.length; i++) {
      newArray.push([responseData[i].address, responseData[i].pool.symbol])
      
      for(let x = 0; x < responseData[i].pool.tokens.length; x++) {
        newArray[i][x+2] = responseData[i].pool.tokens[x].symbol
      }
    }
    //console.log(newArray)
    displayData = helper.map((item) => {
      //let options = item[0]+" // "+item[1]
      //<option value={options}>{options}</option>
      return(
          <div>       
          <select onChange={handleGaugeChange1}> 
          {responseData.map((gauge1) => <option value={gauge1.address}>{[gauge1.pool.symbol, <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span>, gauge1.address]}</option>)}
          </select>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>     
          <select onChange={handleGaugeChange2}> 
          {responseData.map((gauge2) => <option value={gauge2.address}>{[gauge2.pool.symbol, <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span>,gauge2.address]}</option>)}
          </select>
          </div>
      )
    })
    setData(displayData)
  }
  

  useEffect(() => {
    pullJSON()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Select your veBAL gauges to create vote script
        </p>
        <p>
          See below choices
        </p>
        <p className="New">0x2e4e99a1000000000000000000000000{gauge1}000000000000000000000000{gauge2}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
        </p>
      {data}
      
      </header>
    </div>
  );
}

export default App;

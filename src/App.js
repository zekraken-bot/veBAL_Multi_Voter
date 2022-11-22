import './App.css';
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import {Vote_ABI, Vote_address} from './abi';


export default function App() {
  
  const [walletAddress, setWalletAddress] = useState()
  const [buttonText, setButtonText] = useState ('Connect Wallet')
  const [gauge1, setGauge1] = useState()
  const [gauge2, setGauge2] = useState()

  const [data, setData] = useState()
  const apiURL = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
  let displayData
    
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
    
    displayData = helper.map((item) => {
      return(
          <div key={"maindiv"}>       
          <select className='dropdown' onChange={handleGaugeChange1}> <option disabled selected value> ----- select a guage you want to be 0% from the dropdown list ----- </option>
          {responseData.map((gauge1) => <option value={gauge1.address.slice(2,42)} key={gauge1.address}>{[gauge1.pool.symbol," - ",gauge1.address," - gauge cap:",gauge1.relativeWeightCap]}</option>)}
          </select>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>     
          <select className='dropdown' onChange={handleGaugeChange2}> <option disabled selected value> ----- select a guage you want to be 100% from the dropdown list ----- </option>
          {responseData.map((gauge2) => <option value={gauge2.address.slice(2,42)} key={gauge2.address}>{[gauge2.pool.symbol," - ",gauge2.address," - gauge cap:",gauge2.relativeWeightCap]}</option>)}
          </select>
          </div>
      )
    })
    setData(displayData)
  }
  
  //useEffect() loads when page is first loaded
  useEffect(() => {
    pullJSON()
    checkWalletonLoad()
  },[])

  async function checkWalletonLoad() {
    const accounts = await window.ethereum.request({method: 'eth_accounts'})
      if (accounts.length) {
        console.log('Your wallet is connected')
        setWalletAddress([accounts[0].slice(0,5),'...',accounts[0].slice(37,42)])
        setButtonText('Wallet Connected');
      } else {
        console.log("Metamask is not connected");
      }
  }
  
  async function requestAccount() {
    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })     
        setWalletAddress([accounts[0].slice(0,5),'...',accounts[0].slice(37,42)])
        window.ethereum.on('accountsChanged', requestAccount)
        setButtonText('Wallet Connected');
      } catch(error) {
        console.log('Error connecting...')
      }
    } else {
      console.log('Metamask not detected')
    }
  }

  async function updateVotes() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log(signer)
    const erc20 = new ethers.Contract(Vote_address, Vote_ABI, signer);
    await erc20.vote_for_many_gauge_weights([gauge1,gauge2,"0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000"],[0,10000,0,0,0,0,0,0]);
  }

  return (
    <div>
      <header className="headerContent">
      <br />
      <p align="right"><button onClick={requestAccount}>{buttonText}</button></p>
      <p align="right">Wallet Address: {walletAddress}</p>
      </header>  
      
      <div className="mainContent">
      <p className="vebaltitle">
        veBAL Gauge Voter
      </p>
      <p>
        Notes:
        <li>Double check your wallet address before voting</li>
        <li>If there are two gauges in the list select the gauge with a cap</li>
        <li>Current functionality only works for voting 0% for 1st gauge and 100% for the 2nd gauge</li>
        <li>Hex data has been included if you want to inspect or send directly to the gaugeController contract</li>
      </p>
      <br />
      {data}
      <br />
      <button className ="button" onClick={updateVotes}>Click to vote for veBAL gauges</button>
      <br />
      <p className="hexData">HEX Data:<br /><br />0x2e4e99a1000000000000000000000000{gauge1}000000000000000000000000{gauge2}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
      </p>
      </div>
    </div>
  );
}

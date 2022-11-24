import './App.css';
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import {Vote_ABI, Vote_address} from './abi'


function App() {
  
  const [walletAddress, setWalletAddress] = useState()
  const [contractInfo, setContractInfo] = useState({tokenName: "-",tokenSymbol: "-",totalSupply: "-"})
  const [balanceInfo, setBalanceInfo] = useState({address: "-", balance: "-"})
  const [buttonText, setButtonText] = useState ('Connect Wallet')

  let [data, setData] =useState()
  let apiURL = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
  let displayData
  
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
   
    displayData = helper.map((item) => {
      return(
          <div>       
          <select className='dropdown' onChange={handleGaugeChange1}> 
          {responseData.map((gauge1) => <option value={gauge1.address}>{[gauge1.pool.symbol, <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>, gauge1.address]}</option>)}
          </select>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>     
          <select className='dropdown' onChange={handleGaugeChange2}> 
          {responseData.map((gauge2) => <option value={gauge2.address}>{[gauge2.pool.symbol, <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>,gauge2.address]}</option>)}
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


  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const erc20 = new ethers.Contract(Vote_address, Vote_ABI, provider)

      const tokenName = await erc20.token()
      const tokenSymbol = await erc20.voting_escrow()
      const totalSupply = await erc20.admin()
      
      setContractInfo({
        tokenName,
        tokenSymbol,
        totalSupply
      })      
    }
  }

  async function getMyBalance() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const erc20 = new ethers.Contract(Vote_address, Vote_ABI, provider)
    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    const balance = await erc20.vote_user_power(signerAddress)

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance)
    })
  }

  async function updateVotes() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log(signer)
    const erc20 = new ethers.Contract(Vote_address, Vote_ABI, signer);
    await erc20.vote_for_many_gauge_weights(["0x79eF6103A513951a3b25743DB509E267685726B7","0x359EA8618c405023Fc4B98dAb1B01F373792a126","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000"],[0,10000,0,0,0,0,0,0]);
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
        Select your veBAL gauges
      </p>
      
      {/* <button onClick={connectWallet}>Contract Data</button>
      {contractInfo.tokenName}
      <br />
      {contractInfo.tokenSymbol}
      <br />
      {contractInfo.totalSupply}
      <br />
      <button onClick={getMyBalance}>Get Balance</button>
      {balanceInfo.address}
      <br />
      {balanceInfo.balance} */}
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

export default App;

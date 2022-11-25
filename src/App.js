import './App.css';
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { Vote_ABI, Vote_address } from './abi';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
//import useFetch from './components/useFetch';
import getServerData from './components/fetchData';


export default function App() {
  
  const [walletAddress, setWalletAddress] = useState()
  const [buttonText, setButtonText] = useState ('Connect Wallet')
  const [gauge1, setGauge1] = useState()
  const [gauge2, setGauge2] = useState()
  const [data, setData] = useState()

  const apiURL = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
  
  let displayData
  
  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#ffffff',
      },
      red: {
        main: '#9c2238',
        contrastText: '#ffffff',
      }
    },
  });
  
  const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined": {
      color: "#dbdbdb",
      fontSize: '15px'
      
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "white"
      },
      '&:hover fieldset': {
        borderColor: "#0f6ea6"
      },
      '&.Mui-focused fieldset': {
        borderColor: "#0f97a6"
      }
    },
    '& .MuiOutlinedInput-input' : {
      color: "#dbdbdb",
      fontSize: '11px'
    }
  })
  
  
  //const jsonData = useFetch()
  //console.log(jsonData)
  let responseData

  async function test () {
    const displayData2 = await getServerData()
    responseData = displayData2
    console.log(displayData2)
    }
    test()

  async function pullJSON() {
    
    const response = await fetch(apiURL)
    //const responseData = await response.json()
    //console.log(responseData)
  
    displayData = (() => {
      return(
          <div>       
          <Grid container spacing={2}>       
          <Grid item xs={6}>
          <StyledAutocomplete
            onChange={(event, newValue) => {
              setGauge1(newValue.address.slice(2,42))
            }}
            id="first_address_box"
            ListboxProps={{sx: { fontSize: 12 }}}
            options={responseData}
            getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
            sx={{ maxWidth: 800 }}
            renderInput={(params) => <TextField {...params} label="Gauge Address => 0%" />}
          />
          </Grid>
          <Grid item xs={6}>
          <StyledAutocomplete
            onChange={(event, newValue2) => {
              setGauge2(newValue2.address.slice(2,42))
            }}
            id="second_address_box"
            ListboxProps={{sx: { fontSize: 12 }}}
            options={responseData}
            getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
            sx={{ maxWidth: 800 }}
            renderInput={(params) => <TextField {...params} label="Grid Address => 100%"/>}
          />
          </Grid>
          </Grid>
          </div>
      )
    })
    setData(displayData)
  }
  
  

  useEffect(() => {
    pullJSON()
    checkWalletonLoad()
    // eslint-disable-next-line
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
    <ThemeProvider theme={theme}>
    <>
      <header className="headerContent">
      <br />      
      <p align="right"><Button variant="contained" color="neutral" onClick={requestAccount}>{buttonText}</Button></p>
      <p align="right">Wallet Address: {walletAddress}</p>
      </header>  
      
      <div className="mainContent">
        <div className='row'>
          <div className='flex-item'>
            <p className="vebaltitle">
            <u>veBAL Gauge Voter</u>
            </p>
          </div>
          <p>
            Usage Notes:
            <li>Double check your wallet address before voting</li>
            <li>If there are two gauges in the list select the gauge with a cap</li>
            <li>Type-ahead is available for quick searching</li>
            <li>Current functionality only supports voting 0% for 1st gauge (gauge you are currently voting for) and 100% for the 2nd gauge</li>
            <li>Hex data has been included if you want to validate and/or send directly to the gaugeController contract</li>
            <li>Order of info in dropdown 1) gauge symbol, 2) gauge address, 3) gauge cap</li>
          </p>
          <br />
          <div className='flex-item'>
          {data}          
          <br />      
          <Button variant="contained" color="red" className ="button" onClick={updateVotes}>Click to vote for veBAL gauges</Button>          
          <br />
          <p className="hexData">HEX Data:<br /><br />0x2e4e99a1000000000000000000000000{gauge1}000000000000000000000000{gauge2}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
          </p>
          </div>
        </div>
      </div>
    </>
    </ThemeProvider>
  );
}

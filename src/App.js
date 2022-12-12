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
import getServerData from './components/fetchData';


export default function App() {
  
  const [walletAddress, setWalletAddress] = useState()
  const [buttonText, setButtonText] = useState ('Connect Wallet')
  const [gauge1, setGauge1] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge2, setGauge2] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge3, setGauge3] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge4, setGauge4] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge5, setGauge5] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge6, setGauge6] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge7, setGauge7] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})
  const [gauge8, setGauge8] = useState({address: '0x0000000000000000000000000000000000000000', pool: {symbol: ''}})

  const [gaugeText1, setgaugeText1] = useState (0)
  const [gaugeText2, setgaugeText2] = useState (0)
  const [gaugeText3, setgaugeText3] = useState (0)
  const [gaugeText4, setgaugeText4] = useState (0)
  const [gaugeText5, setgaugeText5] = useState (0)
  const [gaugeText6, setgaugeText6] = useState (0)
  const [gaugeText7, setgaugeText7] = useState (0)
  const [gaugeText8, setgaugeText8] = useState (0)

  const [data, setData] = useState()
      
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
      fontSize: '12px'
    }
  })

  const StyledTextField = styled(TextField)({
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
      fontSize: '13px'
    }
  })
  
  useEffect(() => {
    
    async function pullJSON() {
      const responseData = await getServerData()
      //const responseData = getData
    
      let displayData = (() => {
        return(
            <div>       
            <Grid container spacing={2}>       
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue) => {
                    setGauge1(newValue)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #1" />}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText) => {
                    setgaugeText1(newValueText.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue2) => {
                    setGauge2(newValue2)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #2"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText2) => {
                    setgaugeText2(newValueText2.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue3) => {
                    setGauge3(newValue3)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #3"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText3) => {
                    setgaugeText3(newValueText3.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue4) => {
                    setGauge4(newValue4)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #4"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText4) => {
                    setgaugeText4(newValueText4.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue5) => {
                    setGauge5(newValue5)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #5"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText5) => {
                    setgaugeText5(newValueText5.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue6) => {
                    setGauge6(newValue6)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #6"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText6) => {
                    setgaugeText6(newValueText6.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue7) => {
                    setGauge7(newValue7)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #7"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText7) => {
                    setgaugeText7(newValueText7.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledAutocomplete
                  onChange={(event, newValue8) => {
                    setGauge8(newValue8)
                  }}
                  id="address_box"
                  ListboxProps={{sx: { fontSize: 12 }}}
                  options={responseData}
                  getOptionLabel={(option) => JSON.stringify([option.pool.symbol,option.address,option.relativeWeightCap])}
                  sx={{ maxWidth: 800 }}
                  renderInput={(params) => <TextField {...params} label="Select Gauge #8"/>}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledTextField
                  id="vote_textbox"
                  label="Vote Weight"
                  onChange={(newValueText8) => {
                    setgaugeText8(newValueText8.target.value)
                  }}
                />
              </Grid>
            </Grid>
            </div>
        )
      })
      setData(displayData)
    }
        
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
    await erc20.vote_for_many_gauge_weights([gauge1.address.slice(2,42),gauge2.address.slice(2,42),gauge3.address.slice(2,42),
      gauge4.address.slice(2,42),gauge5.address.slice(2,42),gauge6.address.slice(2,42),gauge7.address.slice(2,42),gauge8.address.slice(2,42)],
      [gaugeText1*100,gaugeText2*100,gaugeText3*100,gaugeText4*100,gaugeText5*100,gaugeText6*100,gaugeText7*100,gaugeText8*100]);
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
            <ul>
            <li>Make sure your wallet is connected</li>
            <li>If there are two gauges in the list select the gauge with a cap (last value not "null")</li>
            <li>Type-ahead is available for quick searching</li>
            <li>8 gauge changes supported, make sure you reduce votes given to a gauge (or you have spare voting power) in order to vote elsewhere</li>
            <li>Use table at the bottom to confirm/validate your input</li>
            <li>To vote, click the BIG RED button and review/confirm tx in your wallet; double check your wallet address before voting</li>
            </ul>
            EXAMPLES
            <ol>
            <li>Decrease "gauge #1" to 0, increase "gauge 2" to 100; this moves 100% of your vote from one gauge to another</li>
            <li>Decrease "gauge #1" to 0, increase "gauge 2" to 50, increase "gauge #3" to 50; this moves 100% of your vote from one gauge to two others, 50/50 split</li>
            <li>Decrease "gauge #1" to 50, increase "gauge 2" to 25, increase "gauge #3" to 25; this moves 50% of your vote from one gauge to two others, 50/50 split</li>
            </ol>
          </p>
          <br />
          <div className='flex-item'>
          {data}          
          <br />
          <br />
          <table className="validationTable">
            <tbody>
              <tr>
                <th>Gauge Number</th>
                <th>Gauge Symbol</th>
                <th>Gauge Address</th>
                <th>Gauge Vote Weight</th>
              </tr>
              <tr>
                <td>#1</td>
                <td className="voteSymbol">{gauge1.pool.symbol}</td>
                <td className="addressTable">{gauge1.address}</td>
                <td className="voteTable">{gaugeText1}</td>
              </tr>
              <tr>
                <td>#2</td>
                <td className="voteSymbol">{gauge2.pool.symbol}</td>
                <td className="addressTable">{gauge2.address}</td>
                <td className="voteTable">{gaugeText2}</td>
              </tr>
              <tr>
                <td>#3</td>
                <td className="voteSymbol">{gauge3.pool.symbol}</td>
                <td className="addressTable">{gauge3.address}</td>
                <td className="voteTable">{gaugeText3}</td>
              </tr>
              <tr>
                <td>#4</td>
                <td className="voteSymbol">{gauge4.pool.symbol}</td>
                <td className="addressTable">{gauge4.address}</td>
                <td className="voteTable">{gaugeText4}</td>
              </tr>
              <tr>
                <td>#5</td>
                <td className="voteSymbol">{gauge5.pool.symbol}</td>
                <td className="addressTable">{gauge5.address}</td>
                <td className="voteTable">{gaugeText5}</td>
              </tr>
              <tr>
                <td>#6</td>
                <td className="voteSymbol">{gauge6.pool.symbol}</td>
                <td className="addressTable">{gauge6.address}</td>
                <td className="voteTable">{gaugeText6}</td>
              </tr>
              <tr>
                <td>#7</td>
                <td className="voteSymbol">{gauge7.pool.symbol}</td>
                <td className="addressTable">{gauge7.address}</td>
                <td className="voteTable">{gaugeText7}</td>
              </tr>
              <tr>
                <td>#8</td>
                <td className="voteSymbol">{gauge8.pool.symbol}</td>
                <td className="addressTable">{gauge8.address}</td>
                <td className="voteTable">{gaugeText8}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="totalTable">TOTAL:&nbsp;&nbsp;</td>
                <td className="voteTable">{parseInt(gaugeText1)+parseInt(gaugeText2)+parseInt(gaugeText3)+parseInt(gaugeText4)+parseInt(gaugeText5)+parseInt(gaugeText6)+parseInt(gaugeText7)+parseInt(gaugeText8)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="errorTable">{parseInt(gaugeText1)+parseInt(gaugeText2)+parseInt(gaugeText3)+parseInt(gaugeText4)+parseInt(gaugeText5)+parseInt(gaugeText6)+parseInt(gaugeText7)+parseInt(gaugeText8) > 100 ? "ERROR: >100" : ""}
                </td>
              </tr>
            </tbody>
          </table>    
          <br/>
          <Button variant="contained" color="red" className ="button" onClick={updateVotes}>Click to vote for veBAL gauges</Button>          
          <br />
          <br />
          {/* <p className="hexData">HEX Data:<br /><br />0x2e4e99a1000000000000000000000000{gauge1.address.slice(2,42)}000000000000000000000000{gauge2.address.slice(2,42)}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
          </p> */}
          </div>
        </div>
      </div>
    </>
    </ThemeProvider>
  );
}

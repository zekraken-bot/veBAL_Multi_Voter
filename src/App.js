import "./App.css";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Vote_ABI, Vote_address } from "./abi";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import getServerData from "./components/fetchData";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [gauges, setGauges] = useState(new Array(8).fill());
  const [gaugeTexts, setGaugeTexts] = useState(new Array(8).fill(0));
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#ffffff",
      },
      red: {
        main: "#9c2238",
        contrastText: "#ffffff",
      },
    },
  });

  async function pullJSON() {
    const responseData = await getServerData();
    setData(responseData);
  }

  async function checkWalletonLoad() {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length) {
      console.log("Your wallet is connected");
      setWalletAddress(accounts[0]);
      setButtonText("Wallet Connected");
    } else {
      console.log("Metamask is not connected");
    }
  }

  useEffect(() => {
    async function initialize() {
      await checkWalletonLoad();
      await pullJSON();
    }

    initialize();
  }, []);

  async function setGaugesWithPower() {
    if (data) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const erc20 = new ethers.Contract(Vote_address, Vote_ABI, signer);

      let newGauges = [...gauges];
      let newGaugeTexts = [...gaugeTexts];
      let gaugeIndex = 0;

      for (let i = 0; i < data.length && gaugeIndex < newGauges.length; i++) {
        const gaugePower = await erc20.vote_user_slopes(walletAddress, data[i].address);
        if (gaugePower.power > 0) {
          newGauges[gaugeIndex] = data[i];
          newGaugeTexts[gaugeIndex] = (gaugePower.power / 100).toString();
          gaugeIndex++;
        }
      }
      setGauges(newGauges);
      setGaugeTexts(newGaugeTexts);
      setLoading(false);
    }
  }

  useEffect(() => {
    setGaugesWithPower();
  }, [data]);

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setButtonText("Wallet Connected");
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  async function updateVotes() {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(Vote_address, Vote_ABI, signer);

    const addresses = gauges.map((gauge) => gauge.address.slice(2, 42));
    const weights = gaugeTexts.map((text) => parseInt(text) * 100);

    await erc20.vote_for_many_gauge_weights(addresses, weights);
  }

  const onGaugeChange = async (i, newValue) => {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(Vote_address, Vote_ABI, signer);

    let newGauges = [...gauges];
    newGauges[i] = newValue === null ? null : newValue;
    setGauges(newGauges);

    if (newValue !== null) {
      const gaugePower = await erc20.vote_user_slopes(walletAddress, newValue.address);
      let newGaugeTexts = [...gaugeTexts];
      newGaugeTexts[i] = (gaugePower.power / 100).toString();
      setGaugeTexts(newGaugeTexts);
    } else {
      let newGaugeTexts = [...gaugeTexts];
      newGaugeTexts[i] = 0;
      setGaugeTexts(newGaugeTexts);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <header className="headerContent">
          <br />
          <p align="right">
            <Button variant="contained" color="neutral" onClick={requestAccount}>
              {buttonText}
            </Button>
          </p>
          <p align="right">Wallet Address: {walletAddress && `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 6)}`}</p>
        </header>
        <div className="mainContent">
          <div className="row">
            <div className="flex-item">
              <p className="vebaltitle">
                <u>veBAL Gauge Voter</u>
              </p>
            </div>
            <div>
              Usage Notes:
              <ul>
                <li>Make sure your wallet is connected</li>
                <li>Killed gauges are not in the dropdown selector</li>
                <li>Type-ahead is available for quick searching</li>
                <li>8 gauge changes supported at one time, make sure to reduce votes to a gauge in order to vote elsewhere (unless you have free voting power) </li>
                <li>Make sure the gauge you are changing isn't time-locked; every gauge's vote is locked for 10 days from its tx confirmation</li>
                <li>
                  To vote, click the <span className="big">RED</span> button and review/confirm tx in your wallet; double check your wallet address before voting
                </li>
              </ul>
              Examples:
              <ol>
                <li>These examples assume "gauge #1" is currently at 100% and isn't vote locked</li>
                <li>Decrease "gauge #1" to 0, increase "gauge 2" to 100; this moves 100% of your vote from one gauge to another</li>
                <li>Decrease "gauge #1" to 0, increase "gauge 2" to 50, increase "gauge #3" to 50; this moves 100% of your vote from one gauge to two others</li>
                <li>Decrease "gauge #1" to 50, increase "gauge 2" to 25, increase "gauge #3" to 25; this moves 50% of your vote from one gauge to two others</li>
              </ol>
            </div>
            <br />
            <div className="flex-item">
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={1} justifyContent="center">
                  {gauges.map((gauge, i) => (
                    <React.Fragment key={i}>
                      <Grid item xs={7}>
                        <Autocomplete
                          key={`autocomplete-${i}-${gauges[i]?.address || "empty"}`}
                          onChange={(event, newValue) => {
                            onGaugeChange(i, newValue);
                          }}
                          id={`address_box_${i}`}
                          ListboxProps={{ sx: { fontSize: 12 } }}
                          options={data || []}
                          getOptionLabel={(option) =>
                            JSON.stringify(
                              [option.pool.symbol, "|", option.address, "|", option.network, "|", option.newTag, "| Symbols: ", option.pool.tokens],
                              null,
                              " "
                            ).replace(/]|[[]|"|,/g, "")
                          }
                          sx={{ maxWidth: 800 }}
                          renderInput={(params) => <TextField {...params} label={`Select Gauge #${i + 1}`} />}
                          isOptionEqualToValue={(option, value) => option?.address === value?.address}
                          value={gauges[i]}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          id={`vote_textbox_${i}`}
                          label="Weight"
                          value={gaugeTexts[i]}
                          onChange={(newValueText) => {
                            let newValue = isNaN(parseInt(newValueText.target.value)) ? 0 : newValueText.target.value;
                            let newGaugeTexts = [...gaugeTexts];
                            newGaugeTexts[i] = newValue;
                            setGaugeTexts(newGaugeTexts);
                          }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              )}

              <br />
              <table className="validationTable">
                <tbody>
                  <tr>
                    <td className="totalTable">TOTAL:&nbsp;&nbsp;</td>
                    <td className="voteTable">{gaugeTexts.reduce((total, num) => total + parseInt(num), 0)}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="errorTable">{gaugeTexts.reduce((total, num) => total + parseInt(num), 0) > 100 ? "ERROR: Votes >100" : ""}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <Button variant="contained" color="red" className="button" onClick={updateVotes}>
                Click to vote for veBAL gauges
              </Button>
              <br />
              <br />
              <br />
              <br />
              {/* <p className="hexData">HEX Data:<br /><br />0x2e4e99a1000000000000000000000000{gauge1.address.slice(2,42)}000000000000000000000000{gauge2.address.slice(2,42)}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
          </p> */}
            </div>
          </div>
        </div>
        <footer className="footer">
          Open source project created by&nbsp;
          <a href="https://twitter.com/The_Krake" target="_blank" rel="noopener noreferrer">
            @ZeKraken
          </a>
          &nbsp;|&nbsp;
          <a href="https://github.com/zekraken-bot/veBAL_Multi_Voter" target="_blank" rel="noopener noreferrer">
            github link
          </a>
          &nbsp;|&nbsp;Disclaimer: use at your own discretion, I take no responsiblity for results
        </footer>
        <br />
      </>
    </ThemeProvider>
  );
}

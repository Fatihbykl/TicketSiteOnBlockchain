import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import Ticket from "./abis/Ticket.json";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      ticket: null,
      web3: null
    }
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const provider = new Web3.providers.HttpProvider('http://localhost:9545/');
      const web3 = new Web3(provider);
      window.ethereum.enable();
      //const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], web3: web3})
      } else {
        window.alert('Please login with MetaMask')
      }
      //load contracts
      try {
        const ticket = new web3.eth.Contract(Ticket.abi, Ticket.networks[netId].address)
        this.setState({ticket: ticket})
      } catch (e) {
        console.log('Error', e)
        //window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install MetaMask')
    }
  }




  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.account}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

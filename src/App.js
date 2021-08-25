import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Web3 from 'web3';
import logo from './logo.svg';
import Ticket from "./abis/Ticket.json";
import './App.css';
import Homepage from './components/Homepage'
import CreateEvent from './components/CreateEvent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      ticket: null,
      web3: null,
      events: []
    }
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.stringToHex = this.stringToHex.bind(this);
    this.hexToString = this.hexToString.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {

    if(typeof window.ethereum!=='undefined'){
      /*
      const provider = new Web3.providers.HttpProvider('http://localhost:9545/');
      const web3 = new Web3(provider);*/
      
      const web3 = new Web3(window.ethereum)
      window.ethereum.enable();
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
        const contractAddress = Ticket.networks[netId].address;
        const ticket = new web3.eth.Contract(Ticket.abi, contractAddress)
        this.setState({ticket: ticket, contractAddress: contractAddress})
      } catch (e) {
        console.log('Error load contracts', e)
        //window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install MetaMask')
    }
    this.getEvents();
  }

  stringToHex(data) {
    const value = this.state.web3.utils.utf8ToHex(data);
    return value;
  }

  hexToString(data) {
    const value = this.state.web3.utils.hexToUtf8(data);
    return value;
  }

  async createEvent(
      ticketCount,
      price,
      datee,
      name,
      location,
      description,
      isActive
    ) {
      try{
        console.log(ticketCount, price,datee,name, location, description, isActive);
        await this.state.ticket.methods.CreateEvent(ticketCount, price, this.stringToHex(datee), this.stringToHex(name), this.stringToHex(location), this.stringToHex(description), isActive).send({from: this.state.account, gas:3000000});
      }
      catch(e) {
        console.log('error: create event ->', e);
      }
    }

  async getEvents() {
    try {
      const events = await this.state.ticket.methods.GetEvents().call({from: this.state.account});
      
      this.setState({events: events});
      console.log(events);
    } catch (e) {
      console.log('error: get events ->', e);
    }
  }

  async buyTicket(id, amount){
    try {
      const amountToSend = this.state.web3.utils.toWei(amount, "ether");
      await this.state.ticket.methods.BuyTicket(id).send({from: this.state.account, value: amountToSend});
    } catch (e) {
      console.log('error: buy ticket ->', e);
    }
  }

  async withdraw(){
    try {
      await this.state.ticket.methods.Withdraw(this.state.account).send({from: this.state.account, gas: 3000000});
    } catch (e) {
      console.log('error: withdraw ->', e);
    }
  }


  render(){
    const events = this.state.events;
    return (
      <Router>
        <Switch>
          <Route path="/create-event">
            <CreateEvent createEvent={this.createEvent} />
          </Route>
          <Route path="/" >
            <Homepage events={events} createEvent={this.createEvent} buyTicket={this.buyTicket} hexToString={this.hexToString} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

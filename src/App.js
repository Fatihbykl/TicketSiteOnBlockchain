import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Web3 from 'web3';
import logo from './logo.svg';
import Ticket from "./abis/Ticket.json";
import './App.css';
import Homepage from './components/Homepage';
import CreateEvent from './components/CreateEvent';
import MyTickets from './components/MyTickets';
import Navbar from './components/Navbar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      ticket: null,
      web3: null,
      events: [],
      myevents: [],
      render: 0,
    }
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.stringToHex = this.stringToHex.bind(this);
    this.hexToString = this.hexToString.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.findEvent = this.findEvent.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  async componentDidMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }
/*
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.render != nextState.render;
  }*/

  rerender() {
    this.getEvents();
    this.getUserEvents();
    this.setState({render: this.state.render + 1});
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      let web3 = new Web3(window.ethereum)
      window.ethereum.enable();
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], web3: web3})
      } else {
        window.alert('Please login with MetaMask');
        web3 = require('web3');
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
    this.getUserEvents();
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
      city,
      description,
      category,
      isActive
    ) {
      try{
        console.log(ticketCount, price,datee,name, location, description, isActive, category);
        const priceWei = this.state.web3.utils.toWei(price.toString(), "ether");
        await this.state.ticket.methods.CreateEvent(ticketCount, priceWei, this.stringToHex(datee), this.stringToHex(name), this.stringToHex(location), this.stringToHex(city), this.stringToHex(description), this.stringToHex(category), isActive).send({from: this.state.account, gas:3000000});
        this.rerender();
      }
      catch(e) {
        console.log('error: create event ->', e);
      }
    }

  async getEvents() {
    try {
      const events = await this.state.ticket.methods.GetEvents().call({from: this.state.account});
      this.setState({events: events});
    } catch (e) {
      console.log('error: get events ->', e);
    }
  }

  async buyTicket(id, amount){
    try {
      await this.state.ticket.methods.BuyTicket(id).send({from: this.state.account, value: amount});
      this.rerender();
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

  findEvent(id){
    try {
      const event = this.state.ticket.methods.GetEvent(id).call({from: this.state.account});
      return event;
    } catch (e) {
      console.log('error: find event ->', e);
    }
  }

  async getUserEvents() {
    try {
      var myevents = [];
      const events = await this.state.ticket.methods.GetUserEvents(this.state.account).call({from: this.state.account});
      events.map(id => {
        return(
          myevents.push(this.findEvent(id))
        );
      })
      Promise.all(myevents).then(result => {
        this.setState({myevents: result});
      })
    } catch (e) {
      console.log('error: get user events ->', e);
    }
  }


  render(){
    const events = this.state.events;
    const myevents = this.state.myevents;
    console.log("Render Çalıştı!!!");
    return (
        <Router>
          <Navbar account={this.state.account} loadData={this.loadBlockchainData} render={this.rerender} />
          <Switch>
            <Route path="/myevents" >
              <MyTickets events={myevents} buyTicket={this.buyTicket} hexToString={this.hexToString} />
            </Route>
            <Route path="/create-event">
              <CreateEvent createEvent={this.createEvent} />
            </Route>
            <Route path="/" >
              <Homepage events={events} buyTicket={this.buyTicket} hexToString={this.hexToString} />
            </Route>
          </Switch>
        </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Web3 from 'web3';
import Ticket from "./abis/Ticket.json";
import './App.css';
import Homepage from './components/Homepage';
import CreateEvent from './components/CreateEvent';
import MyTickets from './components/MyTickets';
import Navbar from './components/Navbar';
import AdminSettings from './components/AdminSettings';
import EventDetails from './components/EventDetails';
import EditEvents from './components/EditEvents';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      ticket: null,
      web3: null,
      events: [],
      myevents: [],
      owners: [],
      isowner: false,
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
    this.checkOwner = this.checkOwner.bind(this);
    this.getOwners = this.getOwners.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
    this.editEvent = this.editEvent.bind(this);
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
      let web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      //load balance
      if(typeof accounts[0] !=='undefined'){
        //const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], web3: web3})
      } else {
        window.alert('Please login with MetaMask');
        web3 = require('web3');// cüzdan bağlamadan etkinlikleri görebilmeli
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
    this.getOwners();
    this.checkOwner(this.state.account);
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
      time,
      isActive
    ) {
      try{
        console.log(ticketCount, price,datee,name, location, description, isActive, category);
        const priceWei = this.state.web3.utils.toWei(price.toString(), "ether");
        await this.state.ticket.methods.CreateEvent(ticketCount, priceWei, this.stringToHex(datee), this.stringToHex(name), this.stringToHex(location), this.stringToHex(city), this.stringToHex(description), this.stringToHex(category), this.stringToHex(time), isActive).send({from: this.state.account, gas:3000000});
        this.rerender();
      }
      catch(e) {
        console.log('error: create event ->', e);
      }
    }

    async editEvent(
      id,
      ticketCount,
      price,
      datee,
      name,
      location,
      city,
      description,
      category,
      time,
      isActive
    ) {
      try{
        console.log(ticketCount, price,datee,name, location, description, isActive, category);
        const priceWei = this.state.web3.utils.toWei(price.toString(), "ether");
        await this.state.ticket.methods.EditEvent(id, ticketCount, priceWei, this.stringToHex(datee), this.stringToHex(name), this.stringToHex(location), this.stringToHex(city), this.stringToHex(description), this.stringToHex(category), this.stringToHex(time), isActive).send({from: this.state.account, gas:3000000});
        this.rerender();
      }
      catch(e) {
        console.log('error: edit event ->', e);
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
      let today = new Date();
      let datetime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ':' + today.getMinutes();
      await this.state.ticket.methods.BuyTicket(id, this.stringToHex(datetime)).send({from: this.state.account, value: amount});
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

  async checkOwner(address) {
    try {
      const result = await this.state.ticket.methods.IsOwner(address).call({from: this.state.account});
      Promise.resolve(result).then(r => {
        this.setState({isowner: r});
      })
    } catch (error) {
      console.log("error: check owner ->" , error);
    }
  }

  async getOwners() {
    try {
      const result = await this.state.ticket.methods.GetOwners().call({from: this.state.account});
      this.setState({owners: result});
    } catch (error) {
      console.log("error: get owenrs ->", error);
    }
  }

  async addOwner(address) {
    try {
      await this.state.ticket.methods.AddOwner(address).send({from: this.state.account});
    } catch (error) {
      console.log("error: add owner ->", error);
    }
  }

  async deleteOwner(address, index) {
    try {
      await this.state.ticket.methods.DeleteOwner(address, index).send({from: this.state.account});
    } catch (error) {
      console.log("error: add owner ->", error);
    }
  }

  render(){
    const events = this.state.events;
    const myevents = this.state.myevents;
    console.log("Render Çalıştı!!!");
    return (
        <Router>
          <Navbar account={this.state.account} loadData={this.loadBlockchainData} render={this.rerender} isOwner={this.state.isowner} />
          <Routes>
            <Route path="myevents" element={<MyTickets events={myevents} buyTicket={this.buyTicket} hexToString={this.hexToString} contract={this.state.ticket} />}>
              
            </Route>
            <Route path="create-event" element={<CreateEvent createEvent={this.createEvent} />}>
              
            </Route>
            <Route path="edit-event/:id" render={(props) => (<EditEvents {...props} editEvent={this.editEvent} findEvent={this.findEvent} hexToString={this.hexToString} />)} />
            <Route path="admin-settings" element={<AdminSettings owners={this.state.owners} addOwner={this.addOwner} deleteOwner={this.deleteOwner} />}>
              
            </Route>
            <Route path="event-details/:id" render={(props) => (<EventDetails {...props} findEvent={this.findEvent} hexToString={this.hexToString} buyTicket={this.buyTicket} />)} />
            <Route path="/" element={<Homepage events={events} hexToString={this.hexToString} buyTicket={this.buyTicket} account={this.state.account} />}>
              
            </Route>
          </Routes>
        </Router>
    );
  }
}
export default App;

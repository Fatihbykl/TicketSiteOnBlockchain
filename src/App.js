import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import Ticket from "./abis/Ticket.json";
import './App.css';
import TicketCard from './components/TicketCard'

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
        this.getEvents();
      } catch (e) {
        console.log('Error load contracts', e)
        //window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install MetaMask')
    }
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

  async getEvents(id) {
    try {
      const events = await this.state.ticket.methods.GetEvents().call({from: this.state.account});
      console.log(events[0]);
      this.setState({events: events});
    } catch (e) {
      console.log('error: get events ->', e);
    }
  }


  render(){
    const events = this.state.events;
    return (
      <div className="container">
        <div className="row">
          {
            events.map(event => {
              const {id, ticketCount, price, date, name, location, description, isActive} = event;
              console.log(id,ticketCount,price, this.hexToString(date));
              return <TicketCard id={id} ticketCount={ticketCount} price={price} date={this.hexToString(date)} name={this.hexToString(name)} location={this.hexToString(location)} description={this.hexToString(description)} isActive={isActive} />
            })
          }
        </div>
          
        <button className="btn-sm btn btn-success" onClick={this.createEvent.bind(this, 5, 10,"ym","hayko konser", "sakarya","açıklama", true)}>event oluştur</button>
        <button className="btn-sm btn btn-success" onClick={this.getEvents}>event getir</button>
      </div>
    );
  }
}

export default App;

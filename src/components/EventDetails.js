import React, {Component} from 'react';
import '../css/eventdetails.css';
import '../App.css';
import { FaTicketAlt, FaThList, FaEthereum } from 'react-icons/fa';
import { IoCalendarSharp, IoLocationSharp } from 'react-icons/io5';

class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.buyTicket = this.props.buyTicket;
    }
    findEvent(id) {
        const web3 = require('web3');
        let result = this.props.findEvent(id);
        if(typeof result === "undefined") return;
        Promise.resolve(result).then(r => {
            this.ticketCount = r[1];
            this.price = web3.utils.fromWei(r[2].toString(), 'ether');
            this.priceWei = r[2];
            this.date = this.props.hexToString(r[3]);
            this.name = this.props.hexToString(r[4]);
            this.location = this.props.hexToString(r[8]);
            this.city = this.props.hexToString(r[5]);
            this.category = this.props.hexToString(r[6]);
            this.time = this.props.hexToString(r[7]);
            this.description = this.props.hexToString(r[9]);
        })
    }
    render() {
        this.findEvent(this.id);
        return(
            <div class="container">
                <div className='bg-white bg-div'>
                    <img src='https://imgr.search.brave.com/2LFQq2vtO7iKUTSvjsH9bQekwy8GoP4DJoHhKdlaPqs/fit/1024/683/ce/1/aHR0cHM6Ly9iaXpi/b2x0cy5jby56YS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/MS9FbnRyZXByZW5l/dXJzaGlwLU9wcG9y/dHVuaXRpZXMtQXQt/QS1NdXNpYy1Db25j/ZXJ0LmpwZw'/>
                    <hr />
                    <div className="row event-details">
                        <div className="col-md-6">
                            <h2>{this.name}</h2>
                            <p>
                                {this.description}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <FaTicketAlt className="icon" /> {this.ticketCount} Tickets left <br />
                            <FaThList className="icon" /> {this.category} <br />
                            <IoCalendarSharp className="icon" /> {this.date} - {this.time} <br />
                            <IoLocationSharp className="icon" /> {this.location} - {this.city} <br />
                            <FaEthereum className="icon" /> {this.price} <br />
                        </div>
                    </div>
                    <button className="navbarButton float-end" onClick={() => {this.buyTicket(this.id, this.priceWei);}}>Buy Now</button>
                </div>
            </div>
        )
    }
}
export default EventDetails;


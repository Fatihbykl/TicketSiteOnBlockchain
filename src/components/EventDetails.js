import React, {Component} from 'react';
import '../css/eventdetails.css';
import '../App.css';
import concert from '../media/Concert.jpg';
import theatre from '../media/Theatre.jpg';
import sports from '../media/Sports.jpg';
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
        let img;
        if (this.category === "Concert") { img = concert; }
        else if (this.category === "Theatre") { img = theatre; }
        else { img = sports; }
        return(
            <div class="container">
                <div className='bg-white bg-div'>
                    <img src={img}/>
                    <hr />
                    <div className="row event-details">
                        <div className="col-md-6">
                            <h2>{this.name}</h2>
                            <p>
                                {this.description}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <FaTicketAlt className="icon" />
                            {
                                this.ticketCount > 0
                                ? this.ticketCount + " Tickets Left"
                                : <span class="badge bg-danger ms-1">SOLD OUT</span>
                            }
                             <br />
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


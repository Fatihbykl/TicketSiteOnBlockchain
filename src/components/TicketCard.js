import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/ticket.css';
import { FaEthereum, FaThList } from 'react-icons/fa';
import { IoLocationSharp, IoCalendarSharp, IoTicketSharp } from 'react-icons/io5';
import concert from '../media/Concert.jpg';
import theatre from '../media/Theatre.jpg';
import sports from '../media/Sports.jpg';

class TicketCard extends Component {
    render() {
        const web3 = require('web3');
        const {func, id, ticketCount, price, date, name, location, city, description, category, isActive} = this.props;
        const link = '/event-details/' + id;
        let img;
        if (category === "Concert") {
            img = concert;
        }else if (category === "Theatre") {
            img = theatre;
        }else {
            img = sports;
        }
        return(
            <div className="col-lg-4 col-md-6">
                <div class="ticket-card">
                    <div class="cover">
                    <img src={img} alt="" />
                    <div class="info">
                        <div class="going">
                        <FaThList /> {category}
                        </div>
                        <div class="tickets-left">
                        <IoTicketSharp /> 
                        {
                            ticketCount > 0
                            ? ticketCount + " Tickets Left"
                            : <span class="badge bg-danger ms-1">SOLD OUT</span>
                        }
                        </div>
                    </div>
                    </div>
                    <div class="body">
                    
                    <div class="artist">
                        <h5 class="name">{name}</h5>
                    </div>
                    <div class="price">
                        <div class="from">Fiyat</div>
                        <div class="value">
                        {web3.utils.fromWei(price.toString(), 'ether')}<FaEthereum />
                        </div>
                    </div>
                    
                    <div class="clearfix"></div>
                    <div class="info">
                        <p class="location">
                        <i class="fa fa-map-marker"></i><IoLocationSharp /> {city}
                        </p>
                        <p class="date">
                        <i class="fa fa-calendar"></i><IoCalendarSharp /> {date}
                        </p>
                    </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="collapse"></div>
                    <div class="footer">
                        <a class="btn toggle-tickets" href={link}>Details</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default TicketCard;
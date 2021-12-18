import React, {Component} from 'react';
import '../css/ticket.css';
import { FaEthereum, FaThList } from 'react-icons/fa'
import { IoLocationSharp, IoCalendarSharp, IoTicketSharp } from 'react-icons/io5'

class TicketCard extends Component {
    render() {
        const web3 = require('web3');
        const {func, id, ticketCount, price, date, name, location, city, description, category, isActive} = this.props;
        return(
            <div className="col-lg-4 col-md-6">
                <div class="ticket-card">
                    <div class="cover">
                    <img src="https://imgr.search.brave.com/2LFQq2vtO7iKUTSvjsH9bQekwy8GoP4DJoHhKdlaPqs/fit/1024/683/ce/1/aHR0cHM6Ly9iaXpi/b2x0cy5jby56YS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/MS9FbnRyZXByZW5l/dXJzaGlwLU9wcG9y/dHVuaXRpZXMtQXQt/QS1NdXNpYy1Db25j/ZXJ0LmpwZw" alt="" />
                    <div class="info">
                        <div class="going">
                        <FaThList /> {category}
                        </div>
                        <div class="tickets-left">
                        <i class="fa fa-ticket"></i><IoTicketSharp /> {ticketCount} Bilet kaldı
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
                    <div class="collapse">
                    </div>
                    <div class="footer">
                    <button class="btn toggle-tickets">Detaylar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default TicketCard;
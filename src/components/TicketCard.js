import React, {Component} from 'react';
import '../css/ticket.css';

class TicketCard extends Component {


    render() {
        const {func, id, ticketCount, price, date, name, location, description, isActive} = this.props;
        return(
            <div className="col-md-6">
                <article class="card fl-left">
                    <section class="date">
                        <time>
                        <span>{id}</span><span>ID</span>
                        </time>
                    </section>
                    <section class="card-cont">
                        <small>Remaining Ticket: {ticketCount}</small>
                        <h3>{name}</h3>
                        <div class="even-date">
                        <i class="fa fa-calendar"></i>
                        <time>
                        <span>{date}</span>
                        <span>{location}</span>
                        </time>
                        </div>
                        <div class="even-info">
                        <i class="fa fa-map-marker"></i>
                        <p>
                            {description}
                        </p>
                        </div>
                        <button onClick={func.bind(this, id, price)}>BUY - {price}$</button>
                    </section>
                </article>
            </div>
        );
    }
}
export default TicketCard;
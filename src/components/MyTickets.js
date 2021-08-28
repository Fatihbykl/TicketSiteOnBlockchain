import React, { Component } from "react";
import TicketCard from "./TicketCard";

class MyTickets extends Component {
    render() {
        const {events, buyTicket, hexToString} = this.props;
        return(
            <div className="container">
                <h1>My Tickets</h1>
                <div className="row">
                    {
                        events.map(event => {
                            var [id, ticketCount, price, date, name, location, description, isActive] = [null, null, null, null, null, null, null, null];
                            id = event['0'];
                            ticketCount = event['1'];
                            price = event['2'];
                            date = event['3'];
                            name = event['4'];
                            location = event['5'];
                            description = event['6'];
                            isActive = event['7'];
                            return <TicketCard key={id} func={buyTicket} id={id} ticketCount={ticketCount} price={price} date={hexToString(date)} name={hexToString(name)} location={hexToString(location)} description={hexToString(description)} isActive={isActive} />
                        })
                    }
                </div>
            </div>
        );
    }
}
export default MyTickets;
import React, {Component} from 'react';
import TicketCard from './TicketCard'


class Homepage extends Component {
    render() {
        const {events, createEvent, buyTicket, hexToString} = this.props;
        return(
            <div className="container">
            <div className="row">
            {
                events.map(event => {
                const {id, ticketCount, price, date, name, location, description, isActive} = event;
                console.log(id,ticketCount,price, hexToString(date));
                return <TicketCard key={id} func={buyTicket} id={id} ticketCount={ticketCount} price={price} date={hexToString(date)} name={hexToString(name)} location={hexToString(location)} description={hexToString(description)} isActive={isActive} />
                })
            }
            </div>
                <button className="btn-sm btn btn-success" onClick={createEvent.bind(this, 5, 1,"ym","hayko konser", "sakarya","açıklama", true)}>event oluştur</button>
            </div>
        );
    }
}
export default Homepage;
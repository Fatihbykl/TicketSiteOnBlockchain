import React, {Component} from 'react';
import TicketCard from './TicketCard'


class Homepage extends Component {
    render() {
        const {events, buyTicket, hexToString} = this.props;
        return(
            <div className="container">
                <div className="row">
                    {
                        events.map(event => {
                            const {id, ticketCount, price, date, name, location, city, description, category, isActive} = event;
                            return <TicketCard key={id} func={buyTicket} id={id} ticketCount={ticketCount} price={price} date={hexToString(date)} name={hexToString(name)} location={hexToString(location)} city={hexToString(city)} description={hexToString(description)} category={hexToString(category)} isActive={isActive} />
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Homepage;
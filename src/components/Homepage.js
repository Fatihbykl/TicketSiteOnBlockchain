import React, {Component} from 'react';
import TicketCard from './TicketCard';
import metamask from '../media/metamask.png';


class Homepage extends Component {
    render() {
        const {events, buyTicket, hexToString, account} = this.props;
        return(
            <div className="container">
                <div className="row">
                    {
                        !account
                        ? 
                        <div className='text-center'>
                            <img src={metamask} width="350px"/>
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Please connect your metamask wallet.
                            </p>
                        </div>
                        : null
                    }
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
import React, { Component } from "react";
import '../css/mytickets.css';
import concert from '../media/Concert.jpg';
import theatre from '../media/Theatre.jpg';
import sports from '../media/Sports.jpg';

class MyTickets extends Component {
    render() {
        const web3 = require('web3');
        const {events, buyTicket, hexToString, contract} = this.props;
        let img;
        return(
            <div className="container">
                <h2 class="heading">My Tickets</h2>
                <div className="row">
                    <div className="container ms-0 me-0 my-tickets-container" style={{width: '100%'}}>
                        <div id="active-products" class="tabcontent">
                            <div class="my-products-products">
                                <div>
                                    <table class="my-products-product-table">
                                        <thead>
                                            <tr>
                                                <th class="table-checkbox-col"></th>
                                                <th class="table-image-col"></th>
                                                <th class="table-name-col">Name</th>
                                                <th class="table-brand-col">Date</th>
                                                <th class="table-category-col">Category</th>
                                                <th class="table-stock-col">Price</th>
                                                <th class="table-price-col">Info</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tickets">
                                        {
                                            events.map((event, index) => {
                                                var [id, date, name, location, category, time, price, isActive] = [null, null, null, null, null, null, null, null];
                                                id = event['0'];
                                                date = hexToString(event['3']);
                                                time = hexToString(event['7']);
                                                price = web3.utils.fromWei(event[2].toString(), 'ether');
                                                name = event['4'];
                                                location = event['5'];
                                                category = hexToString(event['6']);
                                                isActive = event['10'];
                                                if (category === "Concert") { img = concert; }
                                                else if (category === "Theatre") { img = theatre; }
                                                else { img = sports; }
                                                return (
                                                    
                                                    <tr>
                                                        <td class="table-checkbox-col">
                                                            <span style={{fontSize: "16px"}}>{index + 1}</span>
                                                        </td>
                                                        <td class="table-image-col p-2">
                                                            <img src={img} alt="" class="table-image" />
                                                        </td>
                                                        <td class="table-name-col">{hexToString(name)}</td>
                                                        <td class="table-brand-col">{date} - {time}</td>
                                                        <td class="table-category-col">{category}</td>
                                                        <td class="table-stock-col"><span class="in-stock">{price} ETH</span></td>
                                                        <td class="table-price-col">
                                                            <button className="navbarButton" onClick={() => {window.location.href = "/event-details/" + id}}>Details</button>
                                                        </td>
                                                    </tr>

                                                                    
                                                )
                                                //return <TicketCard key={id} func={buyTicket} id={id} ticketCount={ticketCount} price={price} date={hexToString(date)} name={hexToString(name)} location={hexToString(location)} description={hexToString(description)} isActive={isActive} />
                                            })
                                        }
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MyTickets;
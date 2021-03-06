import React, { Component } from 'react';
import '../App.css';
import '../css/form.css';
import { NavLink } from 'react-router-dom';
import { IoHome, IoTicketSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlinePlusCircle } from 'react-icons/ai';

class Navbar extends Component {



    render() {
        const {account, loadData, render, isOwner} = this.props;
        console.log("isowner: " + isOwner);
        let shortAddress = "";
        if(account) { shortAddress = account.substr(0,6) + "..." + account.substr(account.length - 4); }
        return(
            <nav className="navbar navbar-light bg-light">
                <div className="navbar-brand container containerNavbar">
                    <IoTicketSharp className='me-2' style={{fontSize: "30px", color:"#0869ae"}} />
                    <span style={{fontSize: "24px", fontWeight:"bold"}}>ticket</span><span style={{color:"#0869ae", fontSize:"16px", fontWeight:"bold"}}> ETH</span>
                    <div class="float-end">
                        {
                            account
                            ? <span>
                                <NavLink className="a-link me-3" activeClassName="a-selected" exact to="/"><IoHome className='mb-1 me-1'/>Homepage</NavLink>
                                <NavLink className="a-link me-3" activeClassName="a-selected" to="/myevents"><IoTicketSharp className='mb-1 me-1'/>My Tickets</NavLink>
                            </span>
                            : null
                        }
                        {
                            isOwner
                            ? <span>
                                <NavLink className="a-link me-3" activeClassName="a-selected" to="/admin-settings#owner"><IoMdSettings className='mb-1 me-1'/>Admin Settings</NavLink>
                                <NavLink className="a-link me-3" activeClassName="a-selected" to="/create-event"><AiOutlinePlusCircle className='mb-1 me-1'/>Create Event</NavLink>
                            </span>
                            : null
                        }
                        {
                            account  
                            ? <a className='a-link'>{shortAddress}</a>
                            : <button className="navbarButton float-end" onClick={loadData}>Connect Wallet</button>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
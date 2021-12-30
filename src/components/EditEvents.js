import React, { Component } from 'react';
import '../css/form.css';

class EditEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            location: '',
            city: ',',
            description: '',
            category: '',
            time: '',
            ticketCount: 0,
            price: 0,
            isFetched: false,
        }
    }

    findEvent(id) {
        if (this.state.isFetched) { return; }
        const web3 = require('web3');
        let result = this.props.findEvent(id);
        if(typeof result === "undefined") return;
        Promise.resolve(result).then(r => {
            this.state.ticketCount = r[1];
            this.state.price = web3.utils.fromWei(r[2].toString(), 'ether');
            this.state.priceWei = r[2];
            this.state.date = this.props.hexToString(r[3]);
            this.state.title = this.props.hexToString(r[4]);
            this.state.location = this.props.hexToString(r[8]);
            this.state.city = this.props.hexToString(r[5]);
            this.state.category = this.props.hexToString(r[6]);
            this.state.time = this.props.hexToString(r[7]);
            this.state.description = this.props.hexToString(r[9]);
            this.state.isFetched = true;
        })
    }

    handleForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        this.props.editEvent(this.props.match.params.id, this.state.ticketCount, this.state.price, this.state.date, this.state.title, this.state.location, this.state.city, this.state.description, this.state.category, this.state.time, true);
        event.preventDefault();
    }

    render() {
        this.findEvent(this.props.match.params.id);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} style={{padding: 0}}>
                    <div class="form-group">
                        <h2 class="heading">Event Details</h2>
                        <div class="controls">
                            <input type="text" name="title" class="floatLabel" placeholder='Title' value={this.state.title} onChange={this.handleForm}/>
                        </div>
                        <div className='col-lg-6'>
                            <div class="controls">
                                <input type="date" name="date" class="floatLabel" value={this.state.date} onChange={this.handleForm}/>
                            </div> 
                        </div>
                        <div className='col-lg-6' style={{padding: 0}}>
                            <div class="controls">
                                <input type="time" name="time" class="floatLabel" value={this.state.time} onChange={this.handleForm}/>
                            </div> 
                        </div>
                        <div class="controls">
                            <i class="fa fa-sort"></i>
                            <select class="floatLabel" name='category' value={this.state.category} onChange={this.handleForm}>
                                <option value="blank" selected>Choose Category</option>
                                <option value="Concert" >Concert</option>
                                <option value="Theatre">Theatre</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>
                        <div class="controls">
                            <input type="text" name="location" class="floatLabel" placeholder='Address' value={this.state.location} onChange={this.handleForm}/>
                        </div>
                        <div class="controls">
                            <input type="text" name="city" class="floatLabel" placeholder='City' value={this.state.city} onChange={this.handleForm}/>
                        </div>
                        <div class="grid">
                            <div class="col-lg-6">
                                <div class="controls">
                                    <input type="number" name="ticketCount" class="floatLabel" placeholder='Ticket Count' value={this.state.ticketCount} onChange={this.handleForm}/>
                                </div>          
                            </div>
                            <div class="col-lg-6">
                                <div class="controls">
                                    <input type="number" name="price" class="floatLabel" step='0.001' placeholder='Price' value={this.state.price} onChange={this.handleForm}/>
                                </div>          
                            </div>
                        </div>
                        <div class="grid">
                            <div class="controls">
                                <textarea name="description" class="floatLabel" id="comments" placeholder='Details about your event' value={this.state.description} onChange={this.handleForm}></textarea>
                            </div>
                            <button type="submit" value="Submit" class="col-1-4 buttonForm float-end">Submit</button>
                        </div>  
                    </div>
                </form>
            </div>
        )
    }
}
export default EditEvents;
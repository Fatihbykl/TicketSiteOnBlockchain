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
            ticketCount: 0,
            price: 0,
        }
    }

    findEvent(id) {
        const web3 = require('web3');
        let result = this.props.findEvent(id);
        if(typeof result === "undefined") return;
        Promise.resolve(result).then(r => {
            this.ticketCount = r[1];
            this.price = web3.utils.fromWei(r[2].toString(), 'ether');
            this.priceWei = r[2];
            this.date = this.props.hexToString(r[3]);
            this.name = this.props.hexToString(r[4]);
            this.location = this.props.hexToString(r[5]);
            this.city = this.props.hexToString(r[6]);
            this.category = this.props.hexToString(r[7]);
            this.description = this.props.hexToString(r[8]);
        })
    }

    handleForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        this.props.createEvent(this.state.ticketCount, this.state.price, this.state.date, this.state.title, this.state.location, this.state.city, this.state.description, this.state.category, true);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} style={{padding: 0}}>
                    <div class="form-group">
                        <h2 class="heading">Event Details</h2>
                        <div class="controls">
                            <input type="text" name="title" class="floatLabel" placeholder='Title' onChange={this.handleForm}/>
                        </div>
                            <div class="controls">
                                <input type="date" name="date" class="floatLabel" onChange={this.handleForm}/>
                            </div> 
                        <div class="controls">
                            <i class="fa fa-sort"></i>
                            <select class="floatLabel" name='category' onChange={this.handleForm}>
                                <option value="blank" selected>Choose Category</option>
                                <option value="Concert" >Concert</option>
                                <option value="Theatre">Theatre</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>
                        <div class="controls">
                            <input type="text" name="location" class="floatLabel" placeholder='Address' onChange={this.handleForm}/>
                        </div>
                        <div class="controls">
                            <input type="text" name="city" class="floatLabel" placeholder='City' onChange={this.handleForm}/>
                        </div>
                        <div class="grid">
                            <div class="col-lg-6">
                                <div class="controls">
                                    <input type="number" name="ticketCount" class="floatLabel" placeholder='Ticket Count' onChange={this.handleForm}/>
                                </div>          
                            </div>
                            <div class="col-lg-6">
                                <div class="controls">
                                    <input type="number" name="price" class="floatLabel" step='0.001' placeholder='Price' onChange={this.handleForm}/>
                                </div>          
                            </div>
                        </div>
                        <div class="grid">
                            <div class="controls">
                                <textarea name="description" class="floatLabel" id="comments" placeholder='Details about your event' onChange={this.handleForm}></textarea>
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
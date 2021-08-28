import React, {Component} from 'react';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            location: '',
            description: '',
            ticketCount: 0,
            price: 0
        }
    }

    handleForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        this.props.createEvent(this.state.ticketCount, this.state.price, this.state.date, this.state.name, this.state.location, this.state.description, true);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <h1>Create Event</h1>
                <form className="m-auto mt-5" onSubmit={this.handleSubmit}>
                    <div class="form-group mt-3">
                        <label for="EventName">Event Name</label>
                        <input type="text" name="name" class="form-control" id="EventName" aria-describedby="emailHelp" onChange={this.handleForm} />
                    </div>
                    <div class="form-group mt-3">
                        <label for="date">Date</label>
                        <input type="date" name="date" class="form-control" id="date" onChange={this.handleForm} />
                        <small class="form-text text-muted">When is the event?</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="loc">Location</label>
                        <input type="text" name="location" class="form-control" id="loc" onChange={this.handleForm} />
                        <small class="form-text text-muted">Where is the event?</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="desc">Description</label>
                        <input type="text" name="description" class="form-control" id="desc" onChange={this.handleForm} />
                        <small class="form-text text-muted">Info about event</small>

                    </div>
                    <div class="form-group mt-3">
                        <label for="tcount">Ticket Count</label>
                        <input type="number" name="ticketCount" class="form-control" id="tcount" min="1" onChange={this.handleForm} />
                        <small class="form-text text-muted">Max ticket count</small>

                    </div>
                    <div class="form-group mt-3">
                        <label for="price">Price</label>
                        <input type="number" name="price" class="form-control" id="price" min="1" onChange={this.handleForm} />
                        <small class="form-text text-muted">How much is the ticket?</small>

                    </div>
                    <button type="submit" class="btn btn-primary mt-3 float-end">Submit</button>
                </form>
            </div>
        )
    }
}
export default CreateEvent
import React, {Component} from 'react';
import '../css/form.css';

class CreateEvent extends Component {
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
                <form onSubmit={this.handleSubmit}>
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

                {/*
                <h1>Create Event</h1>
                <form className="m-auto mt-5" onSubmit={this.handleSubmit}>
                    <div class="form-group mt-3">
                        <label for="EventName">Etkinlik Adı</label>
                        <input type="text" name="name" class="form-control" id="EventName" aria-describedby="emailHelp" onChange={this.handleForm} />
                    </div>
                    <div class="form-group mt-3">
                        <label for="date">Tarih</label>
                        <input type="date" name="date" class="form-control" id="date" onChange={this.handleForm} />
                        <small class="form-text text-muted">Etkinlik ne zaman?</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="loc">Yer</label>
                        <input type="text" name="location" class="form-control" id="loc" onChange={this.handleForm} />
                        <small class="form-text text-muted">Etkinlik nerede?</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="desc">Açıklama</label>
                        <input type="text" name="description" class="form-control" id="desc" onChange={this.handleForm} />
                        <small class="form-text text-muted">Etkinlik hakkında bilgi</small>

                    </div>
                    <div class="form-group mt-3">
                        <label for="tcount">Bilet Sayısı</label>
                        <input type="number" name="ticketCount" class="form-control" id="tcount" min="1" onChange={this.handleForm} />
                        <small class="form-text text-muted">Maksimum bilet sayısı</small>

                    </div>
                    <div class="form-group mt-3">
                        <label for="price">Fiyat</label>
                        <input type="number" name="price" class="form-control" id="price" step="0.0001" onChange={this.handleForm} />
                        <small class="form-text text-muted">Bilet kaç ETH?</small>

                    </div>
                    <button type="submit" class="btn btn-primary mt-3 float-end">Oluştur</button>
                </form>
                */}
            </div>
        )
    }
}
export default CreateEvent
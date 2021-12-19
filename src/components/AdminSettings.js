import React, { Component } from 'react';
import '../css/adminsettings.css';
import '../css/form.css';

class AdminSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            address1: '',
            address2: '',
        }
    }

    handleForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmitAddOwner = (event) => {
        this.props.addOwner(this.state.address1);
        event.preventDefault();
    }

    handleSubmitDeleteOwner = (event) => {
        this.props.deleteOwner(this.state.address2, this.state.index);
        event.preventDefault();
    }

    render() {
        const { owners } = this.props;
        return(
            <div className='container'>
            <div class="clearfix">
                <div class="slidebar">
                    <div class="logo">
                    <a href=""></a>
                    </div>
                    <ul>
                        <li><a href="#owners">Owners</a></li>
                        <li><a href="#owner" id="targeted">Owner Settings</a></li>
                        <li><a href="#event">Event Settings</a></li>
                    </ul>
                </div>
                <div class="main">
                    <div class="mainContent clearfix">
                        <div id="owners">
                            <h2 class="heading">Owners</h2>
                            <div style={{padding: "0 20px"}}>
                                <table id="addresses">
                                    <tr>
                                        <th>Index</th>
                                        <th>Adress</th>
                                    </tr>
                                    {
                                        owners.map((owner, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{owner}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </table>
                            </div>
                        </div>
                        <div id="owner">
                            <h2 class="heading">Add Owner</h2>
                            <div>
                                <form onSubmit={this.handleSubmitAddOwner} style={{padding: "0 20px"}}>
                                    <div class="form-group mb-5">
                                        <div class="controls">
                                            <input type="text" name="address1" class="floatLabel" placeholder='Address' onChange={this.handleForm}/>
                                        </div>
                                        <button type="submit" value="Submit" class="col-1-4 buttonForm float-end">Add</button>
                                    </div>
                                </form>
                            </div>
                            <h2 class="heading mt-3">Delete Owner</h2>
                            <form onSubmit={this.handleSubmitDeleteOwner} style={{padding: "0 20px"}}>
                                <div class="form-group mb-5">
                                    <div class="controls">
                                        <input type="text" name="address2" class="floatLabel" placeholder='Address' onChange={this.handleForm}/>
                                    </div>
                                    <div class="controls">
                                        <input type="number" name="index" class="floatLabel" placeholder='Index' onChange={this.handleForm}/>
                                    </div>
                                    <button type="submit" value="Submit" class="col-1-4 buttonForm float-end">Delete</button>
                                </div>
                            </form>
                        </div>
                        <div id="event">
                            <h2 class="header">posts</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AdminSettings;
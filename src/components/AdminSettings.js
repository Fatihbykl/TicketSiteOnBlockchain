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
            postId: 0,
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

    changezIndex(id) {
        let array = ['owners', 'owner', 'event']
        for (let index = 0; index < array.length; index++) {
            if (array[index] === id) {
                document.getElementById(id).style.zIndex = 1;
            }else{
                document.getElementById(array[index]).style.zIndex = 0;
            }
        }
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
                        <li><a href="#owners" onClick={() => {this.changezIndex("owners")}}>Owners</a></li>
                        <li><a href="#owner" id="targeted" onClick={() => {this.changezIndex("owner")}}>Owner Settings</a></li>
                        <li><a href="#event" onClick={() => {this.changezIndex("event")}}>Event Settings</a></li>
                    </ul>
                </div>
                <div class="main">
                    <div class="mainContent clearfix">
                        <div id="owners" style={{height: '100%'}}>
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
                        <div id="owner" style={{height: '100%'}}>
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
                        <div id="event" style={{height: '100%'}}>
                            <h2 class="heading">Edit Post</h2>
                            <div>
                                <form onSubmit={this.handleSubmitAddOwner} style={{padding: "0 20px"}}>
                                    <div class="form-group mb-5">
                                        <div class="controls">
                                            <input type="text" name="postId" class="floatLabel" placeholder='Post id' onChange={this.handleForm}/>
                                        </div>
                                        <button type="submit" value="Submit" class="col-1-4 buttonForm float-end" onClick={() => {window.location.href = '/edit-event/' + this.state.postId}}>Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AdminSettings;
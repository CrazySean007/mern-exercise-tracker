import React, {Component} from 'react'
import axios from "axios";
import constants from "../constants";
import "./component.css"
import button from "bootstrap/dist/css/bootstrap.min.css"

export default class CreateUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : ''
        }
    }

    changeUserName = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit = () => {
        let username = this.state.username;
        if(!(username && username.length > 3)) {
            alert("The length must be greater than 3!");
            return;
        }
        // console.log("new username: ", username)
        axios({
            method: 'post',
            url: constants.backendUrl+'users/add/',
            data: {
                username
            }
        }).then(res => {
            window.location = "/"
        }).catch(() => {
            alert("Please user a new username!");
        });
    }

    render() {
        return (
            <div className="container">
                <h4>Create New User</h4>
                <label>Username:</label>
                <input onChange={this.changeUserName} type={"text"} className="form-control" placeholder="Please input the username" /><br/>
                <button onClick={this.onSubmit} type="button" className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

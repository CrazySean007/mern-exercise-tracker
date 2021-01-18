import React, {Component} from 'react'
import axios from "axios";
import constants from "../constants";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"


export default class EditExercise extends Component {

    submitExercise = (e) => {
        e.preventDefault();
        const {username, description, date, duration} = this.state;
        if(!username || !description || !date || !duration) {
            alert("Please input all the missing information!");
            return;
        }
        console.log(this.state);
        axios
            .post(constants.backendUrl + `exercises/update/${this.state._id}`,
            { username, description, date, duration })
            .then(()  => {
                window.location = "/";
            })
            .catch(err => {
                alert("Error happened! Please refresh page or try again later！");
            });
    };
    onchangeDescription = (e) => {
        const description = e.target.value;
        this.setState({
            description
        });
    };
    onchangeUsername = (e) => {
        const username = e.target.value;
        this.setState({
            username
        });
    };
    onchangeDate = (date) => {
        this.setState({
            date
        });
    };
    onchangeDuration = e => {
        const duration = e.target.value;
        this.setState({
            duration
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            description : '',
            duration: 0,
            date: new Date(),
            users: []
        }

    }

    componentDidMount() {
        const exercise = this.props.location.state;
        if(!exercise)
            window.location.href="/";
        console.log(exercise);
        axios
            .get(constants.backendUrl+"users")
            .then(res => {
                let users = [];
                res.data.map(user => {
                    users.push(user.username);
                    return null;
                })
                this.setState({users});
            })
            .catch(err => {
                alert("Error happened! Please refresh the page or try again later!");
            });
        this.setState({
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(Date.parse(exercise.date)),
            _id: exercise._id
        });
    }

    render() {
        return (
            <div className="container">
                <h3>
                    Create New Exercise Log
                </h3>
                <form onSubmit={this.submitExercise}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select
                            className="form-control"
                            required
                            value={this.state.username}
                            onChange={this.onchangeUsername}
                        >
                            {
                                this.state.users.map(user => {
                                    return (
                                        <option key={user} value={user}>{user}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onchangeDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker selected = {this.state.date} onChange={this.onchangeDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Duration:</label>
                        <input type="number" className="form-control" value={this.state.duration} onChange={this.onchangeDuration}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>

                </form>


            </div>
        )
    }
}

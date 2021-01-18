import React, {Component} from 'react'
import axios from "axios";
import constants from "../constants";
import {Link} from "react-router-dom"

export default class ExercisesListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            showEditModal: false,
            showDeleteModal: false
        }
    }

    componentDidMount() {
        axios.get(constants.backendUrl+"exercises/")
            .then(res => {
                console.log(res.data);
                this.setState({exerciseList: res.data});
            })
    }

    render() {
        return (
            <div>
                <h3>Exercise List</h3>
                <div className="table-responsive">
                    <table className="table table-striped text-center align-items-center">
                        <thead className="thead-light">
                        <tr>
                            <th>
                                username
                            </th>
                            <th>
                                description
                            </th>
                            <th>
                                duration
                            </th>
                            <th>
                                date
                            </th>
                            <th>
                                action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.exerciseList.map(exercise => {
                                return (
                                    <tr key = {exercise._id}>
                                        <td>
                                            {exercise.username}
                                        </td>
                                        <td>
                                            {exercise.description}
                                        </td>
                                        <td>
                                            {exercise.duration}
                                        </td>
                                        <td>
                                            {exercise.date}
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-link"><Link to={{pathname: '/edit', state: exercise}}>edit</Link></button>|<button type="button" className="btn btn-link" onClick={() => this.deleteExercise(exercise)}>delete</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        </tbody>

                    </table>
                </div>

            </div>
        )
    }

    deleteExercise(exercise) {
        axios({
            method: 'delete',
            url: constants.backendUrl+`exercises/${exercise._id}`
        }).then(() => {
            window.location.reload();
        }).catch(() => {
            alert("delete failed!");
        });
        return undefined;
    }
}

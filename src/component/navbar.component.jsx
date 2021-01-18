import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./component.css"

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-md navbar-expand-sm nav-title">
                <Link to = "/" className = "navbar-brand">ExerciseTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to = "/" className = "nav-link">
                                Exercises
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/create" className = "nav-link">
                                Create Exercise Log
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/user" className = "nav-link">
                                Create User
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

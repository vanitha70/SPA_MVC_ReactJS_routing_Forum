import React, {Component} from 'react'
import './Greeting.css'

export default class Greeting extends Component {
    render() {
        if (this.props.user === '' || this.props.user === undefined) {
            return null
        } else {
            return (
                <span className="greet">Welcome, {this.props.user}</span>
            )
        }
    }
}
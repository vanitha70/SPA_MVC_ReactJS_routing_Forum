import React, {Component} from 'react'
import ChangePassForm from './ChangePassForm'
import User from '../../models/userModel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import $ from 'jquery'
let user = new User();

export default class ChangePassPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            currentPass: '',
            password: '',
            repeat: '',
            submitDisabled: false,
            showModal: true
        };
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({showModal: false});
        if (this.state.currentPass === '')
            browserHistory.push('/account/profile')
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'currentPass':
                this.setState({currentPass: event.target.value})
                break
            case 'password':
                this.setState({password: event.target.value})
                break
            case 'repeat':
                this.setState({repeat: event.target.value})
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.password !== this.state.repeat) {
            alert("Passwords don't match")
            return
        }
        if (this.state.currentPass === '' || this.state.password === '') {
            alert("Please fill in all fields in order to proceed with your registration!")
            return;
        }
        this.setState({submitDisabled: true})
        user.changePassword(this.state.username, this.state.currentPass, this.state.password, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.close()
            browserHistory.push('/account/profile')
        } else {
            $('#error').show()
            this.setState({
                submitDisabled: false,
                currentPass: '',
                password: '',
                repeat: ''
            })
        }
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title componentClass="h2" className="text-center">
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePassForm
                        currentPass={this.state.currentPass}
                        password={this.state.password}
                        repeat={this.state.repeat}
                        submitDisabled={this.state.submitDisabled}
                        onChangeHandler={this.onChangeHandler}
                        onSubmitHandler={this.onSubmitHandler}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} className="btn-block btn-danger">Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

ChangePassForm.contextTypes = {
    router: React.PropTypes.object
}
import React, {Component} from 'react'
import LoginForm from './LoginForm'
import User from '../../models/userModel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import $ from 'jquery'
let user = new User();

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', submitDisabled: false, showModal: true }
        this.bindEventHandlers()
    }

    componentDidMount() {
        $('#error').hide()
    }

    close() {
	    this.setState({ showModal: false });
	    if (this.state.username === '')
		    this.context.router.push('/')

    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
	    this.close = this.close.bind(this);
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value })
                break
            case 'password':
                this.setState({ password: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        this.setState({ submitDisabled: true })
        user.login(this.state.username, this.state.password, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.close()
            if(sessionStorage.getItem('Admin') === 'true'){
                this.context.router.push('/admin')
            } else {
                this.context.router.push('/posts')
            }
        } else {
            // Something went wrong, let the user try again
            console.clear()
            $('#error').show()
            this.setState({ submitDisabled: false })
        }
    }

    render() {
        return (
	        <Modal show={this.state.showModal} onHide={this.close}>
		        <Modal.Header>
			        <Modal.Title componentClass="h2" className="text-center">
				        Login
			        </Modal.Title>
		        </Modal.Header>
	        <Modal.Body>
	            <LoginForm
                    username={this.state.username}
                    password={this.state.password}
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

LoginPage.contextTypes = {
    router: React.PropTypes.object
}
import React, {Component} from 'react'
import LoginForm from './LoginForm'
import User from '../../models/userModel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
let user = new User();

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', submitDisabled: false, showModal: true }
        this.bindEventHandlers()
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
	    console.log(user);
        user.login(this.state.username, this.state.password, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
	        this.close()
            this.context.router.push('/allPosts')
        } else {
            // Something went wrong, let the user try again
            this.setState({ submitDisabled: true })
        }
    }

    render() {
        return (
	        <Modal show={this.state.showModal} onHide={this.close}>
		        <Modal.Header>
			        <Modal.Title className="text-center">
				        <h3>Please login</h3>
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
import React, {Component} from 'react'
import RegisterForm from './RegisterForm'
import User from '../../models/userModel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import $ from 'jquery'
let user = new User();

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	username: '',
	        password: '',
	        repeat: '',
	        submitDisabled: false,
	        showModal: true
        };
        this.bindEventHandlers()
    }

    componentDidMount() {
        $('#error').hide()
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
	    this.close = this.close.bind(this);
    }

	close() {
		this.setState({ showModal: false });
		if (this.state.username === '')
			this.context.router.push('/')
	}

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value })
                break
            case 'password':
                this.setState({ password: event.target.value })
                break
            case 'repeat':
                this.setState({ repeat: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.password !== this.state.repeat) {
            $('#error').show().text("Passwords don't match!")
            return
        } else if (this.state.password.length < 3) {
            $('#error').show().text("Passwords must consist at least 3 symbols")
            return
        }
        $('#error').hide()
        this.setState({ submitDisabled: true })
        try {
            user.register(this.state.username, this.state.password, this.onSubmitResponse)
        } catch(err) {
            console.log(err)
            console.log('cached')
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from register page
            $('#error').hide()
	        this.close()
	        this.context.router.push('/posts')
        } else {
            //console.clear()
            // Something went wrong, let the user try again
            $('#error').show().text("User with that name already exists!")
            this.setState({ submitDisabled: false })
        }
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
	            <Modal.Header>
		            <Modal.Title componentClass="h2" className="text-center">
			            Register
		            </Modal.Title>
	            </Modal.Header>
	            <Modal.Body>
			        <RegisterForm
				        username={this.state.username}
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

RegisterPage.contextTypes = {
    router: React.PropTypes.object
}
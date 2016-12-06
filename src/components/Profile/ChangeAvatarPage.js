import React, {Component} from 'react'
import ChangeAvatarForm from './ChangeAvatarForm'
// import User from '../../models/userModel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import Avatar from '../../models/avatarModel'

// let user = new User();
let avatar = new Avatar();

export default class ChangeAvatarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            showModal: true,
            submitDisabled: false,
            file: ''
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
        browserHistory.push('/account/profile')
        // if (this.state.img === '')
        //     browserHistory.push('/account/profile')
    }

    onChangeHandler(event) {
        this.setState({file: event.target.files[0]})
    }

    onSubmitHandler(event) {
        event.preventDefault()
        avatar.uploadFile(this.state.file, this.onSubmitResponse)


    }

    onSubmitResponse(response) {
        sessionStorage.setItem('avatar', response._downloadURL)
        this.close()
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title componentClass="h2" className="text-center">
                        Change Avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangeAvatarForm
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

ChangeAvatarForm.contextTypes = {
    router: React.PropTypes.object
}

import React, {Component} from 'react'
import ChangeAvatarForm from './ChangeAvatarForm'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import Avatar from '../../models/avatarModel'
import observer from '../../models/observer'

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
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({showModal: false});
        browserHistory.push('/account/profile')
    }

    onChangeHandler(event) {
        this.setState({file: event.target.files[0]})
    }

    onSubmitHandler(event) {
        event.preventDefault()
        this.close()
        //console.log(this.state.file)
        avatar.uploadFile(this.state.file, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        sessionStorage.setItem('avatar', response._downloadURL)
        observer.onAvatarChange()
        browserHistory.push('/account/profile')
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

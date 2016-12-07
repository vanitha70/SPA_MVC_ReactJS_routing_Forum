import React, {Component} from 'react'
import CreateForm from './CreateCommentForm'
import Comment from '../../../models/commentModel'
import observer from '../../../models/observer'
import {browserHistory} from 'react-router';
let comment = new Comment();

export default class CreateCommentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {body: '', submitDisabled: false}
        this.bindEventHandlers()
    }

    componentDidMount() {
        // Populate form
        if(sessionStorage.getItem('username') === 'guest'){
            observer.showError('You are currently not logged in!')
            browserHistory.push('/')
        }
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'content':
                this.setState({ body: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.body.length < 5) {
            observer.showError("Comment consist at least 5 digits")
            return
        }
        this.setState({ submitDisabled: true })
        comment.createComment(this.state.body, this.props.params.postId,sessionStorage.getItem('username'), this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from createPost page
            this.context.router.push('/posts/details/'+this.props.params.postId);
        } else {
            // Something went wrong, let the user try again
            this.setState({ submitDisabled: true })
        }
    }

    render() {
        return (
            <div>
                <div className="page-header text-center">
                    <h2>Create Comment</h2>
                </div>
                <CreateForm
                    content={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

CreateCommentPage.contextTypes = {
    router: React.PropTypes.object
}

import React, {Component} from 'react'
import RegisterForm from './CreatePostForm'
import Post from '../../models/postModel'
let post = new Post();

export default class CreatePostPage extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', body: '', submitDisabled: false }
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'title':
                this.setState({ title: event.target.value })
                break
            case 'content':
                this.setState({ body: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.title.length < 5 || this.state.body < 5) {
            alert("Title and content must consist at least 5 digits")
            return
        }
        this.setState({ submitDisabled: true })
        post.createPost(this.state.title, this.state.body, sessionStorage.getItem('username'), this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from createPost page
            this.context.router.push('/')
        } else {
            // Something went wrong, let the user try again
            this.setState({ submitDisabled: true })
        }
    }

    render() {
        return (
            <div>
                <span>Create Post Page</span>
                <RegisterForm
                    title={this.state.title}
                    content={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

CreatePostPage.contextTypes = {
    router: React.PropTypes.object
}
import React, {Component} from 'react';
import EditForm from './EditForm';
import Post from '../../models/postModel';
import observer from '../../models/observer'
let post = new Post()

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', body: '', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        post.loadPostDetails(this.props.params.postId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title ,
            body: response.body ,
            author: response.author ,
            submitDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        if(this.state.title.length >= 5 && this.state.body.length >= 5 ) {
            post.editPost(this.props.params.postId, this.state.title, this.state.body, this.state.author, this.onSubmitResponse);
        } else {
            observer.showError('Post title and Post body must be at least 5 digits long!')
            this.setState({
                submitDisabled: false
            });
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/allPosts');
            observer.showSuccess('Post edited.')
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h3>Edit Post Page</h3>
                <EditForm
                    title={this.state.title}
                    body={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
import React, {Component} from 'react';
import EditCommentForm from './EditCommentForm';
import Comment from '../../../models/commentModel';
import observer from '../../../models/observer'

let comment = new Comment();

export default class EditCommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
       comment.loadCommentDetails(this.props.params.commentId, this.onLoadSuccess);
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
            text: response.text ,
            postId: response.postId ,
            author: response.author,
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
        if(this.state.text.length<5 ) {
            observer.showError('Comment must be at least 5 letters long!')
            this.setState({
                submitDisabled: false
            })
        }
         else {
            comment.editComment(this.props.params.commentId
                ,this.state.text
                ,this.state.postId
                ,this.state.author
                ,this.onSubmitResponse);
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.context.router.push('/posts/details/'+this.state.postId);
            observer.showSuccess('Comment edited')
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <div className="page-header text-center">
                    <h2>Edit Comment</h2>
                </div>
                <EditCommentForm
                    text={this.state.text}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

EditCommentPage.contextTypes = {
    router: React.PropTypes.object
};
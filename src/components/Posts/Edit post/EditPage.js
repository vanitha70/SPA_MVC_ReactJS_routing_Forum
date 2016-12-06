import React, {Component} from 'react';
import EditForm from './EditForm';
import Post from '../../../models/postModel';
import Category from '../../../models/categoryModel';
import observer from '../../../models/observer'
import {browserHistory} from 'react-router';

let category = new Category();
let post = new Post();

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', body: '',category: '' , categories: [], submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
	    let requests = [
	        post.getPostById(this.props.params.postId),
	        category.getAllCategories()
	    ];
	    Promise.all(requests).then(this.onLoadSuccess)
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess([post, categories]) {
        this.setState({
            title: post.title ,
            body: post.body ,
            author: post.author ,
            category: post.category,
            categories: categories,
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
        if(this.state.title.length < 5 && this.state.body.length < 5 ) {
            observer.showError('Post title and Post body must be at least 5 digits long!')
            this.setState({
                submitDisabled: false
            })
        } else if(this.state.category === '') {
            observer.showError('Please select category!')
            this.setState({
                submitDisabled: false
            });
        } else {
            post.editPost(this.props.params.postId, this.state.title, this.state.body, this.state.author, this.state.category, this.onSubmitResponse);
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from edit page
            browserHistory.push('/posts')
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
                    categories={this.state.categories}
                    category={this.state.category}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}
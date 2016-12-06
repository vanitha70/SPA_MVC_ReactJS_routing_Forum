import React, {Component} from 'react'
import CreateForm from './CreatePostForm'
import Post from '../../../models/postModel'
import observer from '../../../models/observer'
import Category from '../../../models/categoryModel';
let post = new Post();
let categoryModule = new Category();

export default class CreatePostPage extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', body: '', category:'', categories: [], submitDisabled: false }
        this.bindEventHandlers()
    }

    componentDidMount() {
        if(sessionStorage.getItem('username') === 'guest' || (!sessionStorage.getItem('username'))){
            observer.showError("Please register or login first!")
            this.context.router.push('/')
        }
        categoryModule.getAllCategories(this.loadCategories)
    }

    loadCategories(data){
        this.setState({
            categories: data
        })
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.loadCategories = this.loadCategories.bind(this)
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
            case 'category':
                this.setState({ category: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.title.length < 5 || this.state.body < 5) {
            observer.showError("Title and content must consist at least 5 digits!")
            return
        } else if (this.state.category === ''){
            observer.showError("Please select a category!")
            return
        }
        this.setState({ submitDisabled: true })
        post.createPost(this.state.title, this.state.body, sessionStorage.getItem('username'),this.state.category , this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from createPost page
            this.context.router.push('/posts')
        } else {
            observer.showError("Please register or login first!")
            // Something went wrong, let the user try again
            this.setState({ submitDisabled: false })
        }
    }

    render() {
        return (
	        <div>
		        <div className="page-header text-center">
			        <h2>Create Post</h2>
		        </div>
                <CreateForm
                    title={this.state.title}
                    content={this.state.body}
                    categories={this.state.categories}
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
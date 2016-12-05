import React, {Component} from 'react'
import Post from '../../models/postModel'
import Pager from 'react-pager';
import { browserHistory } from 'react-router'
let postModule = new Post();


export default class AllPostsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            pagePosts: [],
            category: 'All',
            categories: [],
            total:       0,
            current:     0,
            visiblePage: 10
        }
        this.bindEventHandlers()
    }

    onChangeHandler(event) {
        this.setState({
            category: event.target.value,
            current: 0
        })
        if(event.target.value !== 'All') {
            this.setState({
                pagePosts: this.state.posts.filter(a => a.category === event.target.value),
                total: Math.ceil(this.state.posts.filter(a => a.category === event.target.value).length / 10),
            })
        } else {
            this.setState({
                pagePosts: this.state.posts.slice(0 , 10),
                total: Math.ceil(this.state.posts.length / 10),
            })
        }
    }

    handlePageChanged(newPage) {
        if(this.state.category === 'All'){
            this.setState({
                current: newPage,
                total: Math.ceil(this.state.posts.length / 10),
                pagePosts: this.state.posts.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
            })
        } else {
            this.setState({
                current: newPage,
                total: Math.ceil(this.state.posts.filter(a => a.category === this.state.category).length / 10),
                pagePosts: this.state.posts.filter(a => a.category === this.state.category)
                    .slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
            })
        }
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
        postModule.getAllPosts(this.onLoadSuccess)
    }

    onLoadSuccess(response, categories) {
        this.setState({
            posts: response.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pagePosts: response.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(response.length / 10),
            categories: categories
        })
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onDeleteResponse)
    }

    render() {
        let options = this.state.categories.map(category =>
            <option key={category._id}>{category.name}</option>
        );

        let postRows = this.state.pagePosts.map(post =>
            <tr key={post._id} onClick={() => {browserHistory.push('posts/details/'+post._id)}}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>{new Date(Date.parse(post._kmd.lmt)).toLocaleString()}</td>
                <td>{post.rating}</td>
            </tr>
        );

        return (
            <div>
                <div className="form-group">
                    <label>Select category:</label>
                    <select className="form-control" id="sel1" name="category" onChange={this.onChangeHandler}>
                        <option key="empty">All</option>
                        {options}
                    </select>
                </div>
                <h1>All Posts</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Published date:</th>
                        <th>Views</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postRows}
                    </tbody>
                </table>
                <Pager
                    total={this.state.total}
                    current={this.state.current}
                    visiblePages={this.state.visiblePage}
                    titles={{ first: '<|', last: '>|' }}
                    onPageChanged={this.handlePageChanged}
                />
            </div>
        )
    }
}

AllPostsPage.contextTypes = {
    router: React.PropTypes.object
}
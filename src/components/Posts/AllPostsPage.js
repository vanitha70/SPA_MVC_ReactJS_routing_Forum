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
            total:       0,
            current:     0,
            visiblePage: 5
        }
        this.bindEventHandlers()
    }

    handlePageChanged(newPage) {
        this.setState({
            current: newPage,
            total: Math.ceil(this.state.posts.length / 10),
            pagePosts: this.state.posts.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
        })
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
        postModule.getAllPosts(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        this.setState({
            posts: response,
            pagePosts: response.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(response.length / 10)
        })
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onDeleteResponse)
    }

    render() {
        let postRows = this.state.pagePosts.map(post =>
        <tr key={post._id} onClick={() => {browserHistory.push('posts/details/'+post._id)}}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>{post.rating}</td>
            </tr>
        );

        return (
            <div>
                <h1>All Posts</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Author</th>
                        <th>Category</th>
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
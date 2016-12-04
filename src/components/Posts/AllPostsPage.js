import React, {Component} from 'react'
import Post from '../../models/postModel'
import Pager from 'react-pager';
import {Link} from 'react-router'
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
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    handlePageChanged(newPage) {
        this.setState({
            current: newPage,
            total: Math.ceil(this.state.posts.length / 5),
            pagePosts: this.state.posts.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+5)
        })
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onDeleteResponse=this.onDeleteResponse.bind(this);
    }

    componentDidMount() {
        postModule.getAllPosts(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        this.setState({
            posts: response,
            pagePosts: response.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 5),
            total: Math.ceil(response.length / 5)
        })
    }

    action(post,userId){
        let pathEdit = 'posts/edit/'+post._id
        let pathDetails = 'posts/details/'+post._id
        if(post._acl.creator===userId){
            return (
                <td>
                    <input type="button"value="Delete"onClick={()=> this.onActionHandler(post)}/>
                    <Link to={pathEdit} className="btn btn-default" activeClassName="btn btn-default active">Edit</Link>
                    <Link to={pathDetails} className="btn btn-default" activeClassName="btn btn-default active">Details</Link>
                </td>
            )
        }
        return (
            <td>
                <Link to={pathDetails} className="btn btn-default" activeClassName="btn btn-default active">Details</Link>
            </td>
        )
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onDeleteResponse)
    }

    onDeleteResponse(response,id) {
        if (response === true) {
            let index = this.state.posts.findIndex(p=>p._id===id)
            this.state.posts.splice(index,1)
            this.setState({posts:this.state.posts})
            if(this.state.pagePosts.length > 1) {
                this.handlePageChanged(this.state.current)
            } else {
                this.handlePageChanged(0)
            }
        }
    }

    render() {
        let postRows = this.state.pagePosts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
                <td>{post.rating}</td>
                {this.action(post,sessionStorage.userId)}
            </tr>
        );

        return (
            <div>
                <h1>All Posts</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Author</th>
                        <th>Rating</th>
                        <th>Actions</th>
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
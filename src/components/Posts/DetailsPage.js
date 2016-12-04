import React, {Component} from 'react'
import Post from '../../models/postModel'
import {Link} from 'react-router'
import { browserHistory } from 'react-router'
let postModule = new Post();

export default class DetailsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                _acl: {
                    creator: ''
                }
            }
        }
        this.bindEventHandlers()
    }


    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onActionHandler = this.onActionHandler.bind(this)
    }

    onLoadSuccess(response) {
        this.setState({post: response,});
    }

    componentDidMount() {
        postModule.loadPostDetails(this.props.params.postId, this.onLoadSuccess);
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onDeleteResponse)
    }

    onDeleteResponse(response,id) {
        if (response === true) {
            browserHistory.push('/posts')
        }
    }

    action(post,userId){
        let pathEdit = 'posts/edit/'+post._id
        if(post._acl.creator===userId){
            return (
                <td>
                    <input type="button"value="Delete"onClick={()=> this.onActionHandler(post)}/>
                    <Link to={pathEdit} className="btn btn-default" activeClassName="btn btn-default active">Edit</Link>
                </td>
            )
        }
        return (
            <td></td>
        )
    }

    render() {
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
                        <tr>
                            <td>{this.state.post.title}</td>
                            <td>{this.state.post.body}</td>
                            <td>{this.state.post.author}</td>
                            <td></td>
                            {this.action(this.state.post,sessionStorage.userId)}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

DetailsPage.contextTypes = {
    router: React.PropTypes.object
}
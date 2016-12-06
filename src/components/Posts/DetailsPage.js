import React, {Component} from 'react'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'
import Comment from '../../models/commentModel'
import Post from '../../models/postModel'
import View from '../../models/viewsModel'

let postModule = new Post();
let commentModule = new Comment();
let viewModule = new View();

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                _acl: {
                    creator: ''
                }
            }
            , postComments: {}
        };
        this.bindEventHandlers()
    }


    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onActionHandler = this.onActionHandler.bind(this);
        this.onDeleteCommentActionHandler = this.onDeleteCommentActionHandler.bind(this);
        this.commentActions = this.commentActions.bind(this);
        this.onDeleteCommentResponse = this.onDeleteCommentResponse.bind(this);
    }

    onLoadSuccess([view, post, comments]) {
    	viewModule.increaseViewCount(view[0]);
	    post.rating = view[0].rating;
        this.setState({post: post});
	    this.setState({postComments: comments})
    }


    componentDidMount() {
    	let requests = [
    	    viewModule.getViewByPostId(this.props.params.postId),
            postModule.getPostById(this.props.params.postId),
            commentModule.getPostComments(this.props.params.postId)
	    ];
    	Promise.all(requests).then(this.onLoadSuccess);
    }

    showComments(comments) {
        let commentsToPrint = [];
        if(comments!==undefined) {
            commentsToPrint.push(<h2 key={-1}>Comments</h2>);
            for (let i in comments) {
                if (comments !== []) {
                    commentsToPrint.push(<div key={i}>{comments[i].text} by <strong key={i}>{comments[i].author}</strong> on
                            {comments[i]._kmd.lmt.slice(0, 16).replace('T', '-')} {this.commentActions(comments[i], sessionStorage.userId)}
                        </div>)

                }
            }
        }
        return commentsToPrint
    }

    onActionHandler(post) {
        postModule.deletePost(post._id, this.onDeleteResponse)
        commentModule.deleteCommentsByPostId(post._id, this.onDeleteResponse)
    }

    onDeleteResponse(response, id) {
        if (response === true) {
            browserHistory.push('/posts')
        }
    }

    onDeleteCommentActionHandler(comment) {
        commentModule.deleteComment(comment._id, this.onDeleteCommentResponse)
    }

    onDeleteCommentResponse(response, id) {
        if (response === true) {
            let index = this.state.postComments.findIndex(c => c._id === id)
            this.state.postComments.splice(index, 1)
            this.setState({postComments: this.state.postComments})
        }
    }

    commentActions(comment, userId) {
        let commentEditPath = '../../comments/edit/'+comment._id;

        if (comment._acl.creator === userId) {
            return <div><input className="btn btn-danger" type="button" value="Delete my comment"
                          onClick={() => this.onDeleteCommentActionHandler(comment)}/>
                <Link to={commentEditPath} className="btn btn-default"activeClassName="btn btn-default active">Edit my comment</Link>
            </div>
        }
    }

    action(post, userId) {
        let pathEdit = '/posts/edit/' + post._id
        let pathAddComment = '/comments/' + post._id
        if (post._acl.creator === userId || sessionStorage.getItem('Admin') === 'true') {
            return (
                <div>
                    <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
                    <Link to={pathEdit} className="btn btn-default" activeClassName="btn btn-default active">Edit</Link>
                    <input className="btn btn-danger" type="button" value="Delete"
                           onClick={() => this.onActionHandler(post)}/>
                </div>
            )
        }
        return (
            <div>
                <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <h4>published by <strong>{this.state.post.author}</strong>
                    <div>Views : {this.state.post.rating}</div>
                </h4>
                <div>{this.state.post.body}</div>
                <div>{this.action(this.state.post, sessionStorage.userId)}</div>
                {this.showComments(this.state.postComments)}
            </div>
        )
    }
}

DetailsPage.contextTypes = {
    router: React.PropTypes.object
}
import React, {Component} from 'react'
import Post from '../../models/postModel'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'
import Comment from '../../models/commentModel'
let postModule = new Post()
let commentModule = new Comment()
export default class DetailsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                _acl: {
                    creator: ''
                }
            }
            , postComments: {}
        }
        this.bindEventHandlers()
    }


    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.onActionHandler = this.onActionHandler.bind(this)
        this.onDeleteCommentActionHandler = this.onDeleteCommentActionHandler.bind(this)
        this.deleteCommentAction = this.deleteCommentAction.bind(this)
        this.onDeleteCommentResponse = this.onDeleteCommentResponse.bind(this)
        this.onLoadCommentsSuccess = this.onLoadCommentsSuccess.bind(this)
    }

    onLoadSuccess(response) {
        this.setState({post: response})
    }

    onLoadCommentsSuccess(response) {
        this.setState({postComments: response})
    }

    componentDidMount() {
        postModule.loadPostDetails(this.props.params.postId, this.onLoadSuccess)
        commentModule.getPostComments(this.props.params.postId, this.onLoadCommentsSuccess)
    }

    showComments(comments) {
        let asdf = []
        if(comments!==undefined) {
            asdf.push(<h2 key={-1}>Comments</h2>);
            for (let i in comments) {
                if (comments !== []) {
                    asdf.push(<div key={i}>{comments[i].text} by <strong key={i}>{comments[i].author}</strong> on
                            {comments[i]._kmd.lmt.slice(0, 16).replace('T', '-')} {this.deleteCommentAction(comments[i], sessionStorage.userId)}
                        </div>)

                }
            }
        }
        return asdf
    }

    onActionHandler(post) {
        postModule.deletePost(post._id, this.onDeleteResponse)
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

    deleteCommentAction(comment, userId) {
        if (comment._acl.creator === userId) {
            return <input className="btn btn-danger" type="button" value="Delete my comment"
                          onClick={() => this.onDeleteCommentActionHandler(comment)}/>
        }
    }

    action(post, userId) {
        let pathEdit = 'posts/edit/' + post._id
        let pathAddComment = '/comments/' + post._id
        if (post._acl.creator === userId) {
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
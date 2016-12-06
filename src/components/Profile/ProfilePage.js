import React, {Component} from 'react'
import Post from '../../models/postModel'
import {Link} from 'react-router'
import observer from '../../models/observer'
import Utilities from '../../utilities/utilities'
let postModule = new Post();
let utilities = new Utilities()

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], username: sessionStorage.getItem('username'), img:this.avatarRendering()}
        this.bindEventHandlers()
        observer.onAvatarChange = this.onAvatarChange
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.onActionResponse = this.onActionResponse.bind(this)
        this.avatarRendering = this.avatarRendering.bind(this)
        this.onAvatarChange = this.onAvatarChange.bind(this)
    }

    avatarRendering (){
        if (sessionStorage.getItem('avatar')){
            return sessionStorage.getItem('avatar')
        }
        return "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    }

    onAvatarChange(){
        this.setState({
            img: this.avatarRendering()
        })
    }

    componentDidMount() {
	    postModule.getPostsByUserId(this.onLoadSuccess);
	    // the above can be achieved with the one below
	    // postModule.query(`"_acl":{"creator": "${sessionStorage.getItem('userId')}"}`, null, this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        this.setState({ posts: response })
    }

    action(post,userId){
        let pathEdit = 'posts/edit/'+post._id
        let pathAddComment = '/comments/'+post._id;
        if(post._acl.creator===userId){
            return <td>
                <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
                <Link to={pathEdit} className="btn btn-default" activeClassName="btn btn-default active">Edit</Link>
                <input className="btn btn-danger" type="button"value="Delete"onClick={
                ()=>this.onActionHandler(post)}/></td>
        }
        return <td></td>
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onActionResponse)
    }

    onActionResponse(response,id) {
        if (response === true) {
            let index = this.state.posts.findIndex(p=>p._id===id)
            this.state.posts.splice(index,1)
            this.setState({posts:this.state.posts})
        }
    }

    render() {
        let postRows = this.state.posts.map(post =>
            <tr key={post._id}>
                <td>{utilities.showLess(post.title, 20)}</td>
                <td>{utilities.showLess(post.body, 50)}</td>
                <td></td>
                <td></td>
                {this.action(post,sessionStorage.userId)}
            </tr>
        );
        return (
            <div>
                <h1>{this.state.username}</h1>
                <div><img id="profile-img" alt="Profile" className="profile-img-card" src={this.state.img} /></div>
                <div><Link to="/account/profile/changePass" className="btn btn-default" activeClassName="btn btn-default active">Change password</Link> </div>
                <div><Link to="/account/profile/changeAvatar" className="btn btn-default" activeClassName="btn btn-default active">Change Avatar</Link> </div>
                <h4>Your Posts</h4>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
                        <th></th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postRows}
                    </tbody>
                </table>
                {this.props.children}
            </div>
        )
    }
}

Profile.contextTypes = {
    router: React.PropTypes.object
}
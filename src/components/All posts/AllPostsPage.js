import React, {Component} from 'react'
import Post from '../../models/postModel'
let postModule = new Post();

export default class AllPostsPage extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: []}
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onActionResponse=this.onActionResponse.bind(this);
    }

    componentDidMount() {
        postModule.getAllPosts(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        this.setState({ posts: response})
    }

    action(post,userId){
        if(post._acl.creator===userId){
            return <td><input type="button"value="Delete"onClick={
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
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

AllPostsPage.contextTypes = {
    router: React.PropTypes.object
}
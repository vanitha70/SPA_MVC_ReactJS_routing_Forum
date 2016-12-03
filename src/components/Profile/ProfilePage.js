import React, {Component} from 'react'
import Post from '../../models/postModel'
let post = new Post();

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], username: sessionStorage.getItem('username'), img:require('../../../public/whatsapp-walpaper-anymouse.jpg')}
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        post.getPostsById(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        this.setState({ posts: response })
    }

    render() {
        let postRows = this.state.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td></td>
                <td></td>
            </tr>
        );

        return (
            <div>
                <h1>{this.state.username}</h1>
                <div><img src={this.state.img} alt="" width={150} height={150}/></div>
                <h4>Your Posts</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Author</th>
                        <th>Post Rating</th>
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

Profile.contextTypes = {
    router: React.PropTypes.object
}
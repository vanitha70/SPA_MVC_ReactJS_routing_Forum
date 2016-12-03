import React, {Component} from 'react'
import Post from '../../models/postModel'
let post = new Post();

export default class AllPostsPage extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: []}
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        post.getAllPosts(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        this.setState({ posts: response })
    }

    render() {
        let postRows = this.state.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.author}</td>
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
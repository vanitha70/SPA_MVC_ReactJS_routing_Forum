import React, {Component} from 'react'
import Post from '../../models/postModel'
import View from '../../models/viewsModel';
import Category from '../../models/categoryModel';
import Pager from 'react-pager';
import { browserHistory } from 'react-router'
let postModule = new Post();
let viewModule = new View();
let categoryModule = new Category();


export default class AllPostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            pagePosts: [],
            category: this.props.location.state !== undefined
            ? this.props.location.state.selectedCategory.fullName
	            : 'All',
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
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
    	let requests = [
            postModule.getAllPosts(),
	        categoryModule.getAllCategories(),
	        viewModule.getAllViews()
	    ];
    	Promise.all(requests).then(this.onLoadSuccess).then(() => {
		    this.onChangeHandler({ target: { value: this.state.category } });
	    })
    }

    onLoadSuccess([posts, categories, views]) {
	    let postInfo = posts.sort((a, b) => a._id > b._id);
	    let viewsInfo = views.sort((a, b) => a.postId > b.postId);
	    for (let i = 0; i < postInfo.length; i++) {
		    postInfo[i]['rating'] = viewsInfo[i].rating
	    }
	    postInfo.sort((a,b) => b.rating - a.rating);
        this.setState({
            posts: posts.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pagePosts: posts.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(posts.length / 10),
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
			<tr key={post._id} onClick={() => {
				browserHistory.push('posts/details/' + post._id)
			}}>
				<td>{post.title}</td>
			    <td>{post.body}</td>
			    <td>{post.author}</td>
			    <td>{post.category}</td>
			    <td>{new Date(Date.parse(post._kmd.lmt)).toLocaleString()}</td>
			    <td>{post.rating}</td>
		    </tr>
		)
	    let table = (
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
	    );

	    if (this.state.pagePosts.length === 0)
	    	table = <div>Empty</div>

        return (
            <div>
                <div className="form-group">
                    <label>Select category:</label>
                    <select value={this.state.category} className="form-control" id="sel1" name="category" onChange={this.onChangeHandler}>
                        <option key="empty">All</option>
                        {options}
                    </select>
                </div>
                <h2>{this.state.category}</h2>
	            {table}
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
import React, {Component} from 'react'
import Post from '../../../models/postModel';
import View from '../../../models/viewsModel';
import {Link} from 'react-router';
import Utilities from '../../../utilities/utilities';
let utils = new Utilities();
let postModule = new Post();
let viewModule = new View();

/*
 Gets all posts and views. Sorts the posts by
 posted time and displays 12 posts on 3 columns
 */

export default class LatestPostsWidget extends Component {
	constructor(props) {
		super(props);
		this.bindFunctionsToParent();
		this.state = {
			latestPosts: []
		};
console.log()
	}

	bindFunctionsToParent() {
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onFetchDataSuccess = this.onFetchDataSuccess.bind(this);
	}

	componentDidMount() {
		let requests = [
			postModule.query('{}', `sort={"_kmd":-1}`),
			viewModule.getAllViews()
		];
		Promise.all(requests).then(this.onFetchDataSuccess);
	}


	onFetchDataSuccess([posts, views]) {
		for (let post of posts)
			post.rating = views.filter(view => view.postId === post._id)[0].rating;
		this.setState({latestPosts: posts});
	}

	render() {
		let that = this;
		// prep posts
		let postsForRender = Array.from(this.state.latestPosts)
			.map(function (post) {
				let rating = Math.floor(post.rating / 10);
				let ratingRender = [];
				let timestamp = '';

				if (rating > 5)
					rating = 5;

				// takes the time
				for (let prop in post._kmd)
					if (prop.localeCompare('ect'))
						timestamp = utils.ConvertTime(post._kmd[prop]);
				let i = 0;
				for (; i < rating; i++)
					ratingRender.push(<span key={i} className="glyphicon glyphicon-star"></span>)
				while (ratingRender.length < 5)
					ratingRender.push(<span key={i++} className="glyphicon glyphicon-star-empty"></span>);
				
				return (
					<div key={post._id} className="col-sm-4 col-lg-4 col-md-4">

						<Link style={{ textDecoration: "none" }} to={`/posts/details/${post._id}`}>
							<div className="thumbnail btn-custom">
									<div className="caption post-body">
										<div className="text-center">
											<h3>
												{utils.showLess(post.title, 30)}
											</h3>
										</div>
										<div>{utils.showLess(post.body, 50)}</div>
									</div>
								<div className="post-views">
									<p className="pull-right views">{post.rating} views</p>
									<p>{timestamp}</p>
									<div className="post-rating text-center">
										{ratingRender}
									</div>
								</div>
							</div>
						</Link>

					</div>
				)
			});

		return (
			<div className="col-md-12">
				<div className="row">
					<div className="page-header text-center">
						<h1>Latest Posts</h1>
					</div>
					{postsForRender}
				</div>
			</div>

		)
	}
}
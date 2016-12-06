import React, {Component} from 'react'
import Category from '../../../models/categoryModel';
import {Link} from 'react-router';
let category = new Category();

/*
	Takes the post categories orders them by name,
	cuts them to 50 characters if longer,
	and splits them in halves the left column strives
	to have the bigger number of categories,
	whilst both columns cannot have more than 5 entries
*/

export default class CategoriesWidget extends Component {
	constructor(props) {
		super(props);
		this.bindFunctionsToParent();
		this.state = {
			leftCatSet: [],
			rightCatSet: []
		}
	}

	bindFunctionsToParent() {
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onCategoriesFetchSuccess = this.onCategoriesFetchSuccess.bind(this);
	}

	componentDidMount() {
		setTimeout(()=> {
			category.getAllCategories(this.onCategoriesFetchSuccess);
		}, 500);
	}

	onCategoriesFetchSuccess(categories) {
		categories.map(cat => {
			cat.fullName = cat.name;
			return cat;
		});
		// sort by name
		categories = categories.sort((a, b) => a.name.localeCompare(b.name));
		// cut name to 50 characters if it's more
		categories.map(cat => {
			if (cat.name.length > 40) {
				cat.name = cat.name.substr(0, 40) + "...";
			}
			return cat;
		});
		let leftCatSet =
			categories.splice(0, Math.ceil(categories.length / 2)); // gets the bigger half of the array
		if (leftCatSet.length > 5) {
			leftCatSet.splice(0, leftCatSet.length - 5);
		}
		if (categories.length > 5)
			categories.splice(0, 4);
		this.setState({
			rightCatSet: categories,
			leftCatSet: leftCatSet
		});
	}

	render() {
		return (
			<div className="well col-md-4">
				<h4 className="well-header text-center">Categories</h4>
				<div className="row well-body text-center">
					<div className="col-lg-6">
						<ul className="list-group">
							{
								this.state.leftCatSet.map((cat, index)=>
									<Link style={{ textDecoration: "none" }}
									      key={index}
									      to={{pathname: "/posts", state: { selectedCategory: cat } }}>
										<li className="list-group-item btn-custom" key={cat._id}>
											{cat.name}
										</li>
									</Link>
								)
							}
						</ul>
					</div>
					<div className="col-lg-6">
						<ul className="list-group">
							{
								this.state.rightCatSet.map((cat, index)=>
									<Link style={{ textDecoration: "none" }}
									      key={index}
									      to={{pathname: "/posts", state: { selectedCategory: cat } }}>
										<li className="list-group-item btn-custom" key={cat._id}>
											{cat.name}
										</li>
									</Link>
								)
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
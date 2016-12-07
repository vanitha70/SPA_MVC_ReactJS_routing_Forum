import React, {Component} from 'react'
import SymbolsLeft from '../../common/SymbolsLeftOnInput';
import RequirementMessage from '../../common/RequirementOnInput';

export default class CreateForm extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.state = {
			titleOnFocus: true,
			contentOnFocus: null
		}
	}

	onFocus(event) {
		if (event.target.name === "title")
			this.setState( { titleOnFocus: true, contentOnFocus: false } );

		else if (event.target.name === "content")
			this.setState( { contentOnFocus: true, titleOnFocus: false } );

		else
			this.setState( { contentOnFocus: false, titleOnFocus: false } );
	}

	onBlur(event) {
		if (event.target.name === "title")
			this.setState( { titleOnFocus: false } );

		else if (event.target.name === "content")
			this.setState( { contentOnFocus: false } );
	}

	render() {
		let options = this.props.categories.map(category =>
			<option key={category._id}>{category.name}</option>
		);
		return (
			<form className="form-group text-center" onSubmit={this.props.onSubmitHandler}>
				<div className="form-group col-md-6">
					<label>Select Category:</label>
					<select className="form-control" id="sel1" name="category" onChange={this.props.onChangeHandler}>
						<option key="empty"> </option>
						{options}
					</select>
				</div>
				<div className="col-md-6">
					<label>Post Title:</label>
						<input className="form-control"
						       type="text"
						       name="title"
						       maxLength="50"
						       value={this.props.title}
						       disabled={this.props.submitDisabled}
						       onChange={this.props.onChangeHandler}
						       onFocus={this.onFocus}
						       onBlur={this.onBlur}
						       required autoFocus
						/>
						<SymbolsLeft fieldOnFocus={this.state.titleOnFocus} maxSymbols={50} input={this.props.title}/>
						<RequirementMessage message={"* Maximum length: 50 characters"} fieldOnFocus={this.state.titleOnFocus}/>
				</div>
				<div className="col-md-12">
					<label>Post Content:</label>
						<textarea style={{height:'100px'}}
						          className="form-control"
                                  type="text"
                                  name="content"
                                  maxLength="2000"
                                  value={this.props.body}
                                  disabled={this.props.submitDisabled}
                                  onChange={this.props.onChangeHandler}
                                  onFocus={this.onFocus}
                                  onBlur={this.onBlur}
                                  required
						/>
						<SymbolsLeft fieldOnFocus={this.state.contentOnFocus} maxSymbols={2000} input={this.props.content}/>
						<RequirementMessage message={"* Maximum length: 2000 characters"} fieldOnFocus={this.state.contentOnFocus}/>
				</div>
				<div className="col-md-12">
						<input className="btn btn-primary" style={{width: "250px"}}
						       type="submit" value="Create"
						       disabled={this.props.submitDisabled}
						/>
				</div>
			</form>
		)
	}
}
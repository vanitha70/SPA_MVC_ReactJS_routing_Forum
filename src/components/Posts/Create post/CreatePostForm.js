import React, {Component} from 'react'

export default class CreateForm extends Component {
    render() {
        let options = this.props.categories.map(category =>
            <option key={category._id}>{category.name}</option>
        );
        return (
	        <form className="form-horizontal" onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Select Category:</label>
                    <select className="form-control" id="sel1" name="category" onChange={this.props.onChangeHandler}>
                        <option key="empty"> </option>
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <label>Post Title:</label>
	                <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.props.title}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required autoFocus
                        />
	                </div>
                </div>
                <div className="form-group">
                    <label>Post Content:</label>
	                <div className="form-group">
                        <textarea style={{height:'100px'}}
                            className="form-control"
                            type="text"
                            name="content"
                            value={this.props.body}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required
                        />
	                </div>
                </div>
		        <div className="form-group">
		            <div className="col-md-3 col-md-offset-5">
                        <input className="btn btn-primary" style={{width:'100px', marginLeft:'40px' }}
                               type="submit" value="Create"
                               disabled={this.props.submitDisabled}/>
		            </div>
		        </div>
            </form>
        )
    }
}
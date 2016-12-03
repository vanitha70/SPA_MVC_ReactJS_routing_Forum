import React, {Component} from 'react'

export default class CreateForm extends Component {
    render() {
        return (
	        <form className="form-horizontal" onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label className="col-md-5 control-label">Post Title:</label>
	                <div className="col-md-3">
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
                    <label className="col-md-5 control-label">Post Content:</label>
	                <div className="col-md-3">
                        <input
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
                        <input className="btn btn-default"
                               type="submit" value="Create"
                               disabled={this.props.submitDisabled}/>
		            </div>
		        </div>
            </form>
        )
    }
}
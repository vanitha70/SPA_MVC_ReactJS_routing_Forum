import React, {Component} from 'react'

export default class CreateCommentForm extends Component {
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label className="col-md-5 control-label">Comment:</label>
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
                               type="submit" value="Create comment"
                               disabled={this.props.submitDisabled}/>
                    </div>
                </div>
            </form>
        )
    }
}
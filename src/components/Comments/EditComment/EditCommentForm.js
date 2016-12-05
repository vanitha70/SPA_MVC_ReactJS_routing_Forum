import React, {Component} from 'react'

export default class EditCommentForm extends Component {
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label className="col-md-5 control-label">Editing Comment:</label>
                    <div className="col-md-3">
                        <input
                            className="form-control"
                            type="text"
                            name="text"
                            value={this.props.text}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-3 col-md-offset-5">
                        <input className="btn btn-default"
                               type="submit" value="Edit comment"
                               disabled={this.props.submitDisabled}/>
                    </div>
                </div>
            </form>
        )
    }
}

import React, {Component} from 'react'

export default class LoginForm extends Component {
    render() {
        return (
            <main className="row">
                <form className="form-horizontal" onSubmit={this.props.onSubmitHandler}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Username:</label>
	                    <div className="col-sm-3">
		                    <input
			                    className="form-control"
			                    type="text"
                                name="username"
                                value={this.props.username}
                                disabled={this.props.submitDisabled}
                                onChange={this.props.onChangeHandler}
                                required
		                    />
	                    </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Password:</label>
	                    <div className="col-sm-3">
                            <input
	                            className="form-control"
                                type="password"
                                name="password"
                                value={this.props.password}
                                disabled={this.props.submitDisabled}
                                onChange={this.props.onChangeHandler}
                                required
                            />
	                    </div>
                    </div>
	                <div className="form-group">
	                    <div className="col-sm-3 col-sm-offset-3">
		                    <input className="btn btn-default"
		                           type="submit" value="Login"
		                           disabled={this.props.submitDisabled}
		                    />
	                    </div>
	                </div>
            </form>
        </main>
        )
    }
}
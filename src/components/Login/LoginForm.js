import React, {Component} from 'react'

export default class LoginForm extends Component {
    render() {
        return (
        	<div className="card card-container">
		        <img id="profile-img" alt="Profile" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
		        <p id="profile-name" className="profile-name-card">{sessionStorage.getItem('username')}</p>
		        <form className="form-signin" onSubmit={this.props.onSubmitHandler}>
			        <div className="form-group">
				        <input
					        className="form-control"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.props.username}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            autoFocus required
                        />
			        </div>
			        <div className="form-group">
				        <input
					        className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.props.password}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required
                        />
                    </div>
                    <div id="error" style={{color:'red'}}>Invalid username or password!</div>
                    <div className="form-group">
                        <input className="btn btn-lg btn-primary btn-block btn-signin"
                               type="submit" value="Login"
                               disabled={this.props.submitDisabled}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
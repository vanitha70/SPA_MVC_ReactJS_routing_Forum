import React, {Component} from 'react'

export default class ChangePassForm extends Component {
    constructor(){
        super()
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        this.avatarRendering = this.avatarRendering.bind(this)
    }

    avatarRendering (){
        if (sessionStorage.getItem('avatar')){
            return sessionStorage.getItem('avatar')
        }
        return "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    }

    render() {
        return (
            <div className="card card-container">
                <img id="profile-img" alt="Profile" className="profile-img-card" src={this.avatarRendering()}/>
                <p id="profile-name" className="profile-name-card">{sessionStorage.getItem('username')}</p>
                <form className="form-changePass" onSubmit={this.props.onSubmitHandler}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            name="currentPass"
                            placeholder="Current Password"
                            value={this.props.currentPass}
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
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            name="repeat"
                            placeholder="Confirm Password"
                            value={this.props.repeat}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required
                        />
                    </div>
                    <div id="error" style={{color:'red', display:'none'}}>Invalid current password. Please, try again.</div>
                    <div className="form-group">
                        <input className="btn btn-lg btn-primary btn-block btn-signin"
                               type="submit" value="Change Password"
                               disabled={this.props.submitDisabled}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
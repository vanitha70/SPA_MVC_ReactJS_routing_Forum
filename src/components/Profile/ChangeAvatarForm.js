import React, {Component} from 'react'

export default class ChangeAvatarForm extends Component {
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
                <img id="profile-img" alt="Profile" className="profile-img-card" src={this.avatarRendering()} />
                <p id="profile-name" className="profile-name-card">{sessionStorage.getItem('username')}</p>
                <form className="form-changeAvatar" onSubmit={this.props.onSubmitHandler}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="file"
                            name="avatar"
                            value={this.props.img}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-lg btn-primary btn-block btn-signin"
                               type="submit" value="Submit"
                               disabled={this.props.submitDisabled}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

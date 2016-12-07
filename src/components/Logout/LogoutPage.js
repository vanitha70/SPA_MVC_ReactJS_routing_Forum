import React, {Component} from 'react'
import User from '../../models/userModel'
import userModel from '../../models/userModel'
let session = new userModel()
let user = new User();

export default class LogoutPage extends Component {
    constructor(props) {
        super(props)
        this.logout()
    }

    logout() {
        user.logout(this.onSubmitResponse.bind(this))
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            session.loginDefaultUser()
            setTimeout(() => {
                this.context.router.push('/')
            }, 500)
        } else {
            // Something went wrong, let the user know
        }
    }

    render() {
        return (
            <div>
                <span>Logout Page</span>
            </div>
        )
    }
}

LogoutPage.contextTypes = {
    router: React.PropTypes.object
}
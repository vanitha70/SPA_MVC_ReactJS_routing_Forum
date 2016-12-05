import React, {Component} from 'react'
import Users from './Users'
import userModel from '../../models/userModel'
import observer from '../../models/observer'
import {browserHistory} from 'react-router'
import AllPosts from '../Posts/AllPostsPage'
let user = new userModel()

export default class AdminPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response:false,
            publications:false,
            users: false
        }
        this.allowAccess = this.allowAccess.bind(this)
        this.loadPublications = this.loadPublications.bind(this)
        this.loadUsers = this.loadUsers.bind(this)
    }

    componentWillMount(){
        user.checkAdmin(this.allowAccess)
    }

    allowAccess(acess) {
        this.setState({
            response:true
        })
        if(!acess){
            observer.showError('Sorry this page is only for Admins!')
            browserHistory.push('/')
        }
    }

    loadPublications(){
        this.setState ({
            publications: true
        })
    }

    loadUsers(){

        this.setState ({
            publications: false,
            users: true
        })
    }

    render() {
        let basis = (
            <div className="col-md-8">
                <h1>Admin panel</h1>
                <div>
                    <button className="btn btn-success" onClick={this.loadPublications}>Manage Publications</button>
                    <button className="btn btn-success" onClick={this.loadUsers}>Manage Users</button>
                </div>
            </div>
        )

        if(this.state.response && this.state.publications === false && this.state.users === false){
            return basis
        } else if (this.state.response && this.state.publications){
            return (
                <div>
                    {basis}
                    <br/>
                    <div>
                        <AllPosts/>
                    </div>
                </div>
            );
        } else if (this.state.response && this.state.publications === false  && this.state.users === true){
            return (
                <div>
                    {basis}
                    <div>
                        <Users/>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}
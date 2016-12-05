import React, {Component} from 'react'
import {Link} from 'react-router'
import userModel from '../../models/userModel'
import observer from '../../models/observer'
import {browserHistory} from 'react-router'
let user = new userModel()

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response:false,
            users:[]
        }
        this.allowAccess = this.allowAccess.bind(this)
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

    render() {
        if(this.state.response){
            return (
                <div className="col-md-8">
                    <h1>Admin panel</h1>
                    <div>
                        <Link to='posts' className="btn btn-success">Manage Publications</Link>
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
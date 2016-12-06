import React, {Component} from 'react'
import User from '../../models/userModel'
import Pager from 'react-pager';
import observer from '../../models/observer'
import $ from 'jquery'
let userModule = new User();

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            pageUsers: [],
            total:       0,
            current:     0,
            visiblePage: 10
        }
        this.bindEventHandlers()
    }

    onChangeHandler(event) {
        this.setState({
            current: 0
        })
        this.setState({
            pageUsers: this.state.users,
            total: Math.ceil(this.state.posts.length / 10),
        })
    }

    handlePageChanged(newPage) {
        this.setState({
            update:false,
            current: newPage,
            total: Math.ceil(this.state.users.length / 10),
            pageUsers: this.state.users.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
        })
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.handlePageChanged = this.handlePageChanged.bind(this)
        this.bannUser = this.bannUser.bind(this)
        this.unBanUser = this.unBanUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(arg, id) {
        switch (arg){
            case 'ban':
                observer.showSuccess('User banned!')
                break
            case 'unBan':
                observer.showSuccess('User UnBanned!')
                break
            default:
                break
        }
        userModule.getUsers(this.onLoadSuccess, id)
    }

    onLoadSuccess(users, banned, id) {


        for (let i = 0; i < banned.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if(users[j].username === banned[i].user){
                    users[j].banned = true
                    break
                }
            }
        }

        this.setState({
            users: users.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pageUsers: users.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(users.length / 10),
        })
        $('#'+id).attr('disabled', false)
    }

    bannUser(user) {
        $('#'+user._id).attr('disabled', true)
        userModule.bannUser(user, this.componentDidMount)
    }

    unBanUser(user) {
        $('#'+user._id).attr('disabled', true)
        userModule.unBannUser(user, this.componentDidMount)
    }

    render() {

        let userRows = []

        for (let i = 0; i < this.state.pageUsers.length; i++) {
            if(this.state.pageUsers[i].banned){
            userRows.push(
                <tr key={this.state.pageUsers[i]._id}>
                    <td>{this.state.pageUsers[i].username}</td>
                    <td>{new Date(Date.parse(this.state.pageUsers[i]._kmd.lmt)).toLocaleString()}</td>
                    <td>{this.state.pageUsers[i].Admin.toString()}</td>
                    <td>true</td>
                    <td>
                        <button id={this.state.pageUsers[i]._id}
                                className="btn btn-primary"
                                onClick={() => this.unBanUser(this.state.pageUsers[i])}>UnBann</button>
                    </td>
                </tr>
                )
            } else {
                userRows.push(
                    <tr key={this.state.pageUsers[i]._id}>
                        <td>{this.state.pageUsers[i].username}</td>
                        <td>{new Date(Date.parse(this.state.pageUsers[i]._kmd.lmt)).toLocaleString()}</td>
                        <td>{this.state.pageUsers[i].Admin.toString()}</td>
                        <td>false</td>
                        <td>
                            <button id={this.state.pageUsers[i]._id}
                                    className="btn btn-danger"
                                    onClick={() => this.bannUser(this.state.pageUsers[i])}>Bann</button>
                        </td>
                    </tr>
                )
            }
        }


        return (
            <div>
                <h1>All Users</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>User name</th>
                        <th>Date of registration </th>
                        <th>Admin</th>
                        <th>Banned</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userRows}
                    </tbody>
                </table>
                <Pager
                    total={this.state.total}
                    current={this.state.current}
                    visiblePages={this.state.visiblePage}
                    titles={{ first: '<|', last: '>|' }}
                    onPageChanged={this.handlePageChanged}
                />
            </div>
        )
    }
}

Users.contextTypes = {
    router: React.PropTypes.object
}
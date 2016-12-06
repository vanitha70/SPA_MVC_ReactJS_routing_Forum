import React, {Component} from 'react'
import User from '../../models/userModel'
import Pager from 'react-pager';
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
            current: newPage,
            total: Math.ceil(this.state.users.length / 10),
            pageUsers: this.state.users.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
        })
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
        userModule.getUsers(this.onLoadSuccess)
    }

    onLoadSuccess(users) {
        this.setState({
            users: users.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pageUsers: users.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(users.length / 10),
        })
    }

    render() {

        let userRows = this.state.pageUsers.map(user =>
            <tr key={user._id}>
                <td>{user.username}</td>
                <td>{new Date(Date.parse(user._kmd.lmt)).toLocaleString()}</td>
                <td>{user.Admin.toString()}</td>
            </tr>
        );

        return (
            <div>
                <h1>All Users</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>User name</th>
                        <th>Date of registration </th>
                        <th>Admin</th>
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
import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from '../common/Header'
import CategoryWidget from '../Widgets/CategoryWidget/CategoryWidget'

export default class HomePage extends Component {
    render() {
        let message = "";
        if (sessionStorage.getItem('username')=== "guest") {
                message = <p>You are currently not a member of this forum. Click <Link to="/account/register">here</Link> to join us.</p>
        }
        return (
	        <div className="homepage container-fluid">
		        <div className="col-md-8">
			        <Header/>
			        {message}
		        </div>
		        <CategoryWidget/>
	        </div>
        );
    }
}
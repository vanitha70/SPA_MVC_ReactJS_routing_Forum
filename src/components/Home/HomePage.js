import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from '../common/Header'
import CategoryWidget from '../Widgets/CategoryWidget/CategoryWidget'

export default class HomePage extends Component {
    render() {
        let message = <p>You are currently not logged in. Please, log in or register to view team options.</p>

        if (sessionStorage.getItem('username')) {
            if (sessionStorage.getItem('teamId')) {
            } else {
                message = <p>You are currently not a member of a team. View the <Link to="/catalog">catalog</Link> to join or create one.</p>
            }
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
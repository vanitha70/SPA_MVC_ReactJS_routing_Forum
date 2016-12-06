import React, {Component} from 'react'

import NavigationBar from './components/common/Navbar'
import Infobox from  './components/common/Infobox'
import Footer from './components/common/Footer'
import observer from './models/observer'
import userModel from './models/userModel'
let session = new userModel()
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '' };
        observer.onSessionUpdate = this.onSessionUpdate.bind(this)
    }

    componentDidMount() {
        this.onSessionUpdate()
        session.loginDefaultUser()
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username")
        if (name) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username") })
        } else {
            this.setState({ loggedIn: false, username: '' })
        }
    }

	render() {
		return (
            <div className="wrapper">
	            <NavigationBar loggedIn={this.state.loggedIn}
	                           user={this.state.username}
	                           href="/profile"
	            />
	            <div className="container">
		            {this.props.children}
		            <Infobox/>
	            </div>
	            <hr/>
	            <Footer/>
            </div>
		)
	}
}

export default App

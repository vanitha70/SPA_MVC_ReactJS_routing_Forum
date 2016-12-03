import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
	new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class User {
	login(username, password, callback) {
		let userData = {
			username: username,
			password: password
		};
		requester.post(kinvey.getUserModuleUrl() + 'login', auth.getHeaders(), userData)
			.then((response) => {
				this.saveSession(response);
				observer.onSessionUpdate();
				observer.showSuccess('Login successful.')
				callback(true);
			});
	}

	register(username, password, callback) {
		let userData = {
			username: username,
			password: password
		};
		requester.post(kinvey.getUserModuleUrl(), auth.getHeaders(), userData)
			.then((response) => {
				this.saveSession(response);
				observer.onSessionUpdate();
				observer.showSuccess('Successful registration.')
				callback(true);
			});
	}
	logout(callback) {
		requester.post(kinvey.getUserModuleUrl() + '_logout', auth.getHeaders())
			.then(response => {
				sessionStorage.clear();
				observer.onSessionUpdate();
				observer.showSuccess('Logout successful.')
				callback(true)
			});
	}

	//
	// Makes sessionStorage items for the authtoken, userId, and username
	//

	saveSession(userInfo) {
		let userAuth = userInfo._kmd.authtoken;
		sessionStorage.setItem('authToken', userAuth);
		let userId = userInfo._id;
		sessionStorage.setItem('userId', userId);
		let username = userInfo.username;
		sessionStorage.setItem('username', username);
		sessionStorage.setItem('teamId', userInfo.teamId);

		observer.onSessionUpdate()
	}


}
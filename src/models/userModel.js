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
		requester.post(kinvey.getUserModuleUrl() + '/login', auth.getHeaders(), userData)
			.then((response) => {
				this.saveSession(response);
				observer.onSessionUpdate();
				observer.showSuccess('Login successful.');
				callback(true);
			})
			.catch((err)=> callback(false))
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
				observer.showSuccess('Successful registration.');
				callback(true);
			})
			.catch((err)=> callback(false))
	}
	changePassword (username, currentPass, password, callback) {
		let url = kinvey.getUserModuleUrl() + `/${sessionStorage.getItem('userId')}`;
		let userData = {
			username,
			password
		};
		requester.put(url, auth.changePassHeaders(username, currentPass), userData)
			.then(respose => {
                sessionStorage.clear();
				this.saveSession(respose);
                observer.showSuccess('Password changed successfully.');
				callback(true)})
			.catch(() => callback(false))
   }
	logout(callback) {
		requester.post(kinvey.getUserModuleUrl() + '/_logout', auth.getHeaders())
			.then(response => {
				sessionStorage.clear();
				observer.onSessionUpdate();
				observer.showSuccess('Logout successful.');
				callback(true)
			});
	}

	checkAdmin(callback){
		requester.get(kinvey.getUserModuleUrl() + `/${sessionStorage.getItem('userId')}`, auth.getHeaders())
			.then((response) => {
                callback(response.Admin)
		})
			.catch((err) => {callback(false)})
	}

	getUsers(callback) {
        requester.get(kinvey.getAllUsers(), auth.getHeaders())
            .then((response) => {
                callback(response)
            })
	}

	getUserById(callback) {
		let url = kinvey.getUserModuleUrl() + `/${sessionStorage.getItem('userId')}`;
		if (callback === undefined)
			return requester.get(url, auth.getHeaders());

		requester.get(url, auth.getHeaders())
			.then(user => callback(user));
	}

	//
	// Makes sessionStorage items for the authtoken, userId, and username
	//

	saveSession(userInfo) {
        sessionStorage.setItem('Admin', userInfo.Admin);
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
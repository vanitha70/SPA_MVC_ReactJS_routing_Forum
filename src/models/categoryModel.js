
import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
	new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class Category {

	getAllCategories(callback) {
		if(callback === undefined)
			return requester.get(kinvey.getCollectionModuleUrl('categories'), auth.getHeaders());
		requester.get(kinvey.getCollectionModuleUrl('categories'), auth.getHeaders())
			.then(categories => callback(categories));
	}
}
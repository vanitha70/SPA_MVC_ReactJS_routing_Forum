
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

    createCategory(name,callback) {

		this.getAllCategories(publish)

		function publish(categories) {
            let found = false
            for (let i = 0; i < categories.length; i++) {
                if(categories[i].name ===  name){
                	found = true
                    callback('duplicate')
				}
            }
            if (!found) {
                let category = {
                    name: name
                }
                requester.post(kinvey.getCollectionModuleUrl('categories'), auth.getHeaders(), category)
                    .then(() => callback('create'))
            }
        }
    }

    deleteCategory(id, callback) {
		requester.delete(kinvey.getCollectionModuleUrl('categories')+'/'+id, auth.getHeaders())
			.then(() => callback('delete'))
	}

    editCategory(id,newName, callback) {
		let newCategory = {
			name: newName
		}
        requester.put(kinvey.getCollectionModuleUrl('categories')+'/'+id, auth.getHeaders(),newCategory)
            .then(() => callback('edit'))
    }
}
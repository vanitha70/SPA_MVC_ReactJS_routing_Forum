import Requester from './requestModel'
import Kinvey from '../services/kinveyService'
import AuthenticationService from '../services/authenticationService'

let requester = new Requester()
let kinvey = new Kinvey()
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret())

export default class Views {

    initializeViews(postId, rating) {
        let ratingData = {
            postId,
            rating
        }

        requester.post(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders(), ratingData)
    }

    deleteViews(id) {
        requester.delete(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${id}"}`, auth.getHeaders())
    }

    getAllViews(callback) {
        if (callback === undefined)
            return requester.get(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders());

        requester.get(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders())
            .then(views => callback(views));
    }

    getViewByPostId(postId, callback) {
    	if (callback === undefined)
    	    return requester.get(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${postId}"}`, auth.getHeaders());

	    requester.get(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${postId}"}`, auth.getHeaders())
		    .then(view => callback(view));
    }

    updateViews(id, data){
        requester.put(kinvey.getCollectionModuleUrl('rating') + `/${id}`, auth.getHeaders(), data)
    }

    increaseViewCount(view) {
    	let data = {
    		postId: view.postId,
		    rating: ++view.rating
	    };
	    requester.put(kinvey.getCollectionModuleUrl('rating') + `/${view._id}`, auth.getHeaders(), data);
    }
}

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

    getAllViews() {
        requester.get(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders())
    }

    getPostById(postId) {
        requester.get(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${postId}"}`, auth.getHeaders())
    }

    updateViews(id, data){
        requester.put(kinvey.getCollectionModuleUrl('rating') + `/${id}`, auth.getHeaders(), data)
    }
}

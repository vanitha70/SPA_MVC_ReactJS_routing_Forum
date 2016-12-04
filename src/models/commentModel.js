import Requester from './requestModel'
import Kinvey from '../services/kinveyService'
import AuthenticationService from '../services/authenticationService'
import observer from './observer'

let requester = new Requester()
let kinvey = new Kinvey()
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret())

export default class Comment {
    /*constructor(){
     this.bindEventHandlers()
     }*/

    // bindEventHandlers() {
    //    this.initializeRating = this.initializeRating.bind(this)
    //    this.deleteRating = this.deleteRating.bind(this)
    // }
    createComment(text, postId, author, callback) {
        let commentData = {text, postId, author}
        requester.post(kinvey.getCollectionModuleUrl('comments'), auth.getHeaders(), commentData)
            .then(createCommentSuccess)
        function createCommentSuccess(commentInfo) {
            observer.showSuccess('Comment created')
            callback(true)
        }
    }

    deleteComment(commentId, callback) {
        requester.delete(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders())
            .then(() => {
                observer.showSuccess('Comment deleted.')
                callback(true, commentId)
            })
    }

    getPostComments(postId, callback) {
        requester.get(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())
            .then(loadAllCommentsSuccess)
        function loadAllCommentsSuccess(comments) {
            observer.showSuccess('Comments loaded')
            callback(comments)
        }
    }
}
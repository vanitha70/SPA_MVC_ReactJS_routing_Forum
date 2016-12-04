import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'
import $ from 'jquery'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
	new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class Post {
	constructor(){
		// this.bindEventHandlers()
	}

	// bindEventHandlers() {
     //    this.initializeRating = this.initializeRating.bind(this)
     //    this.deleteRating = this.deleteRating.bind(this)
	// }

	createPost(title, body, author, callback) {
		let postData = {
			title,
			body,
			author
		};

		requester.post(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders(), postData)
			.then(createPostSuccess);
		let that = this

		function createPostSuccess(postInfo) {
			that.initializeRating(postInfo._id, 0)
			observer.showSuccess('Successful post created.')
			callback(true)
		}
	}

	initializeRating(postId, rating){
		let ratingData = {
			postId,
			rating
		}

		requester.post(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders(), ratingData)
	}

	deletePost(postId,callback){
		let that = this
		requester.delete(kinvey.getCollectionModuleUrl('posts')+'/'+postId,auth.getHeaders())
			.then(() => {
			that.deleteRating(postId)
            observer.showSuccess('Post deleted.')
            callback(true,postId)
        });
	}

	deleteRating(id){
		requester.delete(kinvey.getCollectionModuleUrl('rating')+`?query={"postId":"${id}"}`, auth.getHeaders())
	}

    editPost(postId, title, body, author, callback) {
        let postData = {
            title: title,
            body: body,
			author: author
        };
        requester.put(kinvey.getCollectionModuleUrl('posts')+'/'+postId, auth.getHeaders(), postData)
            .then(callback(true));
    }

	loadPostDetails(postId, onPostSuccess) {
        requester.get(kinvey.getCollectionModuleUrl('posts')+'/'+postId, auth.getHeaders())
            .then(onPostSuccess);
    }

    getAllPosts(callback) {
        let actions = [
            requester.get(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders()),
            requester.get(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders())
        ]
        Promise.all(actions).then(listAllPostsSuccess)

        function listAllPostsSuccess(data) {
            //observer.showSuccess('Posts loaded!')
			let postInfo = data[0].sort(data[0]._id > data[0]._id)
			let ratingInfo = data[1].sort(data[1].postId > data[1].postId)
            for (let i = 0; i < postInfo.length; i++){
				postInfo[i]['rating'] = ratingInfo[i].rating
			}
            callback(postInfo)
        }
    }

    getPostsById(callback){
		requester.get(kinvey.getQueryUrl(), auth.getHeaders())
			.then(listUsersPostsSuccess)

		function listUsersPostsSuccess(postsInfo) {
			// observer.showSuccess('')
			callback(postsInfo)
        }
	}
}
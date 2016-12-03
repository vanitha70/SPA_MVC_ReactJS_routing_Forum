import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
	new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class Post {
	constructor(){
		this.bindEventHandlers()
	}

	bindEventHandlers() {
		this.initializeRating.bind(this)
	}

	createPost(title, body, author, callback) {
		let postData = {
			title,
			body,
			author
		};

		requester.post(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders(), postData)
			.then(createPostSuccess);

		function createPostSuccess(postInfo) {
			this.initializeRating(postInfo._id, 0)
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
		requester.delete(kinvey.getCollectionModuleUrl('posts')+'/'+postId,auth.getHeaders())
			.then(() => {
            observer.showSuccess('Post deleted.')
            callback(true,postId)
        });
	}

    editPost(postId, title, body, author, callback) {
        let postData = {
            title: title,
            body: body,
			author: author
        };
        requester.put(kinvey.getCollectionModuleUrl()+'/'+postId, auth.getHeaders(), postData)
            .then(callback(true));
    }

	loadPostDetails(postId, onPostSuccess) {
        requester.get(kinvey.getCollectionModuleUrl()+'/'+postId, auth.getHeaders())
            .then(onPostSuccess);
    }

    getAllPosts(callback) {
        requester.get(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders())
            .then(listAllPostsSuccess)

        function listAllPostsSuccess(postInfo) {
            //observer.showSuccess('Posts loaded!')
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
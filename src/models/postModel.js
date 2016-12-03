import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
	new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class Post {

	createPost(title, body, author, callback) {
		let postData = {
			title,
			body,
			author
		};

		requester.post(kinvey.getCollectionModuleUrl(), auth.getHeaders(), postData)
			.then(createPostSuccess);

		function createPostSuccess(postInfo) {
			observer.showSuccess('Successful post created.')
			callback(true)
		}
	}

	deletePost(postId,callback){
		requester.delete(kinvey.getCollectionModuleUrl()+'/'+postId,auth.getHeaders())
			.then(() => {
            observer.showSuccess('Post deleted.')
            callback(true,postId)
        });

	}

    getAllPosts(callback) {
        requester.get(kinvey.getCollectionModuleUrl(), auth.getHeaders())
            .then(listAllPostsSuccess)

        function listAllPostsSuccess(postInfo) {
            observer.showSuccess('Posts loaded!')
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
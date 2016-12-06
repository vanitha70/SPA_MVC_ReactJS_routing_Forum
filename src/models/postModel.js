import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'
import Views from './viewsModel'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());
let views = new Views()

// TODO: all promises must have catch that displays errors
export default class Post {

    createPost(title, body, author, category, callback) {
        let postData = {
            title,
            body,
            author,
            category,
        };
        requester.post(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders(), postData)
            .then(createPostSuccess);

        function createPostSuccess(postInfo) {
            views.initializeViews(postInfo._id, 0);
            observer.showSuccess('Successful post created.');
            callback(true)
        }
    }

    initializeRating(postId, rating) {
        let ratingData = {
            postId,
            rating
        };

        requester.post(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders(), ratingData)
    }

    deletePost(postId, callback) {
        requester.delete(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders())
            .then(() => {
                views.deleteViews(postId);
                observer.showSuccess('Post deleted.');
                callback(true, postId)
            });
    }

    deleteRating(id) {
        requester.delete(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${id}"}`, auth.getHeaders())
    }

    editPost(postId, title, body, author, category, callback) {
        let postData = {
            title: title,
            body: body,
            author: author,
            category: category
        };
        requester.put(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders(), postData)
            .then(callback(true));
    }

    loadPostDetailsForEdit(postId, onPostSuccess){
        let data = [requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders()),
            requester.get(kinvey.getCollectionModuleUrl('categories'), auth.getHeaders())];

        Promise.all(data)
            .then(onPostSuccess)
    }

    loadPostDetails(postId, onPostSuccess) {
        requester.get(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${postId}"}`, auth.getHeaders())
            .then(getPostSetRating);

        function getPostSetRating(ratingData) {
            let actions = [
                requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders()),
                requester.put(kinvey.getCollectionModuleUrl('rating') + `/${ratingData[0]._id}`, auth.getHeaders(),
                    {
                        postId: postId,
                        rating: ++ratingData[0].rating
                    }),
            ]
            Promise.all(actions)
                .then((data) => {
                    let postData = data[0];
                    postData['rating'] = data[1].rating;
                    postData['comments']=data[2];
                    onPostSuccess(postData)
                })
        }
    }

    getPostById(id, callback) {
    	if (callback === undefined)
	    return requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + id);

	    requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + id)
		    .then(post => callback(post));
	}

    getAllPosts(callback) {
    	if (callback === undefined)
    		return requester.get(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders());
	    requester.get(kinvey.getCollectionModuleUrl('posts'), auth.getHeaders())
		    .then(posts => callback(posts));
    }

    /**
     * Makes a GET request using kinvey's query
     * Wrap the filter and modifier in ``(tildas)
     * See {@link http://devcenter.kinvey.com/rest/guides/datastore#Querying}
     * for full documentation
     * @param {string} filter
     * // No filter(takes all properties) use {} \\
     * // To filter by single prop
     * `"firstName":"James"` or with numbers `"age":15` \\
     * // To filter by prop of a prop `"author.firstName":"Terry"` \\
     * // To filter by multiple props `"firstName":"James", "lastName":"Bond"` \\
     * // To filter with OR operator `"$or":[{"firstName":"James", "lastName":"Bond"}]` \\
     * // To filter using greater($gte)/less($lt)/lessOrEqual($lte)
     *      than/to `"age":{"$gte": 31}`\\
     * @param {string} modifier - (property)/limit/skip/sort/fields
     * // To not use this enter null
     * // To limit `limit=10` \\
     * // To skip `skip=10` \\
     * // To sort `sort=age` (ascending) `sort={"age": -1}` (descending) \\
     * // To sort by multiple props `sort={"firstName": 1, "lastName": -1}` \\
     * // To take only desired fields `fields=age,lastName` \\
     * @param {function} callback - returns Object with server data
     */

    query(filter, modifier, callback) {
        let queryString = `?query={${filter}}`;
        if (modifier !== null)
            queryString += `&${modifier}`;
        let url = kinvey.getCollectionModuleUrl('posts') + queryString;

        requester.get(url, auth.getHeaders())
            .then((response) => {
                callback(response);
            });
    }

    getPostsByUserId(callback) {
    	let queryUrl =
		    kinvey.getCollectionModuleUrl('posts') + `?query={"author":"${sessionStorage.getItem('username')}"}`;
    	if (callback === undefined)
    	    return requester.get(queryUrl, auth.getHeaders());

    	requester.get(queryUrl, auth.getHeaders())
		    .then(posts => callback(posts));

    }
}
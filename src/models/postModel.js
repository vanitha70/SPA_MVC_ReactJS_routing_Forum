import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

// TODO: all promises must have catch that displays errors
export default class Post {
    /*constructor(){
     this.bindEventHandlers()
     }*/

    // bindEventHandlers() {
    //    this.initializeRating = this.initializeRating.bind(this)
    //    this.deleteRating = this.deleteRating.bind(this)
    // }

    createPost(title, body, author, category, callback) {
        let postData = {
            title,
            body,
            author,
            category,
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

    initializeRating(postId, rating) {
        let ratingData = {
            postId,
            rating
        }

        requester.post(kinvey.getCollectionModuleUrl('rating'), auth.getHeaders(), ratingData)
    }

    deletePost(postId, callback) {
        let that = this
        requester.delete(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders())
            .then(() => {
                that.deleteRating(postId)
                observer.showSuccess('Post deleted.')
                callback(true, postId)
            });
    }

    deleteRating(id) {
        requester.delete(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${id}"}`, auth.getHeaders())
    }

    editPost(postId, title, body, author, callback) {
        let postData = {
            title: title,
            body: body,
            author: author
        };
        requester.put(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders(), postData)
            .then(callback(true));
    }

    loadPostDetailsForEdit(postId, onPostSuccess){
        requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders())
            .then(onPostSuccess)
    }

    loadPostDetails(postId, onPostSuccess) {
        requester.get(kinvey.getCollectionModuleUrl('rating') + `?query={"postId":"${postId}"}`, auth.getHeaders())
            .then(getPostSetRating)

        function getPostSetRating(ratingData) {
            let actions = [
                requester.get(kinvey.getCollectionModuleUrl('posts') + '/' + postId, auth.getHeaders()),
                requester.put(kinvey.getCollectionModuleUrl('rating') + `/${ratingData[0]._id}`, auth.getHeaders(),
                    {
                        postId: postId,
                        rating: ++ratingData[0].rating
                    })
            ]
            Promise.all(actions)
                .then((data) => {
                    let postData = data[0]
                    postData['rating'] = data[1].rating
                    onPostSuccess(postData)
                })
        }
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
            for (let i = 0; i < postInfo.length; i++) {
                postInfo[i]['rating'] = ratingInfo[i].rating
            }
            postInfo.sort((a,b)=>b.rating - a.rating)
            callback(postInfo)
        }
    }

    getAllCategories(callback) {

        requester.get(kinvey.getCollectionModuleUrl('categories'), auth.getHeaders())
            .then(listAllPostsSuccess)

        function listAllPostsSuccess(data) {
            callback(data)
        }
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

    getPostsById(callback) {
        requester.get(kinvey.getQueryUrl(), auth.getHeaders())
            .then(listUsersPostsSuccess)

        function listUsersPostsSuccess(postsInfo) {
            // observer.showSuccess('')
            callback(postsInfo)
        }
    }
}
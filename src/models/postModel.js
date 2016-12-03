import * as requester from './requester'
import observer from './observer'


function createPost(title, body, author, callback) {
    let postData = {
        title,
        body,
        author
    }

    requester.post('appdata', 'posts', postData, 'kinvey')
        .then(createPostSuccess)

    function createPostSuccess(postInfo) {
        observer.showSuccess('Successful post created.')
        callback(true)
    }
}


export {createPost}
import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'
import $ from 'jquery'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());

export default class Avatar {

    uploadFile(file, callback) {
        let metaData = {
            "_filename": file.name,
            "size": file.size,
            "mimeType": file.mimeType
        }
        requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
            .then((data) => {
                console.log(data)
                requester.delete(kinvey.getUploadAvatarUrl() + `/${data[0]._id}`, auth.getHeaders())
            })

        requester.post(kinvey.getUploadAvatarUrl(), auth.getAvatarUploadHeaders(file), metaData)
            .then(putToGoogleApi)

        function putToGoogleApi(data) {
            let googleHeaders = data._requiredHeaders
            googleHeaders['Content-Type'] = file.type

            $.ajax({
                method: 'PUT',
                url: data._uploadURL,
                headers: googleHeaders,
                processData: false,
                data: file
            })
                .then(() => {
                    getGoogleUrl()
                })
                .catch((error) => {
                    console.log(error)
                })

        }

        function getGoogleUrl() {
            requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
                .then((data) => {
                    callback(data[0])
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    setAvatarInSession() {
        requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
            .then((data) => {
                if (data[0]===undefined){
                    return
                }
                sessionStorage.setItem('avatar', data[0]._downloadURL)
            })
    }
}

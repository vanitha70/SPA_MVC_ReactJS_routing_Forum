import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'
import Views from './viewsModel'
import $ from 'jquery'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());
let views = new Views()

export default class Avatar {

    uploadFile(file, callback){
        let metaData = {
            "_filename": file.name,
            "size": file.size,
            "mimeType": file.mimeType
        }
        requester.get(kinvey.getUploadAvatarUrl()+`?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
            .then((data) => {
                console.log(data)
                requester.delete(kinvey.getUploadAvatarUrl()+`/${data[0]._id}`, auth.getHeaders())
            })

        requester.post(kinvey.getUploadAvatarUrl(), auth.getAvatarUploadHeaders(file), metaData)
            .then(putToGoogleApi)

        function putToGoogleApi(data) {
            let googleHeaders = data._requiredHeaders
            googleHeaders['Content-Type'] = file.type
            // let id = data._id

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
            requester.get(kinvey.getUploadAvatarUrl()+`?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
                .then((data) => {
                    callback(data[0])
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}

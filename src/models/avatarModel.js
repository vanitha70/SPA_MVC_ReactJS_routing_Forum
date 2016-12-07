import Requester from './requestModel';
import Kinvey from '../services/kinveyService';
import AuthenticationService from '../services/authenticationService';
import observer from './observer'
import $ from 'jquery'

let requester = new Requester();
let kinvey = new Kinvey();
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret());
let fileTypes = ['image/jpeg', 'image/png', 'image/jpg']

export default class Avatar {

    uploadFile(file, callback) {
        let metaData = {
            "_filename": file.name,
            "size": file.size,
            "mimeType": file.type
        }

        if (!fileTypes.includes(file.type)) {
            observer.showError('File is not in the correct format.')
            return
        }
        requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
            .then((data) => {
                if (data[0]=== undefined) {
                    requester.post(kinvey.getUploadAvatarUrl(), auth.getAvatarUploadHeaders(file), metaData)
                        .then(putToGoogleApi)
                        .catch(() => {
                            observer.showError('Please, check your internet connection.')
                        })
                } else {
                    requester.delete(kinvey.getUploadAvatarUrl() + `/${data[0]._id}`, auth.getHeaders())
                        .then(() => {
                            requester.post(kinvey.getUploadAvatarUrl(), auth.getAvatarUploadHeaders(file), metaData)
                                .then(putToGoogleApi)
                                .catch(() => {
                                    observer.showError('Please, check your internet connection.')
                                })
                        })
                }
            })

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
                .catch(() => {
                    observer.showError('Please, check your internet connection.')
                })

        }

        function getGoogleUrl() {
            requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
                .then((data) => {
                    callback(data[0])
                })
                .catch(() => {
                    observer.showError('Please, check your internet connection.')
                })
        }
    }

    setAvatarInSession() {
        requester.get(kinvey.getUploadAvatarUrl() + `?query={"_acl":{"creator":"${sessionStorage.getItem('userId')}"}}`, auth.getHeaders())
            .then((data) => {
                if (data === undefined || data[0] === undefined) {
                    return
                }
                sessionStorage.setItem('avatar', data[0]._downloadURL)
            })
    }
}

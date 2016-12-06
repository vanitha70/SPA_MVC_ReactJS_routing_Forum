//
// Returns URLS
//

export default class Kinvey {

	getKinveyAppKey() {
		return 'kid_H1ZjN8iMx';
	}

	getKinveySecret() {
		return '44c440ddfad04876965ea158550e46c0';
	}

	//
	// Returns https://baas.kinvey.com/user/kinveyAppKey/
	//

	getUserModuleUrl() {
		return `https://baas.kinvey.com/user/${this.getKinveyAppKey()}`
	}

	//
	// Returns https://baas.kinvey.com/appdata/kinveyAppKey/posts
	//

	getCollectionModuleUrl(collection) {
		return `https://baas.kinvey.com/appdata/${this.getKinveyAppKey()}/${collection}`;
	}

	getUploadAvatarUrl() {
		return `https://baas.kinvey.com/blob/${this.getKinveyAppKey()}`
	}
}
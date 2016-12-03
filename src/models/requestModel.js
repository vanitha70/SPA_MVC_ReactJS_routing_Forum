import $ from '../../node_modules/jquery/dist/jquery.min';

function _makeRequest(method, url, headers, data) {
	return (
		$.ajax({
			method: method,
			url: url,
			headers: headers,
			data: JSON.stringify(data)
		})
	);
}

export default class Requester {

	get(url, headers) {
		return _makeRequest('GET', url, headers);
	}

	post(url, headers, data) {
		return _makeRequest('POST', url, headers, data);
	}

	put(url, headers, data) {
		return _makeRequest('PUT', url, headers, data);
	}

	delete(url, headers) {
		return _makeRequest('DELETE', url, headers);
	}
}
exports.saveLocalItem = function(key, value) {
	sessionStorage.setItem(key, value);
}

exports.getLocalItem = function(key) {
	return sessionStorage.getItem(key);
}

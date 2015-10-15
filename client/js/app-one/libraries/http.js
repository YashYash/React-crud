var $ = require('jquery');

module.exports = {
	get: function(url, callback) {
		$.ajax({
			type: 'GET',
			url: url,
			success: function(data) {
				callback(data);
			},
			error: function(error) {
				callback(null, error.responseJSON);
			}
		})
	},
	post: function(url, data, callback) {
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			success: function(data) {
				callback(data);
			},
			error: function(error) {
				callback(error);
			}
		})
	}	
}
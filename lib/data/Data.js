// Uses the commonjsStrictGlobal wrapper from UMDjs to support AMD, CommonJS and browser globals.
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports'], function (exports) {
			factory((root.Data = exports));
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(exports);
	} else {
		// Browser globals
		factory((root.Data = {}));
	}
}(this, function (exports) {
	var db;
	var retrieveData = (function () {
		var resolveData;
		var _retrieveData = new Promise(function (resolve) {
			resolveData = resolve;
		});
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			db = JSON.parse(this.responseText);
			resolveData(db);
		};
		xhr.open('get', 'lib/data/db.json');
		xhr.send();

		return _retrieveData;
	}());

	var Model = {};
	Model.modelName = 'Model';
	Model.getAll = function () {
		var that = this;
		return new Promise(function (fulfill) {
			retrieveData.then(function (data) {
				var modelData = data[that.modelName];
				var values = [];
				for (var key in modelData) {
					if (modelData.hasOwnProperty(key)) {
						values.push(modelData[key]);
					}
				}
				fulfill(values);
			});
		});
	};
	Model.getById = function (id) {
		var that = this;
		return new Promise(function (fulfill) {
			retrieveData.then(function (data) {
				fulfill(data[that.modelName][id]);
			});
		});
	};
	Model.updateById = function (id, data) {
		var that = this;
		return new Promise(function (fulfill) {
			retrieveData.then(function () {
				db[that.modelName][id] = data;
				fulfill(data);
			});
		});
	};
	Model.create = function (data) {
		var that = this;
		return new Promise(function (fulfill) {
			retrieveData.then(function () {
				var biggestId;
				var store = db[that.modelName];
				for (var key in store) {
					if (!biggestId || key > biggestId) {
						biggestId = key;
					}
				}
				var newId = Number(biggestId) + 1;
				data.id = newId;
				that.updateById(newId, data).then(function () {
					fulfill(data);
				});
			});
		});
	};
	Model.deleteById = function (id) {
		var that = this;
		return new Promise(function (fulfill) {
			retrieveData.then(function () {
				delete db[that.modelName][id];
				fulfill();
			});
		});
	};

	var extend = function (dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	};

	var User = {};
	extend(User, Model);
	User.modelName = 'User';

	var Space = {};
	extend(Space, Model);
	Space.modelName = 'Space';

	exports.User = User;
	exports.Space = Space;
}));

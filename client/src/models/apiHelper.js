var Crime = require('./crime.js');
var StopSearch = require('./stopSearch.js')

var ApiHelper = function() {

};

ApiHelper.prototype = {
  makeRequest: function(url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.addEventListener('load', function() {
        if (request.status !== 200) return;
        var jsonString = request.responseText;
        var resultsObject = JSON.parse(jsonString);
        callback(resultsObject);
      });
      request.send();
    },

    all: function (url, callback) {
      this.makeRequest(url, function (results) {
        var crimes = this.populateCrimes(results)
        callback(crimes);
      }.bind(this));
    },

    populateCrimes: function (results) {
        var crimes = results.map(function (resultObject) {
          return new Crime(resultObject)
        });
        return crimes;
      }
}

module.exports = ApiHelper;
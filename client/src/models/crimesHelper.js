var Crime = require ('./crime.js');
var RestCrimes = require('./restCrimes.js');

var CrimesHelper = function() {
  this.restCrimes = new RestCrimes();
}

CrimesHelper.prototype = {
  coordinateFinder: function(coord1, coord2){
    var avgLat = (coord1.lat + coord2.lat)/2;
    var avgLng = (coord1.lng + coord2.lng)/2;

    var midpoint = {
      lat: avgLat,
      lng: avgLng
    }
    console.log(midpoint);
    return midpoint;
  },

  urlGenerator: function(coords){
    var baseUrl = 'https://data.police.uk/api/crimes-street/all-crime?lat=' + coords.lat + '&lng=' + coords.lng + '&date=2017-03';
    console.log(baseUrl);
    return baseUrl;
  },

  getCrimes: function(coords1, coords2){
    var midpoint = this.coordinateFinder(coords1, coords2);
    var url = this.urlGenerator(midpoint);
    this.restCrimes.all(url, function(crimes){
      crimes.forEach(function(crime){
        // console.log(crime);
      })
    })
  }
}

module.exports = CrimesHelper;
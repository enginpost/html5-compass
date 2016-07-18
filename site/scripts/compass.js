compass = new function(){
  this.heading = function (originLat,originLng,destinationLat,destinationLng) {
        var calcLon = (destinationLng-originLng);
        var y = Math.sin(calcLon) * Math.cos(destinationLat);
        var x = Math.cos(originLat)*Math.sin(destinationLat) - Math.sin(originLat)*Math.cos(destinationLat)*Math.cos(calcLon);
        var brng = this._toDeg(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
  };
  this._toRad = function(deg) {
         return deg * Math.PI / 180;
  };
  this._toDeg = function(rad) {
        return rad * 180 / Math.PI;
  };
}
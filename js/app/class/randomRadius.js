/**
 * Created by tania on 03.05.15.
 */
function RandomRadius($distance) {
    var distance = $distance;
    var self = this;
    self.getS = function(){
        return getRandomInt(10,300);
    }
    self.getDistance = function(){
        return distance;
    }
    self.setDistance = function($distance){
        distance=$distance;
    }
}

/**
 * Created by tania on 03.05.15.
 */

function Fixed($s,$distance) {
    var s = $s;
    var distance = $distance;
    var self = this;
    self.setS = function($s){
        s = $s;
    }
    self.getS = function(){
        return s;
    }
    self.getDistance = function(){
        return distance;
    }
    self.setDistance = function($distance){
        distance= $distance;
    }
}

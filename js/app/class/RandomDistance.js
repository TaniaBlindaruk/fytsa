/**
 * Created by tania on 02.05.15.
 */


function RandonDistance($s) {
    var s = $s;
    var self = this;
    self.setS = function($s){
        s = $s;
    }
    self.getS = function(){
        return s;
    }
    self.getDistance = function(){
        return maxDistance();
    }
}

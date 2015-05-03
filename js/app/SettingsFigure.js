function SettingsFigure() {

}
SettingsFigure.prototype.setFunctionGetS = function(callback){
    SettingsFigure.prototype.getS = callback;
}
SettingsFigure.prototype.setFunctionSetS = function(callback){
    SettingsFigure.prototype.setS = callback;
}
SettingsFigure.prototype.setFunctionGetDistance = function(callback){
    SettingsFigure.prototype.getDistance = callback;
}
SettingsFigure.prototype.setFunctionSetDistance = function(callback){
    SettingsFigure.prototype.setDistance = callback;
}
/**
 * Created by tania on 02.05.15.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function maxDistance() {
    var widthF = parseInt(app.tagJquery.firstElement.css('width'))/2;
    var heightF = parseInt(app.tagJquery.firstElement.css('height'))/2;
    var heightHeader = parseInt(app.tagJquery.header.css('height'));
    var width = parseInt(Math.sqrt(Math.pow(parseInt(app.tagJquery.content.css('width'))-widthF,2)
    + Math.pow(parseInt(app.tagJquery.content.css('height'))-heightF-heightHeader,2))/2);
    return getRandomInt(100, width);
}

/**
 * Created by tania on 02.05.15.
 */

var myViewModel = function () {
    var self = this;
    self.type = ko.observable(false); // 0 - не граєм; 1 - граєм
    self.count = ko.observable(40);
    self.distance = ko.observable(50);
    self.s = ko.observable(100);
    self.masTime = ko.observableArray([]);
    self.masDistance = ko.observableArray([]);
    self.masS = ko.observableArray([]);
    self.countCircle = ko.observable(2);
    self.clickStart = function () {
        self.type(!self.type());
    }
    self.milisecond = ko.observable(0);
    self.textButton = ko.computed(function () {
        if (self.type()) {
            return "Стоп";
        } else {
            return "Старт";
        }
    });
    self.countClick = ko.observable(0);
    self.click = function () {
        self.countClick(self.countClick() + 1);
    }
    self.currentCount = ko.observable(0);
    self.textCountEnable = ko.computed(function () {
        self.currentCount(parseInt(self.countClick()/2))
        return self.currentCount();
    });
}
var idT;
ko.bindingHandlers.clickCircle = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var randomDistance = new RandonDistance(20);
        $(element).click(function () {
            $(element).css({
                'display': 'none'
            })
            switch (viewModel.countCircle()){
                case 2:
                    idT = setInterval(function () {
                        viewModel.milisecond(viewModel.milisecond() + 1);
                    }, 1);
                    viewModel.countCircle(viewModel.countCircle() - 1);
                    break;
                case 1:
                    clearInterval(idT);
                    randomDistance.setS(viewModel.s());
                    createElement(viewModel,randomDistance);
                    viewModel.masTime.push(viewModel.milisecond());
                    viewModel.masDistance.push(viewModel.distance());
                    viewModel.masS.push(viewModel.s());
                    viewModel.milisecond(0);
                    viewModel.countCircle(2);
                    break;
            }
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        if(viewModel.type()){
            window.app.tagJquery.firstElement=$($('.circle')[0]);
            window.app.tagJquery.twoElement=$($('.circle')[1]);
        }

    }
};

function createElement(viewModel,classProperties) {
    var contentWidth = parseInt(app.tagJquery.content.css('width'));
    var firsLeft = getRandomInt(0,parseInt(app.tagJquery.content.css('width')));
    var firsTop = getRandomInt(0,parseInt(app.tagJquery.content.css('height')));
    var distance  = classProperties.getDistance();
    var twoWidth = getRandomInt(10,distance);
    var twoHeight = Math.sqrt(Math.pow(distance,2)-Math.pow(twoWidth,2));
    var widthF = parseInt(app.tagJquery.firstElement.css('width'))/2;
    var heightF = parseInt(app.tagJquery.firstElement.css('height'))/2;

    while((twoWidth+firsLeft+widthF)>contentWidth){
        twoWidth = -twoWidth;
        if(twoWidth+firsLeft+widthF<100){
            twoWidth=100;
        }
    };
    while((twoHeight+firsTop+heightF)> parseInt(app.tagJquery.content.css('height'))){
        twoHeight = -twoHeight;
        if(twoHeight+firsTop+heightF<100){
            twoHeight=100;
        }
    }
    var h = viewModel.s();
    viewModel.distance(distance);
    app.tagJquery.firstElement.css({
        'width':h,
        'height':h,
        'left':firsLeft,
        'top':firsTop,
        'display':'block'
    });
    app.tagJquery.twoElement.css({
        'width':h,
        'height':h,
        'left':twoWidth+firsLeft,
        'top':twoHeight+firsTop,
        'display':'block'
    });
}
$(document).ready(function () {
    window.app={
        tagName:{
            leftBar:'#left',
            content: '#content',
            header: '#header'
        },
        tagClass:{
            element:'.circle'
        },
        tagJquery:{
            firstElement: $($('.circle')[0]),
            twoElement: $($('.circle')[1]),
            header: $('#header'),
            content: $('#content')

        }
    }
    ko.applyBindings(new myViewModel());
})

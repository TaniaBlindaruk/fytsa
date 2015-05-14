/**
 * Created by tania on 02.05.15.
 */

var myViewModel = function () {
    var self = this;
    self.type = ko.observable(false); // 0 - не граєм; 1 - граєм
    self.count = ko.observable(40);
    self.distance = ko.observable(50);
    self.s = ko.observable(100);
    self.countCircle = ko.observable(2);
    self.globalMas = ko.observableArray([]);
    self.masDistanceT =[];
    self.masST =[];
    self.clickStart = function () {
        self.type(!self.type());
        if (self.type()) {
            var settingFigure = new SettingsFigure();
            if (self.randomDistance()) {
                settingFigure.setFunctionGetDistance(
                    function () {
                        return maxDistance();
                    }
                );
            } else {
                settingFigure.setFunctionGetDistance(
                    function () {
                        return self.distance();
                    }
                )
            }

            if (self.randomRadius()) {
                settingFigure.setFunctionGetS(
                    function () {
                        return getRandomInt(10, 300);
                    }
                );
            } else {
                settingFigure.setFunctionGetS(
                    function () {
                        return self.s();
                    }
                );
            }
        }
    }
    self.randomDistance = ko.observable(false);
    self.randomRadius = ko.observable(false);
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
        self.currentCount(parseInt(self.countClick() / 2))
        return self.currentCount();
    });

}
var idT;
ko.bindingHandlers.drawGraph= {
    update: function(element,valueAccessor){
        $.jqplot($(element).attr('id'), [valueAccessor()], {
            series:[{showMarker:false}],
            axes:{
                xaxis:{
                    label:'N'
                },
                yaxis:{
                    label:'t'
                }
            }
        });
    }

}
ko.bindingHandlers.clickCircle = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).click(function () {
            $(element).css({
                'display': 'none'
            })
            switch (viewModel.countCircle()) {
                case 2:
                    idT = setInterval(function () {
                        viewModel.milisecond(viewModel.milisecond() + 1);
                    }, 1);
                    viewModel.countCircle(viewModel.countCircle() - 1);
                    break;
                case 1:
                    clearInterval(idT);
                    createElement(viewModel, new SettingsFigure());
                    viewModel.masDistanceT.push([
                        viewModel.milisecond(),
                        viewModel.distance()
                    ]);
                    viewModel.masST.push([
                        viewModel.milisecond(),
                        viewModel.s(),
                    ]);
                    viewModel.globalMas.push({
                        id: viewModel.currentCount() + 1,
                        time: viewModel.milisecond(),
                        Distance: viewModel.distance(),
                        s: viewModel.s()
                    });
                    viewModel.milisecond(0);
                    viewModel.countCircle(2);
                    if ((viewModel.currentCount() + 1) === +viewModel.count()) {
                        viewModel.type(0);
                        viewModel.countClick(0);
                    }
                    break;
            }
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        if (viewModel.type()) {
            window.app.tagJquery.firstElement = $($('.circle')[0]);
            window.app.tagJquery.twoElement = $($('.circle')[1]);
        }

    }
};

function createElement(viewModel, classProperties) {
    var contentWidth = parseInt(app.tagJquery.content.css('width'));
    var contentHeight = parseInt(app.tagJquery.content.css('height'));
    do {
        var firsLeft = getRandomInt(0, parseInt(app.tagJquery.content.css('width')));
        var firsTop = getRandomInt(0, parseInt(app.tagJquery.content.css('height')));
        var distance = classProperties.getDistance();
        var h = classProperties.getS();
        var distance1 = +distance + h;
        var twoWidth = getRandomInt(10, distance1);
        var twoHeight = Math.sqrt(Math.pow(distance1, 2) - Math.pow(twoWidth, 2));
        var widthF = h//parseInt(app.tagJquery.firstElement.css('width')) ;
        var heightF = h//parseInt(app.tagJquery.firstElement.css('height'));
        if ((twoWidth + firsLeft + widthF) > contentWidth) {
            twoWidth = -twoWidth;
            //alert(twoWidth + firsLeft + widthF);
        };
        if ((twoHeight + firsTop + heightF) > parseInt(app.tagJquery.content.css('height'))) {
            twoHeight = -twoHeight;
        };
    } while (firsLeft + widthF > contentWidth ||
    firsTop + heightF > contentHeight ||
    firsLeft + widthF + twoWidth > contentWidth ||
    firsLeft  + twoWidth < 0 ||
    firsTop + heightF + twoHeight > contentHeight ||
    firsTop  + twoHeight < 0);

    viewModel.s(h);
    viewModel.distance(distance);
    app.tagJquery.firstElement.css({
        'width': h,
        'height': h,
        'left': firsLeft,
        'top': firsTop,
        'display': 'block'
    });
    app.tagJquery.twoElement.css({
        'width': h,
        'height': h,
        'left': twoWidth + firsLeft,
        'top': twoHeight + firsTop,
        'display': 'block'
    });
}
$(document).ready(function () {
    window.app = {
        tagName: {
            leftBar: '#left',
            content: '#content',
            header: '#header'
        },
        tagClass: {
            element: '.circle'
        },
        tagJquery: {
            firstElement: $($('.circle')[0]),
            twoElement: $($('.circle')[1]),
            header: $('#header'),
            content: $('#content')

        }
    }
    ko.applyBindings(new myViewModel());
})

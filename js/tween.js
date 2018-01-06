~function () {
    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    }

    function move(curEle, target, duration) {
        clearInterval(curEle.ztimer);
        var begin = {}, change = {};
        for (var key in target) {
            if(target.hasOwnProperty(key)){
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        var timecacu = 0;
        interval=10;
        curEle.ztimer = window.setInterval(function () {
            window.clearInterval(curEle.timer);
            //time>duration时
            timecacu +=interval;
            if (timecacu >= duration) {
                utils.css(curEle, target);
                window.clearInterval(curEle.timer);
                return;
            }

                for (var key in target) {
                    if (target.hasOwnProperty(key)) {
                        var curPos = zhufengEffect.Linear(timecacu, begin[key], change[key], duration);
                        utils.css(curEle, key, curPos);
                    };

                }



        }, interval);

    };

    window.animate = move;
}();
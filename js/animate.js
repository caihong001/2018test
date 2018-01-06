~function(){

    var effect={
        Linear:function(t,b,c,d){
            return c/d*t+b;
        }
    };

    function animate(curEle,target,duration,callback){
        clearInterval(curEle.timer);
        var begin={},change={};
        for(var key in target){
            begin[key]=utils.getCss(curEle,key);
            change[key]=target[key]-begin[key];
        }

        var time=null;
        var interval=10;
        curEle.timer=setInterval(function(){

            time+=interval;
            //到达目标
            if(time>=duration){
                utils.setGroupCss(curEle,target);

                typeof callback==="function"?callback():null;
                clearInterval(curEle.timer);
            }
            //没到到目标，求出元素当前的位置
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curPos=effect.Linear(time,begin[key],change[key],duration);
                    utils.setCss(curEle,key,curPos);
                }
            }
        },interval);

    }

    window.animate=animate;


}();
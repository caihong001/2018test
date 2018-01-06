var utils = (function () {

    function listToArray(likeArray){
        var ary = [];
        try{
            ary= Array.prototype.slice.call(likeArray);
        }catch(e){
            for(var i=0;i<likeArray.length;i++){
                ary[i]=likeArray[i];
            }
        }
        return ary;
    }

    function formatJson(jsonStr){
        return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    }

    function getCss(curEle, attr) {
        var val=null,reg=null;
        if ("getComputedStyle" in window) {
            val=window.getComputedStyle(curEle, null)[attr];
        } else {
            if(attr==='opacity'){
                val=curEle.currentStyle('filter');
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val=reg.test(val)?reg.exec(val)[1]/100:1;
            }else {
                val= curEle.currentStyle[attr];

            }
        }
        reg=/^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
        return reg.test(val)?parseFloat(val):val;

    }


    function offSet(curEle) {
        var totalLeft = null, totalTop = null, par = curEle.offsetParent;
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;

            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop}

    }

    function win(attr,value){
        if(typeof value==='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    function children(curEle,tagName){
        var ary=[];
        if(/MSIE(6|7|8)/i.test(navigator.userAgent)){
            var nodeList= curEle.childNodes;
            for(var i=0;i<nodeList.length;i++){
                if(nodeList[i].nodeType===1){
                    ary.push(nodeList[i])
                }
            }
        }else{
            ary=Array.prototype.slice.call(curEle.children);
        }
        if(typeof tagName==='string'){
            for(var k=0;k<ary.length;k++){
               if(ary[k].tagName.toLowerCase!==tagName.toLowerCase){
                   ary.splice(k,1);
                   k--;
               }
            }
        }
        return ary;
    }

    function setCss(curEle,attr,value){
        if(attr==='float'){
            curEle[style]["cssFloat"]=value;
            curEle[style]["styleFloat"]=value;
            return
        }
        if(attr="opacity"){
            curEle[style]["opacity"]=value;
            curEle[style]["filter"]="alpha(opacity="+value*100+")";
            return
        }

        if(!isNaN(value)){
            value+='px';
        }
        curEle[style][attr]=value;
    };


    function getCss(curEle, attr) {
        var val = null;
        var reg = null;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
        return reg.test(val) ? parseFloat(val) : val;
    }


    function setCss(curEle,attr,value){
        if(attr==='float'){
            curEle["style"]["cssFloat"]=value;
            curEle["style"]["styleFloat"]=value;
            return
        }
        if(attr==="opacity"){
            curEle["style"]["opacity"]=value;
            curEle["style"]["filter"]="alpha(opacity="+value*100+")";
            return
        }

        var reg=/^width|height|top|left|right|bottom|((margin|padding)(Top|Bottom|Right|Left)?)$/;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+='px';
            }
        }

        curEle["style"][attr]=value;
    };

    function setGroupCss(curEle,options){
        options=options||0;
        if(options.toString()!=="[object Object]"){
            return;
        }

        for(var key in options){
            if(options.hasOwnProperty(key)){
                setCss(curEle,key,options[key]);
            }
        }
    };

    function css(curEle){
        arg2=arguments[1];
//        arg3=arguments[2];
        if(typeof arg2 ==="string"){
            if(typeof arguments[2]==="undefined"){
                return getCss(curEle,arg2);
            }
            setCss.apply(curEle,arguments);
        }
        // arguments[1]=arguments[1]||0;
        if(Object.prototype.toString.call(arguments[1]) === "[object Object]"){
            setGroupCss.apply(curEle,arguments);
        }
    }

    function prev(curEle){
        if(window.getComputedStyle){
            return curEle.previousElementSibling;
        }
        pre=curEle.previousSibling;
        while(pre && pre.nodeType!==1){
            pre = pre.previousSilbing;
        }
        return pre;
    }

    function prevAll(curEle){
        var ary = [];
        pre = this.prev(curEle);
        while(pre){
            ary.unshift(pre);
            pre=prev(pre)
        }
        return ary;
    }

    function next(curEle){
        if(window.getComputedStyle){
            return curEle.nextElementSibling;
        }

        nex=curEle.nextSibling;
        while(next && next.nodeType!==1){
            nex=nex.nextSibling;
        }
        return next;
    }

    function nextAll(curEle){
        var ary=[];
        nex=next(curEle);
        while(nex){
            ary.push(nex);
            nex=this.next(nex);
        }
        return ary;

    }

    function index(curEle){
           return this.prevAll(curEle).length;
    }

    function firstChild(curEle){
        var childs=this.children(curEle);
        return childs.length>0?childs[0]:null;
    };

    function lastChild(curEle){
        var childs=this.children(curEle);
        return childs.length>0?childs[childs.length-1]:null;


    }


    function hasClass(curEle, className){
        var reg = new RegExp("(^| +)"+className+"( +|$)");
        return reg.test(curEle.className);
    }

    function addClass(curEle,className){
        var ary = className.split(/ +/g);
        for(var i=0;i<ary.length;i++){
            if(!hasClass(curEle,ary[i])){
                curEle.className+=" "+className;
            }
        }

    }

    function removeClass(curEle,className){
       var aryName = className.split(/ +/g);
       for(var i=0;i<aryName.length;i++){
            if(hasClass(curEle,aryName[i])){
                var reg = new RegExp("(^| +)"+aryName[i]+"( +|$)","g");
               curEle.className = curEle.className.replace(reg," ");
            }
       }

    }

    function append(newEle, container){
            container.appendChild(newEle);
    };

    function prepend(newEle,container){
        var fir=firstChild(container);
        if(fir){
           container.insertBefore(newEle,fir);
           return;
        }
        container.appendChild(newEle);
    };

    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle)
    };

    function insertAfter(newEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }

        oldEle.parentNode.appendChild(newEle);
    }


    return {
        getCss: getCss,
        offSet:offSet,
        formatJson:formatJson,
        children:children,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        prev:prev,
        prevAll:prevAll,
        next:next,
        nextAll:nextAll,
        index:index,
        firstChild:firstChild,
        lastChild:lastChild,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        append:append,
        prepend:prepend,
        insertBefore:insertBefore,
        insertAfter:insertAfter,
    }
})();
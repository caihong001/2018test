(function () {

    var banner = document.getElementById("banner");
    var bannerInner = document.getElementsByClassName("bannerInner");


    var jsonData = null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
              jsonData = JSON.parse(xhr.responseText);
            }

        };

        xhr.send(null);

    }();

    ~function () {
        var str = "";
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                str += '<img src="' + jsonData[i]["img"] + '" alt="">';
                str += '<img src="' + jsonData[0]["img"] + '" alt="">';
            }
        }
        bannerInner.innerHTML = str;
    }();
})();
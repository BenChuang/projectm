<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="resource/css/bootstrap.min.css">
    <link rel="stylesheet" href="resource/css/swiper-4.1.0.min.css">
    <link rel="stylesheet" href="resource/css/mycss.css">
</head>
<body onload="init()">
<nav class="navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Brand</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form class="navbar-form navbar-right">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-default"><b>SIGN IN &#10140</b></button>
                <a id="btn_registen">or SIGN UP now!</a>
            </form>
        </div>
    </div>
</nav>

<div class="jumbotron svg">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-offset-1 col-md-10" id="typingArea">
            </div>
        </div>
    </div>
</div>


<div class="swiper-container swiper-container-out" style="position: absolute; width: 100%; top: 240px; ">
    <div class="swiper-wrapper" style="margin-left: 28%; margin-bottom: 45px">
        <div class="content">
            <div id="desktop"></div>
            <div class="swiper-container swiper-container-looping" style="position: absolute;top: 40px;left: 1px;width: 748px;height: 439px;border-radius: 0px 0px 3px 3px;">
                <div class="swiper-wrapper" style=" margin-bottom: 45px">
                    <div class="swiper-slide"><img src="resource/img/p1.png" style="width: 748px; height: 339px;"></div>
                    <div class="swiper-slide"><img src="resource/img/p1.png" style="width: 748px; height: 339px;"></div>
                    <div class="swiper-slide"><img src="resource/img/p1.png" style="width: 748px; height: 339px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="registerPanel" class="col-lg-3 free-blog" style="right: 4%; top: 80px; display: none; z-index: 1"></div>

</body>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="resource/js/swiper-4.1.0.min.js"></script>
<script src="resource/js/bootstrap.min.js"></script>
<script src="resource/js/dynamic.js"></script>
<script src="resource/js/Index.js"></script>
<script>
    var typingArea = $("#typingArea")[0];
    createTypingText(typingArea, "w3schools.com，", "是最受欢迎的前端技术教程网站，但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧！");


    function init(){
        var Index = new Index($("#registerPanel")[0]);
        $("#btn_registen").bind("click", function(){Index.openRegister.call(Index)});

    }


    var mySwiper1 = new Swiper('.swiper-container-out', {
        direction: 'horizontal'
    });

    var mySwiper2 = new Swiper('.swiper-container-looping', {
        direction: 'horizontal',
        mousewheel: {eventsTarged: window},
        loop: true,
        autoplay: true
    });

    window.onresize = function () {
        if (document.body.scrollHeight > document.body.clientHeight) {
            mySwiper2.mousewheel.disable();
        } else {
            mySwiper2.mousewheel.enable();
        }
    }

    var desktop = $.ajax({url: "/resource/img/desktop.svg", async: false}).responseText;
    $("#desktop").html(desktop);
</script>
</html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="/resource/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resource/css/swiper-4.1.0.min.css">
    <link rel="stylesheet" href="/resource/css/mycss.css">
    <title>TeamCo | 协作，助力企业和团队实现目标</title>
</head>
<body>
<nav class="navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">TeamCo | 协作，助力企业和团队实现目标</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div id="signing" class="navbar-right">
                <p class="navbar-text">
                    <a id="btn_loginPanel"><b>SIGN IN</b></a>
                    <span> or </span>
                    <a id="btn_register"><b>SIGN UP</b></a>
                </p>
            </div>
          </div>
    </div>
</nav>

<div class="jumbotron svg">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <span>
                    <h1 class="typing">协作，助力企业和团队实现目标</h1>
                    <h2 class="typing">
                        <span id="typingArea"></span>
                        <span class="cursor-fadeinout">|</span>
                    </h2>
                </span>
            </div>
        </div>
    </div>
</div>


<div class="swiper-container swiper-container-out" style="position: absolute; width: 100%; height: 80%; top: 280px; ">
    <div class="swiper-wrapper" style="margin-left: 20%; margin-bottom: 45px; width: 60%; height: 90%">
        <div class="content" style="width: 100%; height: 100%">
            <div id="desktop" style="width: 100%">
                <svg class="bh l"
                     style="width:100%;height:100%;pointer-events:none;border-radius:3px;box-shadow:0 34px 50px 0 rgba(0, 0, 0, .3)">
                    <g>
                        <defs>
                            <filter id="addressbarGlow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"></feGaussianBlur>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                        </defs>
                        <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" style="fill: rgb(208, 208, 208);stroke: rgb(182, 182, 182);stroke-width: 2px;"></rect>
                        <circle cx="3%" cy="18.142857142857142" fill="#fc605c" stroke="#ef4b47" stroke-width="1"
                                r="5.714285714285714"></circle>
                        <circle cx="5%" cy="18.142857142857142" fill="#fdbc40" stroke="#efaa2f" stroke-width="1"
                                r="5.714285714285714"></circle>
                        <circle cx="7%" cy="18.142857142857142" fill="#34c749" stroke="#22b634" stroke-width="1"
                                r="5.714285714285714"></circle>
                        <rect rx="2" ry="2" x="10%" y="6.666666666666667" width="80%" fill="#419bf9"
                              style="height: 26.6667px; transition: all 200ms ease-out;"></rect>
                        <rect rx="2" ry="2" x="10%" y="6.666666666666667" width="80%" stroke-width="1" stroke="#adadad" fill="white"
                              style="height: 26.6667px; transition: all 200ms ease-out;"></rect>
                        <text dy="0.3em" x="12%" y="20" style="font-size: 14px;">http://www.mysite.com</text>
                    </g>
                </svg>
            </div>
            <div class="swiper-container swiper-container-looping" style="position: absolute;top: 40px;left: 1px;width: calc(100% - 2px); width:-webkit-calc(100% - 2px); width:-moz-calc(100% - 2px);  height:calc(100% - 41px); height:-webkit-calc(100% - 41px); height:-moz-calc(100% - 41px); border-radius: 0 0 3px 3px;">
                <div class="swiper-wrapper" style=" margin-bottom: 45px">
                    <div class="swiper-slide"><img src="/resource/img/p1.png" style="width: 100%; height: 100%;"></div>
                    <div class="swiper-slide"><img src="/resource/img/p1.png" style="width: 100%; height: 100%;"></div>
                    <div class="swiper-slide"><img src="/resource/img/p1.png" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="registerPanel" class="col-lg-3 free-blog" style="right: 4%; top: 80px; display: none; z-index: 1"></div>
<div id="loginPanel" class="col-lg-3 free-blog" style="right: 4%; top: 80px; display: none; z-index: 1"></div>

</body>

<script src="/resource/js/jquery-1.12.4.min.js"></script>
<script src="/resource/js/swiper-4.1.0.min.js"></script>
<script src="/resource/js/bootstrap.min.js"></script>
<script src="/resource/js/commonUtil.js"></script>
<script src="/resource/js/global.js"></script>
<script src="/resource/js/eventUtil.js"></script>
<script src="/resource/js/Index.js"></script>


</html>

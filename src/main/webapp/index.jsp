<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%--<link rel="stylesheet" href="resource/css/bootstrap.min.css">--%>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="resource/css/mycss.css">
</head>
<body>
<nav class="navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
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
                <a onclick="openRegister()" id="btn_registen">or SIGN UP now!</a>
            </form>
        </div>
    </div>
</nav>

<div class="jumbotron">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-offset-1 col-md-6" id="typingArea">
            </div>
        </div>
    </div>
</div>

</body>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<%--<script src="resource/js/bootstrap.min.js"></script>--%>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
<script src="resource/js/dynamic.js"></script>
<script>
    var typingArea = $("#typingArea")[0];
    createTypingText(typingArea, "w3schools.com，", "是最受欢迎的前端技术教程网站，但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧！");
    debugger;

    var formHtml = $.ajax({url: "/login.html", async: false}).responseText;
    var div = document.createElement("div");
    div.style.right = "4%";
    div.style.top = "80px";
    div.className = "col-lg-3 free-blog";
    div.innerHTML = formHtml;
    div.style.display = "none";
    document.body.appendChild(div);

    function openRegister() {
        if (div.style.display === "none") {
            $(div).fadeIn();
            $(document).click(function(event) {
                debugger;
                var x = event.clientX;
                var y = event.clientY;
                var l = div.offsetLeft;
                var t = div.offsetTop;
                var r = l + div.offsetWidth;
                var b = t + div.offsetHeight;
                if (jj === true && !(x > l && x < r && y > t && y < b)) {
                    $(div).fadeOut();
                    $(document).unbind("click");
                    jj = null;
                    return;
                }
                jj = true;
            });
        }
        jj = false;
    }


</script>
</html>

<html>
<head>
    <%--<link rel="stylesheet" href="resource/css/bootstrap.min.css">--%>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
        ::selection {
            background: #bdbfbe;
        }

        body {
            /*background: url(/resource/img/background.svg) fixed;*/
            background: url(https://helphero.co/assets/things_28f8b283dab69268d4d244b92eced6a1.svg) fixed;
            padding-top: 50px;
        }

        .navbar-default .navbar-brand {
            transition: all .15s ease;
            -webkit-transition: all .15s ease;
            color: #777777;
        }

        .navbar-default .navbar-brand:hover {
            color: #ffffff;
        }



        .navbar-default {
            background: -moz-linear-gradient(top, #8ed7ff 0%, #ffffff 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#8ed7ff), color-stop(100%,#ffffff));
            background: -webkit-linear-gradient(top, #8ed7ff 0%,#ffffff 100%);
            background: -o-linear-gradient(top, #8ed7ff 0%,#ffffff 100%);
            background: -ms-linear-gradient(top, #8ed7ff 0%,#ffffff 100%);
            background: linear-gradient(to bottom, #8ed7ff 0%,#ffffff 100%);
            border: hidden;
        }

        .navbar {
            border-radius: 0;
        }

        .jumbotron {
            box-shadow: 0 3px 9px rgba(0,0,0,.5);
            background-color: rgba(0,0,0,0);
            height: 300px;
        }

        .cursor-fadeinout {
            animation: cursor-fadeinout 1s infinite;
            -webkit-animation: cursor-fadeinout 1s infinite;
        }

        .typing-h1 {
            font-size: 30px;
            color: #000000;
        }

        @keyframes cursor-fadeinout {
            0%,100% { opacity: 0; }
            50% { opacity: 0.8; }
        }
    </style>
</head>
<body>
<nav class="navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
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

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <%--<ul class="nav navbar-nav">--%>
                <%--<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>--%>
                <%--<li><a href="#">Link</a></li>--%>
                <%--<li class="dropdown">--%>
                    <%--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"--%>
                       <%--aria-expanded="false">Dropdown <span class="caret"></span></a>--%>
                    <%--<ul class="dropdown-menu">--%>
                        <%--<li><a href="#">Action</a></li>--%>
                        <%--<li><a href="#">Another action</a></li>--%>
                        <%--<li><a href="#">Something else here</a></li>--%>
                        <%--<li role="separator" class="divider"></li>--%>
                        <%--<li><a href="#">Separated link</a></li>--%>
                        <%--<li role="separator" class="divider"></li>--%>
                        <%--<li><a href="#">One more separated link</a></li>--%>
                    <%--</ul>--%>
                <%--</li>--%>
            <%--</ul>--%>
            <form class="navbar-form navbar-right">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-default"><b>SIGN IN &#10140</b></button>
                <a href="#">Sign up</a>
            </form>
            <%--<ul class="nav navbar-nav navbar-right">--%>
                <%--<li><a href="#">Link</a></li>--%>
                <%--<li class="dropdown">--%>
                    <%--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"--%>
                       <%--aria-expanded="false">Dropdown <span class="caret"></span></a>--%>
                    <%--<ul class="dropdown-menu">--%>
                        <%--<li><a href="#">Action</a></li>--%>
                        <%--<li><a href="#">Another action</a></li>--%>
                        <%--<li><a href="#">Something else here</a></li>--%>
                        <%--<li role="separator" class="divider"></li>--%>
                        <%--<li><a href="#">Separated link</a></li>--%>
                    <%--</ul>--%>
                <%--</li>--%>
            <%--</ul>--%>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
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
<script>
    function createTypingText(elem, textFixed, textDynamic) {
        if(elem) {
            textFixed = "" + textFixed;
            textDynamic = "" + textDynamic;
            var span1 = document.createElement("SPAN");
            var g = document.createElement("G");
            g.className = "typing-h1";
            span1.appendChild(g);
            var span2 = document.createElement("SPAN");
            span2.innerHTML = "|";
            span2.className = "typing-h1 cursor-fadeinout";
            elem.appendChild(span1);
            elem.appendChild(span2);
            var textDynamicLength = textDynamic.length;
            var frameNum = (textDynamicLength * 2) + 120;
            var secondTextFrom = textDynamicLength + ((frameNum - textDynamicLength * 2) / 2);
            var secondTextTo = secondTextFrom + textDynamicLength;
            var textIndex = 0;
            var frameIndex = 0;
            var interval = setInterval(function () {
                try {
                    g.textContent = textFixed + textDynamic.substring(0, textIndex);
                    if (frameIndex < textDynamicLength) {
                        textIndex++;
                    } else if (secondTextFrom <= frameIndex && frameIndex < secondTextTo) {
                        textIndex--;
                    }
                    frameIndex = (frameIndex + 1) % frameNum;
                } catch (e) {
                    clearInterval(interval);
                }
            }, 30)
        }
    }
    createTypingText(document.getElementById("typingArea"), "Hello world! ", "Stocks around the world have staged one of the best-ever starts to a year, a synchronized rally that has only gained momentum following 2017's sharp gains.");

</script>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<%--<script src="resource/js/bootstrap.min.js"></script>--%>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</html>

<html>
<head>
    <link rel="stylesheet" href="resource/css/bootstrap.min.css">
    <style>
        ::selection {
            background: #bdbfbe;
        }

        body {
            background-image: url(/resource/img/background.svg);
            background-attachment:fixed;
            padding-top: 70px;
        }

        .navbar-default {
            background-color: #4387AC;
            border: hidden;
        }

        .navbar {
            border-radius: 0px;
        }

        .cursor-fadeinout {
            animation: cursor-fadeinout 1s infinite;
            -webkit-animation: cursor-fadeinout 1s infinite;
        }

        .typing-h1 {
            font-size: 60px;
            color: #000000;
        }

        @keyframes cursor-fadeinout {
            0%,100% { opacity: 0; }
            50% { opacity: 0.8; }
        }
    </style>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            <form class="navbar-form navbar-left">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div class="jumbotron">
    <h1>Hello, world!</h1>
    <p>...</p>
    <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-offset-2 col-md-8" id="typingArea">
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
    createTypingText(document.getElementById("typingArea"), "Hello ", "world! Stocks around the world have staged one of the best-ever starts to a year, a synchronized rally that has only gained momentum following 2017's sharp gains.");

</script>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="resource/js/bootstrap.min.js"></script>
</html>

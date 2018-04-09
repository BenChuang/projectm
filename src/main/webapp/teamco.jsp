<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="/resource/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resource/css/swiper-4.1.0.min.css">
    <link rel="stylesheet" href="/resource/css/mycss.css">
    <title>TeamCo | 协作，助力企业和团队实现目标</title>
</head>
<body style="background-color: #e8e8e8">
<nav class="navbar-default navbar-fixed-top" style="box-shadow: 0 3px 9px rgba(0,0,0,.5);">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></a><h4 class="navbar-text" id="head">我的项目</h4>
            <ul class="dropdown-menu">
                <li><a id="btn_running" class="btn-flow"><span class="glyphicon glyphicon-ok" aria-hidden="true"> 我的项目</span></a></li>
                <li><a id="btn_myTask" class="btn-flow"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"> 我的任务</span></a></li>
                <li role="separator" class="divider"></li>
                <li><a id="btn_myTimeflow" class="btn-flow"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"> 我的时间线</span></a></li>
                <li><a id="btn_projectTimeflow" class="btn-flow"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"> 项目时间线</span></a></li>
            </ul>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li><a id="btn_notification" class="btn-function"><span class="glyphicon glyphicon-bell" aria-hidden="true"></span> 通知</a></li>
                <li><a id="btn_chats" class="btn-function"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> 聊天</a></li>
                <li class="dropdown">
                    <a style="padding: 8px 10px 10px 10px" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="/resource/img/account.png" width="30px" height="30px"></a>
                    <ul class="dropdown-menu">
                        <li id="usernameTag" class="dropdown-header" style="padding: 6px 20px 0 16px"></li>
                        <li><a id="btn_self" class="btn-function">个人信息</a></li>
                        <li><a id="btn_notificationItems" class="btn-function">通知选项</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/controller/logout">注销</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12" id="board_area" style="display: flex; flex-wrap: wrap"></div>
    </div>
</div>





</body>

<script src="/resource/js/jquery-1.12.4.min.js"></script>
<script src="/resource/js/bootstrap.min.js"></script>
<script src="/resource/js/commonUtil.js"></script>
<script src="/resource/js/global.js"></script>
<script src="/resource/js/eventUtil.js"></script>
<script src="/resource/js/echarts.simple.min.js"></script>
<script src="/resource/js/CreateNewProj.js"></script>
<script src="/resource/js/FloatingPanel.js"></script>
<script src="/resource/js/Project.js"></script>
<script src="/resource/js/MyTask.js"></script>
<script src="/resource/js/Chats.js"></script>
<script src="/resource/js/MyTimeflow.js"></script>
<script src="/resource/js/Notification.js"></script>
<script src="/resource/js/NotificationItem.js"></script>
<script src="/resource/js/Running.js"></script>
<script src="/resource/js/ProjectTimeflow.js"></script>
<script src="/resource/js/Setting.js"></script>
<script src="/resource/js/Timeflow.js"></script>
<script src="/resource/js/Board.js"></script>
<script src="/resource/js/Teamco.js"></script>


</html>

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
            <a class="navbar-brand dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></a><h4 class="navbar-text" id="head">进行中的项目</h4>
            <ul class="dropdown-menu">
                <li><a id="btn_running" class="btn-flow"><span class="glyphicon glyphicon-ok" aria-hidden="true"> 进行中的项目</span></a></li>
                <li><a id="btn_completed" class="btn-flow"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"> 已完成的项目</span></a></li>
                <li><a id="btn_timeflow" class="btn-flow"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"> 时间流</span></a></li>
                <li role="separator" class="divider"></li>
                <li><a id="btn_bussiness" class="btn-function"><span class="glyphicon glyphicon-plus" aria-hidden="true"> 创建企业</span></a></li>
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
                        <li><a id="btn_setting" class="btn-function">设定</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/controller/logout">注销</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row" id="board_area">
    </div>
</div>

<div class="outter-block-hidden" id="creat_new_project">
    <div class="backdrop-hidden" id="backdrop"></div>
    <div class="floating-block-hidden" id="floating_block">
        <div style="border-bottom: 2px solid #545454; padding-bottom: 40px">
            <div style="position: absolute; left: 0; right: 40px; height: 40px; background-color: #545454; border-top-left-radius: 0px;">
                <h2 style="margin: 3px 8px; color: #ffffff;">创建新项目</h2>
            </div>
            <div style="position: absolute; right: 0; width: 40px; height: 40px; background-color: #ff7677; border-left: 2px solid #545454; border-top-right-radius: 0px;">
                <a id="btn_close_creat_new_project">
                    <h3 style="margin: 8px; color: #545454"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></h3>
                </a>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row form-inline">
                <div class="form-group col-xs-5">
                    <label for="exampleInputName1">项目名称</label>
                    <input type="text" class="form-control" id="exampleInputName1" placeholder="项目名称（必填）">
                </div>
                <div class="form-group col-xs-7">
                    <label for="exampleInputName2">项目简介</label>
                    <input type="text" class="form-control" id="exampleInputName2" style="width: 80%" placeholder="项目简介（选填）">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <div class="jumbotron" style="box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,.5)">
                        <h3 style="text-align: center; margin: 0">项目状态</h3>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="jumbotron" style="box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,.5)">
                        <h3 style="text-align: center; margin: 0">参与人员</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="/resource/js/bootstrap.min.js"></script>
<script src="/resource/js/commonUtil.js"></script>
<script src="/resource/js/global.js"></script>
<script src="/resource/js/eventUtil.js"></script>
<script src="/resource/js/Bussiness.js"></script>
<script src="/resource/js/Chats.js"></script>
<script src="/resource/js/Completed.js"></script>
<script src="/resource/js/Notification.js"></script>
<script src="/resource/js/NotificationItem.js"></script>
<script src="/resource/js/Running.js"></script>
<script src="/resource/js/Self.js"></script>
<script src="/resource/js/Setting.js"></script>
<script src="/resource/js/Timeflow.js"></script>
<script src="/resource/js/Board.js"></script>
<script src="/resource/js/Teamco.js"></script>


</html>

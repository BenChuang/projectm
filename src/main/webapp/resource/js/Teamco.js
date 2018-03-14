const Teamco = function () {
    this.username = commonUtil.getState("curUsername");
    this.head = $("#head")[0];
    this.currentBoard = new Board($("#btn_running")[0]);

    let AllFunctionBtns = $(".btn-function");
    for(let btn of AllFunctionBtns){
        eval( "this.btn" + commonUtil.buildBtnName(btn) + " = btn;" );
        btn.addEventListener('click', eventUtil.newEventHendleFun(false, this.doFunction, this, btn))
    }
    let AllFlowBtns = $(".btn-flow");
    for(let btn of AllFlowBtns){
        eval( "this.btn" + commonUtil.buildBtnName(btn) + " = btn;" );
        btn.addEventListener('click', eventUtil.newEventHendleFun(false, this.changeBoard, this, btn))
    }

    this.init();
};

Teamco.prototype.init = function () {
    $("#usernameTag")[0].textContent = "Hi, " + this.username;
};

Teamco.prototype.doFunction = function (btn) {

};

Teamco.prototype.changeBoard = function (btn) {
    if(this.currentBoard.controlBtn !== btn){
        let board = new Board(btn);
        this.currentBoard.controlBtn.childNodes[0].className = "glyphicon glyphicon-option-horizontal";
        this.head.textContent = board.boardName;
        this.currentBoard = board;
        board.controlBtn.childNodes[0].className = "glyphicon glyphicon-ok";
    }
};

teamco = new Teamco();


// this.btnRunning = $("#btn_running")[0];
// this.btnCompleted = $("#btn_completed")[0];
// this.btnTimeflow = $("#btn_timeflow")[0];
// this.btnBussiness = $("#btn_bussiness")[0];
// this.btnNotification = $("#btn_notification")[0];
// this.btnChats = $("#btn_chats")[0];
// this.btnSelf = $("#btn_self")[0];
// this.btnNotificationItems = $("#btn_notificationItems")[0];
// this.btnSetting = $("#btn_setting")[0];
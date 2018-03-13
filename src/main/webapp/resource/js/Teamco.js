const Teamco = function () {
    this.usernameTag = $("#usernameTag")[0];
    // this.btnRunning = $("#btn_running")[0];
    // this.btnCompleted = $("#btn_completed")[0];
    // this.btnTimeflow = $("#btn_timeflow")[0];
    // this.btnBussiness = $("#btn_bussiness")[0];
    // this.btnNotification = $("#btn_notification")[0];
    // this.btnChats = $("#btn_chats")[0];
    // this.btnSelf = $("#btn_self")[0];
    // this.btnNotificationItems = $("#btn_notificationItems")[0];
    // this.btnSetting = $("#btn_setting")[0];
    this.btnsFlow = $(".btn-flow");
    this.init();
};

Teamco.prototype.init = function () {
    this.usernameTag.textContent = "Hi, " + commonUtil.getState("curUsername");
    for (let btnFlow of this.btnsFlow){
        let btnName = commonUtil.buildBtnName(btnFlow);
        let thisBtnFlow = "this.btn" + btnName;
        eval( thisBtnFlow + " = btnFlow;" );
        eval( thisBtnFlow + ".addEventListener('click', () => {new " + btnName + "(this);})");
    }
};
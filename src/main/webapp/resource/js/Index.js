/**
 * index.jsp
 * @constructor
 */
const Index = function () {
    this.registerPanel = $("#registerPanel")[0];
    this.loginPanel = $("#loginPanel")[0];
    this.typingArea = $("#typingArea")[0];
    this.btnRegister = $("#btn_register")[0];
    this.btnLoginPanel = $("#btn_loginPanel")[0];
    this.signing = $("#signing")[0];

    this.btnRegister.addEventListener("click", eventUtil.newEventHendleFun(false, this.openPanel, this, this.registerPanel));
    this.btnLoginPanel.addEventListener("click", eventUtil.newEventHendleFun(false, this.openPanel, this, this.loginPanel));

    this.openingPanel = null;

    this.init();
};

Index.prototype.init = function () {
    let isLogined = commonUtil.getState("logined");
    //判断登录状态，替换loginForm
    if(isLogined === true || isLogined === "true"){
        let curUsername = commonUtil.getState("curUsername");
        this.signing.innerHTML = "<p class='navbar-text'>Welcome, " + curUsername + ". <a href='/controller/teamco'>进入系统</a> or " + "<a href='/controller/logout'>注销</a></p>";
    }
    //动态打字脚本
    createTypingText(this.typingArea, "协助团队进行高效工作以及快速响应变化");
    //小电脑及其画面的swiper对象初始化
    new Swiper('.swiper-container-out', {
        direction: 'horizontal'
    });
    new Swiper('.swiper-container-looping', {
        direction: 'horizontal',
        loop: true,
        autoplay: true
    });
};

/**
 * 打开面板
 */
Index.prototype.openPanel = function (panel) {
    //对当前已打开的面板先进行关闭操作，避免事件冲突
    if(this.openingPanel){
        this.openingPanel.style.display = "none";
        $(document).unbind("click");
        this.openingPanel = null;
    }
    if (panel && panel.style.display === "none") {
        //第一次点击该按钮才读取面板的表格内容
        if("string" === typeof panel.innerHTML && panel.innerHTML.length === 0){
            let panelPageName = panel.id.substring(0, panel.id.indexOf("Panel"));
            panel.innerHTML = commonUtil.loadHtml("/" + panelPageName + ".html");
        }
        $(panel).fadeIn();
        this.EventNotFromOpenRegist = false;
        //新增在document对象上的点击事件用于关闭面板
        $(document).click(eventUtil.newEventHendleFun(true, this.closePanel, this, panel));
        this.openingPanel = panel;
    }
};

/**
 * 关闭面板
 * @param event 传入的点击事件用于计算点击位置是否在面板外
 */
Index.prototype.closePanel = function (panel, event) {
    if (panel && panel.style.display !== "none") {
        //点击位置
        const x = event.clientX;
        const y = event.clientY;
        //注册面板的边界
        const l = panel.offsetLeft;
        const t = panel.offsetTop;
        const r = l + panel.offsetWidth;
        const b = t + panel.offsetHeight;
        if (this.EventNotFromOpenRegist === true && !(x > l && x < r && y > t && y < b)) {
            $(panel).fadeOut();
            $(document).unbind("click");
            this.EventNotFromOpenRegist = null;
            return;
        }
        //标记事件是否已经跳过由openRegister传过来的事件
        this.EventNotFromOpenRegist = true;
    }
};


new Index();
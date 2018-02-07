/**
 * index.jsp
 * @constructor
 */
const Index = function () {
    this.registerPanel = $("#registerPanel")[0];
    this.typingArea = $("#typingArea")[0];
    this.btnRegister = $("#btn_register")[0];
    this.init();
};

Index.prototype.init = function () {
    //动态打字脚本
    createTypingText(this.typingArea, "Test test test, ", "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试，测试测试测试测试测试测试测试测试测试测试测试测。试测试测试测试测试测测试测试测试测试测试试测试测试测试测试测试测试！");
    //注册按钮点击事件
    this.btnRegister.addEventListener("click", eventUtil.newEventHendleFun(false, this.openRegister, this));
    //读取小电脑图片
    const desktop = commonUtil.syncLoad("/resource/img/desktop.svg");
    $("#desktop").html(desktop);
    //小电脑及其画面的swiper对象初始化
    this.mySwiper1 = new Swiper('.swiper-container-out', {
        direction: 'horizontal'
    });
    this.mySwiper2 = new Swiper('.swiper-container-looping', {
        direction: 'horizontal',
        mousewheel: {eventsTarged: window},
        loop: true,
        autoplay: true
    });
    //出现滚动条则禁止小电脑画面的滚轮切换事件
    if (document.body.scrollHeight > document.body.clientHeight) {
        this.mySwiper2.mousewheel.disable();
    }
    window.onresize = eventUtil.newEventHendleFun(false, function () {
        if (document.body.scrollHeight > document.body.clientHeight) {
            this.mySwiper2.mousewheel.disable();
        } else {
            this.mySwiper2.mousewheel.enable();
        }
    }, this);
};

/**
 * 打开注册面板
 */
Index.prototype.openRegister = function () {
    if (this.registerPanel && this.registerPanel.style.display === "none") {
        //第一次点击该按钮才读取注册面板的表格内容
        if("string" === typeof this.registerPanel.innerHTML && this.registerPanel.innerHTML.length === 0){
            this.registerPanel.innerHTML = commonUtil.syncLoad("/register.html");
        }
        $(this.registerPanel).fadeIn();
        this.EventNotFromOpenRegist = false;
        //新增在document对象上的点击事件用于关闭注册面板
        $(document).click(eventUtil.newEventHendleFun(true, this.closeRegister, this));
    }
};

/**
 * 关闭注册面板
 * @param event 传入的点击事件用于计算点击位置是否在注册面板外
 */
Index.prototype.closeRegister = function (event) {
    //点击位置
    const x = event.clientX;
    const y = event.clientY;
    //注册面板的边界
    const l = this.registerPanel.offsetLeft;
    const t = this.registerPanel.offsetTop;
    const r = l + this.registerPanel.offsetWidth;
    const b = t + this.registerPanel.offsetHeight;
    if (this.EventNotFromOpenRegist === true && !(x > l && x < r && y > t && y < b)) {
        $(this.registerPanel).fadeOut();
        $(document).unbind("click");
        this.EventNotFromOpenRegist = null;
        return;
    }
    //标记事件是否已经跳过由openRegister传过来的事件
    this.EventNotFromOpenRegist = true;
};
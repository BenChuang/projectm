var Index = function(registerPanel){
    this.registerPanel = registerPanel;
};

/*

 */
Index.prototype.openRegister = function() {
    if (this.registerPanel.style.display === "none") {
        if("string" === typeof this.registerPanel.innerHTML && this.registerPanel.innerHTML.length === 0){
            this.registerPanel.innerHTML = $.ajax({url: "/register.html", async: false}).responseText;
        }
        $(this.registerPanel).fadeIn();
        $(document).click(eventUtil.newEventHendleFun(true, this.closeRegister, this));
    }
    this.isEventFromOpenRegist = false;
};

/*

 */
Index.prototype.closeRegister = function (event) {
    var x = event.clientX;
    var y = event.clientY;
    var l = this.registerPanel.offsetLeft;
    var t = this.registerPanel.offsetTop;
    var r = l + this.registerPanel.offsetWidth;
    var b = t + this.registerPanel.offsetHeight;
    if (this.isEventFromOpenRegist === true && !(x > l && x < r && y > t && y < b)) {
        $(this.registerPanel).fadeOut();
        $(document).unbind("click");
        this.isEventFromOpenRegist = null;
        return;
    }
    this.isEventFromOpenRegist = true;
};
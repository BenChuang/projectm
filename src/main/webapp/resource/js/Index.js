var Index = function(registerPanel){
    this.registerPanel = registerPanel;
};

/*

 */
Index.prototype.openRegister = function() {
    if (this.registerPanel.style.display === "none") {
        if("string" === typeof(this.registerPanel.innerHTML) && this.registerPanel.innerHTML.length === 0){
            this.registerPanel.innerHTML = $.ajax({url: "/register.html", async: false}).responseText;
        }
        $(this.registerPanel).fadeIn();
        $(document).click(function(event){Index.closeRegister.call(Index, event)});
    }
    isEventFromOpenRegist = false;
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
    if (isEventFromOpenRegist === true && !(x > l && x < r && y > t && y < b)) {
        $(this.registerPanel).fadeOut();
        $(document).unbind("click");
        isEventFromOpenRegist = null;
        return;
    }
    isEventFromOpenRegist = true;
};
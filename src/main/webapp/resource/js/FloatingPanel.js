const FloatingPanel = function () {
    // this.frameHead = frame.frameHead || {};
    // this.container = frame.container || {};
    // this.btnClose = frame.btnClose || {};
    // this.title = frame.title || {};

    let outterBlock = document.createElement("DIV");
    this.outterBlock = outterBlock;
    outterBlock.id = "outter_block";
    outterBlock.className = "outter-block-hidden";
    let backdrop = document.createElement("DIV");
    backdrop.id = "backdrop";
    backdrop.className = "backdrop-hidden";
    this.backdrop = backdrop;
    let floatingBlock = document.createElement("DIV");
    this.floatingBlock = floatingBlock;
    floatingBlock.id = "floating_block";
    floatingBlock.className = "floating-block-hiiden";
    this.floatingBlock = floatingBlock;
    outterBlock.appendChild(backdrop);
    outterBlock.appendChild(floatingBlock);
    this.outterBlock = outterBlock;

    this.init();
};


FloatingPanel.prototype.init = function () {
    document.body.appendChild(this.outterBlock);
};

FloatingPanel.prototype.styleWindow = function(content){
    let frameHead = document.createElement("DIV");
    frameHead.style = "border-bottom: 2px solid #545454; padding-bottom: 40px";
    let titleSide = document.createElement("DIV");
    titleSide.style = "position: absolute; left: 0; right: 40px; height: 40px; background-color: #545454; border-top-left-radius: 0px;";
    let title = document.createElement("H2");
    title.style = "margin: 3px 8px; color: #ffffff;";
    this.title = title;
    titleSide.appendChild(title);
    let btnCloseSide = document.createElement("DIV");
    btnCloseSide.style = "position: absolute; right: 0; width: 40px; height: 40px; background-color: #ff7677; border-left: 2px solid #545454; border-top-right-radius: 0px;";
    let btnClose = document.createElement("A");
    btnClose.innerHTML = '<h3 style="margin: 8px; color: #545454"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></h3>';
    btnCloseSide.appendChild(btnClose);
    this.btnClose = btnClose;
    frameHead.appendChild(titleSide);
    frameHead.appendChild(btnCloseSide);
    this.frameHead = frameHead;
    this.container = content.container;
    this.floatingBlock.appendChild(this.frameHead);
    this.floatingBlock.appendChild(this.container);
    this.btnClose.addEventListener("click", eventUtil.newEventHendleFun(false, this.close, this));
};

FloatingPanel.prototype.open = function(){

    this.setPanelVisible(true);
};

FloatingPanel.prototype.close = function () {
    this.setPanelVisible(false);
};



FloatingPanel.prototype.setPanelVisible = function(state){
    if(state === true || state === undefined){
        this.outterBlock.className = "outter-block";
        this.backdrop.className = "backdrop";
        this.floatingBlock.className = "floating-block";
    } else if (state === false){
        this.outterBlock.className = "outter-block-hidden";
        this.backdrop.className = "backdrop-hidden";
        this.floatingBlock.className = "floating-block-hidden";
    }
};

FloatingPanel.prototype.setTitle = function (title) {
    this.title.textContent = title;
};

FloatingPanel.prototype.setWidthAndHeight = function (width, height) {
    if(width) {
        this.floatingBlock.style.width = width;
    }
    if(height) {
        this.floatingBlock.style.height = height;
    }
};


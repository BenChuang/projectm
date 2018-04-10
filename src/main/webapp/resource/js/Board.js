const Board = function () {
    this.boardArea = $("#board_area")[0];
    this.head = $("#head")[0];
    this.init();
};

Board.prototype.init = function () {
};


Board.prototype.clean = function () {
    this.boardArea.innerHTML = "";
    if(this.controlBtn) {
        this.controlBtn.childNodes[0].className = "glyphicon glyphicon-option-horizontal";
        delete this.controlBtn;
    }
    delete this.boardName;
    let fireOffDiv = document.getElementById("fire_off");
    if(fireOffDiv){
        fireOffDiv.parentNode.removeChild(fireOffDiv);
    }
    $(".outter-block-hidden").remove();
    $(".outter-block").remove();


};

Board.prototype.initBoardFromBtn = function (controlBtn) {
    this.clean();
    this.controlBtn = controlBtn;
    this.controlBtn.childNodes[0].className = "glyphicon glyphicon-ok";
    this.boardName = this.controlBtn.childNodes[0].textContent.trim();
    this.head.textContent = this.boardName;
    this.contentInstance = eval( "new " + commonUtil.buildBtnName(this.controlBtn) + "(this);" );
};

Board.prototype.initBoardWithName = function (className, title, params) {
    this.clean();
    let paramsString = "";
    for(let key in params)
        paramsString += "params[" + key + "],";
    let length = paramsString.length;
    if(length > 0)
        paramsString = paramsString.substr(0, length -1);
    this.head.textContent = title;
    this.contentInstance = eval( "new " + className + "(" + paramsString + ");" );
};

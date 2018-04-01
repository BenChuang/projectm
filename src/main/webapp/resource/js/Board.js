const Board = function () {
    this.boardArea = $("#board_area")[0];
    this.init();
};

Board.prototype.init = function () {
};


Board.prototype.clean = function () {
    this.boardArea.innerHTML = "";
    delete this.controlBtn;
    delete this.boardName;
};

Board.prototype.initBoardFromBtn = function (controlBtn) {
    this.clean();
    this.controlBtn = controlBtn;
    this.boardName = this.controlBtn.childNodes[0].textContent.trim();
    eval( "new " + commonUtil.buildBtnName(this.controlBtn) + "(this);" );
};

Board.prototype.initBoardWithName = function (className, boardName, params) {
    this.clean();
    this.boardName = boardName;
    let paramsString = "";
    for(let key in params)
        paramsString += "params[" + key + "],";
    let length = paramsString.length;
    if(length > 0)
        paramsString = paramsString.substr(0, length -1);
    eval( "new " + className + "(" + paramsString + ");" );
};

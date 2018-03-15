const Board = function (btn) {
    this.controlBtn = btn;
    this.boardName = btn.childNodes[0].textContent.trim();
    this.boardArea = $("#board_area")[0];
    this.init();
};

Board.prototype.init = function () {
    eval( "new " + commonUtil.buildBtnName(this.controlBtn) + "(this.boardArea);" );
};


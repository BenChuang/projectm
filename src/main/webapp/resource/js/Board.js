const Board = function (btn) {
    this.controlBtn = btn;
    this.boardName = btn.childNodes[0].textContent.trim();
    this.init();
};

Board.prototype.init = function () {

};

Board.prototype.createBoard = function(boardName){

};
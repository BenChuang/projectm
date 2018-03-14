const Completed = function (btn) {
    this.controlBtn = btn;
    this.boardName = btn.childNodes[0].textContent.trim();
    this.init();
};

Completed.prototype.init = function () {
};
const Timeflow = function (btn) {
    this.controlBtn = btn;
    this.boardName = btn.childNodes[0].textContent.trim();
    this.init();
};

Timeflow.prototype.init = function () {
};
const Running = function (btn) {
    this.controlBtn = btn;
    this.boardName = btn.childNodes[0].textContent.trim();
    this.init();
};

Running.prototype.init = function () {
};
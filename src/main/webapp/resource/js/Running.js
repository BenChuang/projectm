const Running = function (boardArea) {
    this.boardArea = boardArea;
    this.btnCloseCreateNewProject = $("#btn_close_creat_new_project")[0];
    this.createNewProjectPanel = $("#creat_new_project")[0];
    this.backdrop = $("#backdrop")[0];
    this.floatingBlock = $("#floating_block")[0];

    this.btnCloseCreateNewProject.addEventListener("click", eventUtil.newEventHendleFun(false, this.closeCreateNewProject, this));
    this.init();
};

Running.prototype.init = function () {
    this.boardArea.innerHTML = "";
    this.addProjectBlocks();
};

Running.prototype.addNewProjectBlock = function () {
    let a = document.createElement("A");
    let buff = [];
    buff.push('<div class="project-block">');
    buff.push('    <h1 style="margin: 30px 0 0 0">');
    buff.push('        <span class="glyphicon glyphicon-plus" aria-hidden="true">');
    buff.push('        </span>');
    buff.push('    </h1>');
    buff.push('    <h3 style="margin: 0 0 20px 0;">创建新项目</h3>');
    buff.push('</div>');
    a.innerHTML = buff.join('');
    a.addEventListener("click", eventUtil.newEventHendleFun(false, this.createNewProject, this));
    this.boardArea.appendChild(a);
};

Running.prototype.addProjectBlocks = function(){


    this.addNewProjectBlock();
};

Running.prototype.addProjectBlock = function () {

};

Running.prototype.createNewProject = function () {

    this.setCreateNewProjectShow(true);
};

Running.prototype.closeCreateNewProject = function () {
    this.setCreateNewProjectShow(false);
};

Running.prototype.setCreateNewProjectShow = function (state) {
    if(state === true || state === undefined){
        this.createNewProjectPanel.className = "outter-block";
        this.backdrop.className = "backdrop";
        this.floatingBlock.className = "floating-block";
    } else if (state === false){
        this.createNewProjectPanel.className = "outter-block-hidden";
        this.backdrop.className = "backdrop-hidden";
        this.floatingBlock.className = "floating-block-hidden";
    }
};
const Running = function (boardArea) {
    this.boardArea = boardArea;
    // this.btnCloseCreateNewProject = $("#btn_close_create_new_project")[0];
    // this.createNewProjectPanel = $("#creat_new_project")[0];
    // this.backdrop = $("#backdrop")[0];
    // this.floatingBlock = $("#floating_block")[0];
    this.btnCreateNewProject = undefined;
    this.floatingPanelOfCreateNewProject = undefined;
    this.createNewProjectPanel = undefined;
    // this.btnCloseCreateNewProject.addEventListener("click", eventUtil.newEventHendleFun(false, this.closeCreateNewProject2, this));
    this.init();

};

Running.prototype.init = function () {
    this.boardArea.innerHTML = "";
    this.addProjectBlocks();
};

Running.prototype.addNewProjectBlock = function () {
    if(this.btnCreateNewProject === undefined){
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
        a.id = "btn_create_new_project";
        this.boardArea.appendChild(a);
        this.btnCreateNewProject = a;
        this.btnCreateNewProject.addEventListener("click", eventUtil.newEventHendleFun(false, this.createNewProject, this));
    }
};

Running.prototype.addProjectBlocks = function(){


    this.addNewProjectBlock();
};

Running.prototype.addProjectBlock = function () {
    // let a = document.createElement("A");
    // let buff = [];
    // buff.push('<div class="project-block">');
    // buff.push('    <h1 style="margin: 30px 0 0 0">');
    // buff.push('        <span class="glyphicon glyphicon-plus" aria-hidden="true">');
    // buff.push('        </span>');
    // buff.push('    </h1>');
    // buff.push('    <h3 style="margin: 0 0 20px 0;">创建新项目</h3>');
    // buff.push('</div>');
    // a.innerHTML = buff.join('');
    // a.id = "btn_create_new_project";
    // this.boardArea.appendChild(a);
};

Running.prototype.createNewProject = function () {
    if(this.createNewProjectPanel === undefined){
        this.createNewProjectPanel = new FloatingPanel();
        this.createNewProjectPanel.styleWindow(new CreateNewProj(this));
        this.createNewProjectPanel.setTitle("创建新项目");
    }

    this.createNewProjectPanel.open();
};




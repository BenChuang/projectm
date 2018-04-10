const Running = function (board) {
    this.board = board;
    this.boardArea = this.board.boardArea;
    this.boardArea.style.flexWrap = "wrap";
    this.boardArea.style.display = "flex";
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
    this.addProjectBlocks();
};

Running.prototype.addNewProjectBlock = function () {
    if(this.btnCreateNewProject === undefined){
        let a = document.createElement("A");
        a.className = "project-a";
        let buff = [];
        buff.push('<div class="project-block">');
        buff.push('    <div style="display: flex; height: 65px">');
        buff.push('        <h1 style="margin: auto auto 0 auto">');
        buff.push('             <span class="glyphicon glyphicon-plus" aria-hidden="true">');
        buff.push('             </span>');
        buff.push('        </h1>');
        buff.push('    </div>');
        buff.push('    <div style="display: flex; height: 75px">');
        buff.push('         <h3 style="margin: 0 auto auto auto;">创建新项目</h3>');
        buff.push('    </div>');
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
    let ret = commonUtil.runService("projectService", "findAllProjectIdByUserId", [commonUtil.getState("curUserId")]);
    if(ret && ret !== "null"){
        let projectIds = eval(ret);
        projectIds.forEach(id => this.addProjectBlock(id));
    }
};

Running.prototype.addProjectBlock = function (projectId) {
    let ret = commonUtil.runService("projectService", "findProjectStringById", [projectId], ret => {
        if(ret && ret !== "null"){
            let project = eval("(" + ret + ")");
            let a = document.createElement("A");
            a.className = "project-a";
            let buff = [];
            buff.push('<div class="project-block" style="background-image: url(https://mailimg.teambition.com/logos/cover-demo.jpg); background-repeat: no-repeat; background-size: cover; background-position: 50%"); ">');
            //项目标题字体大小岁字数改变
            if(getByteLength(project.projectName) > 23)
                buff.push('    <div style="display: flex; text-shadow: 0 1px 1px rgba(0,0,0,.35); height: 45px"><h1 style="font-size: small; color: #ffffff; margin: auto;"><b>');
            else if(getByteLength(project.projectName) > 20)
                buff.push('    <div style="display: flex; text-shadow: 0 1px 1px rgba(0,0,0,.35); height: 45px"><h1 style="font-size: medium; color: #ffffff; margin: auto;"><b>');
            else if(getByteLength(project.projectName) > 16)
                buff.push('    <div style="display: flex; text-shadow: 0 1px 1px rgba(0,0,0,.35); height: 45px"><h1 style="font-size: large; color: #ffffff; margin: auto;"><b>');
            else
                buff.push('    <div style="display: flex; text-shadow: 0 1px 1px rgba(0,0,0,.35); height: 45px"><h1 style="font-size: x-large; color: #ffffff; margin: auto;"><b>');
            buff.push(project.projectName);
            buff.push('    </b></h1></div>');
            buff.push('    <div style="height: 75px"> <h5 style="text-shadow: 0 1px 1px rgba(0,0,0,.35); color: #ffffff; margin: 0 16px;">' + project.projectIntro + '</h5></div>');
            buff.push('    <div style="height: 20px"> <h5 style="margin: 0 6px; text-align: right"><small>' + project.createTime.substring(0, 10) + '</small></h5></div>');
            buff.push('</div>');
            a.innerHTML = buff.join('');
            a.addEventListener("click", eventUtil.newEventHendleFun(false, this.openProject, this, project.id, project.projectName));
            this.boardArea.insertBefore(a, this.btnCreateNewProject);
        }
    });


};

Running.prototype.createNewProject = function () {
    if(this.createNewProjectPanel === undefined){
        this.createNewProjectPanel = new FloatingPanel();
        this.createNewProjectPanel.styleWindow(new CreateNewProj(this));
        this.createNewProjectPanel.setTitle("创建新项目");
    }

    this.createNewProjectPanel.open();
};


Running.prototype.openProject = function (projectId, projectName) {
    this.boardArea.innerHTML = "";
    this.boardArea.style.flexWrap = "";
    this.boardArea.style.display = "-webkit-box";
    this.board.initBoardWithName("Project", projectName, [projectId, this.board]);
};





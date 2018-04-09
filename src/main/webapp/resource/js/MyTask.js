const MyTask = function (board) {
    this.board = board;
    this.boardArea = this.board.boardArea;
    this.boardArea.style.flexWrap = "";
    this.boardArea.style.display = "";


    this.init();
};

MyTask.prototype.init = function () {
    this.initProjectList();
};

MyTask.prototype.initProjectList = function () {
    let ret = commonUtil.runService("projectService", "findAllProjectIdByUserId", [commonUtil.getState("curUserId")]);
    if(ret && ret !== "null"){
        let projectIds = eval(ret);
        projectIds.forEach(id => {
            commonUtil.runService("projectService", "findProjectStringById", [id], ret => {
                let project = eval( "(" + ret + ")");
                this.addProjectItem(project.id, project.projectName);
            });
        });
    }
};

MyTask.prototype.addProjectItem = function (projectId, projectName) {
    let projectArea = document.createElement("DIV");
    projectArea.className = "col-xs-12";
    projectArea.style = "margin: 10px 0";
    this.boardArea.appendChild(projectArea);
    projectArea.innerHTML =
        '<div class="col-xs-12">' +
        '   <a role="button" data-toggle="collapse" href="#collapseProject' + projectId + '" aria-expanded="false" aria-controls="collapseProject' + projectId + '">' +
            projectName +
        '       <span class="glyphicon glyphicon-collapse-down"></span> ' +
        '   </a>\n' +
        '</div>' +
        '<div class="collapse col-xs-12" id="collapseProject' + projectId + '">\n' +
        '  <div id="project_block_' + projectId + '" class="well" style="background-color: unset; border: 0; border-radius: 0; box-shadow: none; display: -webkit-box; overflow-x: scroll">\n' +
        '获取中，请稍后...' +
        '  </div>\n' +
        '</div>';
    let projectBlock = document.getElementById("project_block_" + projectId);
    commonUtil.runService("projectService", "findAllStateToProject", projectId, ret => {
        let allState = eval("(" + ret + ")");
        projectBlock.innerHTML = "";
        for(let i = 0; i < allState.length; i++){
            allState[i].nextState = allState[i].nextState || {};
            allState[i].nextState = allState[i + 1];
            this.addStateBlock(projectBlock, allState[i]);
        }
    });
};


MyTask.prototype.addStateBlock = function (projectBlock, state) {

    let stateId = state.id;
    let stateName = state.stateName;
    let stateBlock = document.createElement("DIV");
    stateBlock.className = "jumbotron state-block";
    let stateHeader = document.createElement("H3");
    stateHeader.textContent = stateName;
    let hr = document.createElement("HR");
    let taskList = document.createElement("DIV");
    taskList.className = "task-list";
    stateBlock.appendChild(stateHeader);
    stateBlock.appendChild(hr);
    stateBlock.appendChild(taskList);
    projectBlock.appendChild(stateBlock);
    state.taskList = taskList;

    let curUserId = commonUtil.getState("curUserId");
    commonUtil.runService("projectService", "findAllTaskIdByStateIdAndTaskFor", [state.stateId, curUserId], ret => {
        if(ret !== undefined && ret !== "null") {
            let allTaskId = eval(ret);
            for(let taskId of allTaskId){
                commonUtil.runService("projectService", "findTaskStringById", taskId, ret => {
                    if(ret !== undefined && ret !== "null") {
                        let task = eval("(" + ret + ")");
                        if(task.priorityLevel < 4){
                            state.tasks = state.tasks || [];
                            state.tasks.push(task);
                            task.state = state;
                            this.addTaskBlock(taskList ,task);
                        }
                    }
                });
            }
        }
    });
};

MyTask.prototype.addTaskBlock = function (taskListArea, task) {
    if(taskListArea) {
        let taskTitle = task.taskTitle;
        let deadline = task.deadline;
        let priorityLevel = task.priorityLevel;
        let taskBlock = document.createElement("DIV");
        taskBlock.className = "task-block";
        taskBlock.style.flexFlow = "row";
        taskBlock.innerHTML =
            '<div style="display: flex; flex-flow: column; margin: 0 auto 0 0;">' +
            '   <h4 style="margin: 16px auto 4px 40px">' +
            taskTitle +
            '   </h4>' +
            '   <div style="margin: auto">' +
            '   </div>' +
            '   <div style="margin: 4px auto 4px 40px">' +
            '       <h5><small>Deadline: ' + deadline + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-user"></span><a> 未分配</a>' +
            '       </small></h5>' +
            '   </div>' +
            '</div>';
        let forwardDiv = document.createElement("DIV");
        forwardDiv.style = "display: flex;";
        let forwardA = document.createElement("A");
        forwardA.style = "margin: auto";
        forwardA.innerHTML = '<span class="glyphicon glyphicon-chevron-right"></span>';
        forwardA.addEventListener("click", eventUtil.newEventHendleFun(false, this.forwardTask, this, task));
        forwardDiv.appendChild(forwardA);
        taskBlock.appendChild(forwardDiv);
        taskListArea.appendChild(taskBlock);
        task.taskBlock = taskBlock;
        this.changeTaskPriority(taskBlock, priorityLevel);
    }
};

MyTask.prototype.forwardTask = function (task) {
    commonUtil.runService("projectService", "forwardTask", task.id, ret => {
        task.taskBlock.parentNode.removeChild(task.taskBlock);
        this.addTaskBlock(task.state.nextState.taskList, task);
        task.state = task.state.nextState;
    });
debugger;
};

MyTask.prototype.changeTaskPriority = function (taskBlock, leval) {
    switch (leval) {
        case 1:
            taskBlock.style.borderColor = "green";
            taskBlock.priorityLevel = 1;
            break;
        case 2:
            taskBlock.style.borderColor = "orange";
            taskBlock.priorityLevel = 2;
            break;
        case 3:
            taskBlock.style.borderColor = "red";
            taskBlock.priorityLevel = 3;
            break;
        default:
            taskBlock.style.borderColor = "gray";
            taskBlock.priorityLevel = 0;
            break;
    }
};
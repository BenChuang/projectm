const Project = function (projectId, board) {
    this.board = board;
    this.boardArea = this.board.boardArea;
    this.projectId = projectId;
    this.init();


};

Project.prototype.init = function () {
    let allStateString = commonUtil.runService("projectService", "findAllStateToProject", this.projectId);
    let allStates = eval(allStateString);
    if("Array" === allStates.constructor.name){
        this.allStates = allStates;
        for(let state of this.allStates){
            this.createStateBlock(state);
        }
    }
};


Project.prototype.createStateBlock = function (state) {
    let stateId = state.id;
    let stateName = state.stateName;
    let stateBlock = document.createElement("DIV");
    stateBlock.className = "jumbotron state-block";
    let stateHeader = document.createElement("H3");
    stateHeader.textContent = stateName;
    let hr = document.createElement("HR");
    let taskList = document.createElement("DIV");
    taskList.className = "task-list";
    let a = document.createElement("A");
    let h5 = document.createElement("H5");
    h5.textContent = "添加新任务+";
    a.appendChild(h5);
    stateBlock.appendChild(stateHeader);
    stateBlock.appendChild(hr);
    stateBlock.appendChild(taskList);
    stateBlock.appendChild(a);
    state.taskListArea = taskList;
    a.addEventListener("click", eventUtil.newEventHendleFun(false, this.newTaskBlock, this, state));
    this.boardArea.appendChild(stateBlock);
};

Project.prototype.newTaskBlock = function (state) {
    taskListArea = state.taskListArea;
    let taskBlock = document.createElement("DIV");
    taskBlock.className = "task-block";

    let taskTitle = document.createElement("DIV");
    taskTitle.style.display = "flex";
    let taskTitleInput = document.createElement("INPUT");
    taskTitleInput.className = "title-input";
    taskTitleInput.placeholder = "任务标题";
    let tick = document.createElement("SPAN");
    tick.className = "glyphicon glyphicon-ok";
    tick.style.margin = "auto";
    tick.style.cursor = "hand";
    tick.addEventListener("click", eventUtil.newEventHendleFun(false, this.newTask, this, taskBlock, state));
    let x = document.createElement("SPAN");
    x.className = "glyphicon glyphicon-remove";
    x.style.margin = "auto auto auto 0";
    x.style.cursor = "hand";
    x.addEventListener("click", () => taskListArea.removeChild(taskBlock));
    taskTitle.appendChild(taskTitleInput);
    taskTitle.appendChild(tick);
    taskTitle.appendChild(x);
    taskBlock.appendChild(taskTitle);

    let taskDeadLine = document.createElement("DIV");
    taskDeadLine.style.display = "flex";
    let taskDeadLineInput = document.createElement("INPUT");
    taskDeadLineInput.type = "date";
    taskDeadLineInput.className = "deadline-input";
    taskDeadLine.appendChild(taskDeadLineInput);
    taskBlock.appendChild(taskDeadLine);

    let flexDiv = document.createElement("DIV");
    flexDiv.style = "display: flex; flex-flow: row-reverse; margin: auto 4px 4px 0";
    let colorBtns = [];
    for(let i = 0; i < 4; i++){
        let colorSelector = document.createElement("DIV");
        colorSelector.className = "thumbnail";
        colorSelector.style = "width: 14px; height: 14px; margin: 0; border-radius: 25px; display: inline-block;";
        colorBtns.push(colorSelector);
        colorSelector.addEventListener("mouseenter", eventUtil.newEventHendleFun(false, this.changeTaskPriority, this, taskBlock, i));
        flexDiv.appendChild(colorSelector);
    }
    colorBtns[0].style.backgroundColor = "gray";
    colorBtns[1].style.backgroundColor = "green";
    colorBtns[2].style.backgroundColor = "orange";
    colorBtns[3].style.backgroundColor = "red";
    taskBlock.appendChild(flexDiv);
    taskListArea.appendChild(taskBlock);
    taskBlock.taskTitleInput = taskTitleInput;
    taskBlock.taskDeadLineInput = taskDeadLineInput;
    taskBlock.priorityLevel = 0;
    taskTitle.focus();
};

Project.prototype.newTask = function (taskBlock, state) {
    let title = taskBlock.taskTitleInput.value;
    let deadline = taskBlock.taskDeadLineInput.value;
    let priorityLeval = taskBlock.priorityLevel;
    let ret = $.ajax({
        url: "/controller/newTask",
        data: {
            taskTitle: title,
            deadline: deadline,
            priorityLeval: priorityLeval,
            stateId: state.stateId
        },
        error: () => alert("error in creating task."),
        success: ret => {
            if(ret){
                debugger
                let task = eval("(" + ret + ")");
                state.tasks = state.tasks || [];
                state.tasks.push(task);
                taskBlock.style.flexFlow = "row";
                taskBlock.innerHTML =
                    '<div style="display: flex; flex-flow: column; margin: 0 auto 0 0;">' +
                    '   <h4 style="margin: 16px auto 4px 40px">' +
                    title +
                    '   </h4>' +
                    '   <div style="margin: auto">' +
                    '   </div>' +
                    '   <div style="margin: 4px auto 4px 40px">' +
                    '       <h5><small>Deadline: ' + deadline +  '&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-user"></span><a> 未分配</a>' +
                    '       </small></h5>' +
                    '   </div>' +
                    '</div>';
                let forwardDiv = document.createElement("DIV");
                forwardDiv.style = "display: flex;";
                let forwardA = document.createElement("A");
                forwardA.style = "margin: auto 0";
                forwardA.innerHTML = '<span class="glyphicon glyphicon-remove"></span>';
                forwardA.addEventListener("click", eventUtil.newEventHendleFun(false, this.removeTask, this))
                forwardDiv.appendChild(forwardA);
                taskBlock.appendChild(forwardDiv);
            }
        }
        // async: false
    });




};


Project.prototype.removeTask = function () {
    debugger;
};

Project.prototype.changeTaskPriority = function (taskBlock, leval) {
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
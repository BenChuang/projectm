const Project = function (projectId, board) {
    this.board = board;
    this.boardArea = this.board.boardArea;
    this.projectId = projectId;
    this.init();


};

Project.prototype.init = function () {
    commonUtil.runService("projectService", "findAllStateToProject", this.projectId, ret => {
        let allStates = eval(ret);
        if ("Array" === allStates.constructor.name) {
            this.allStates = allStates;
            for (let state of this.allStates) {
                this.createStateBlock(state);

            }
        }
    });


    //燃尽图
    commonUtil.runService("projectService", "findAllTaskByProjectId", this.projectId, ret => {
        let tasks = eval(ret);
        let data = [];
        let dateMapValue = new Map();
        for (let task of tasks) {
            let date = new Date(task.createTime);
            let dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");
            if(dateMapValue.has(dateString)){
                let pre = dateMapValue.get(dateString);
                dateMapValue.set(dateString, pre + 1);
            } else dateMapValue.set(dateString, 1);
            if(task.priorityLevel === 4){
                let date = new Date(task.finishedTime);
                let dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");
                if(dateMapValue.has(dateString)){
                    let pre = dateMapValue.get(dateString);
                    dateMapValue.set(dateString, pre - 1);
                } else dateMapValue.set(dateString, -1);
            }
        }
        const dateLessThen = (x, y) => {
            if(x !== undefined && y !== undefined) {
                let splitX = x.split("/");
                let splitY = y.split("/");
                let yearX = parseInt(splitX[0]);
                let yearY = parseInt(splitY[0]);
                let monthX = parseInt(splitX[1]);
                let monthY = parseInt(splitY[1]);
                let dayX = parseInt(splitX[2]);
                let dayY = parseInt(splitY[2]);
                if (yearX < yearY)
                    return true;
                else if (yearX === yearY) {
                    if (monthX < monthY)
                        return true;
                    else if (monthX === monthY) {
                        return dayX < dayY;
                    } else
                        return false;
                } else
                    return false;
            }
        };
        let y = 0;
        for(let i = 0; dateMapValue.size; i++) {
            let min;
            dateMapValue.forEach(((value, key) => {
                if(dateLessThen(key, min) || min === undefined) {
                    min = key;
                }
            }));
            if(min !== undefined) {
                y += dateMapValue.get(min);
                data.push([min, y]);
                dateMapValue.delete(min);
            }
        }
        let option = {
            xAxis: {
                type: 'time'
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data,
                type: 'line',
                areaStyle: {}
            }],
            axisPointer: {
                show: true,
                type: 'line',
                snap: true
            }
        };
        let fireOffDiv = document.getElementById("fire_off");
        if(fireOffDiv === null || fireOffDiv === undefined){
            fireOffDiv = document.createElement("DIV");
            fireOffDiv.id = "fire_off";
            fireOffDiv.className = "col-xs-12";
            fireOffDiv.style.height = "600px";
            this.boardArea.parentNode.appendChild(fireOffDiv);
        }
        let myChart = echarts.init(fireOffDiv);
        myChart.setOption(option);

    });
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

    commonUtil.runService("projectService", "findAllTaskIdByStateId", state.stateId, ret => {
        if(ret !== undefined && ret !== "null") {
            let allTaskId = eval(ret);
            for(let taskId of allTaskId){
                commonUtil.runService("projectService", "findTaskStringById", taskId, ret => {
                    if(ret !== undefined && ret !== "null") {
                        let task = eval("(" + ret + ")");
                        if(task.priorityLevel < 4)
                            this.addTaskBlock(task, state);
                    }
                });
            }
        }
    });

};

Project.prototype.newTaskBlock = function (state) {
    let taskListArea = state.taskListArea;
    let taskBlock = document.createElement("DIV");
    taskBlock.className = "task-block";

    let taskTitle = document.createElement("DIV");
    taskTitle.style.display = "flex";
    let taskTitleInput = document.createElement("INPUT");
    taskTitleInput.className = "title-input";
    taskTitleInput.placeholder = "任务标题";
    let tickA = document.createElement("A");
    tickA.style.margin = "auto";
    let tick = document.createElement("SPAN");
    tick.className = "glyphicon glyphicon-ok";
    tickA.appendChild(tick);
    tickA.addEventListener("click", eventUtil.newEventHendleFun(false, this.newTask, this, taskBlock, state));
    let xA = document.createElement("A");
    xA.style.margin = "auto auto auto 0";
    let x = document.createElement("SPAN");
    x.className = "glyphicon glyphicon-remove";
    xA.appendChild(x);
    xA.addEventListener("click", () => taskListArea.removeChild(taskBlock));
    taskTitle.appendChild(taskTitleInput);
    taskTitle.appendChild(tickA);
    taskTitle.appendChild(xA);
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
    let priorityLevel = taskBlock.priorityLevel;
    let ret = $.ajax({
        url: "/controller/newTask",
        data: {
            taskTitle: title,
            deadline: deadline,
            priorityLevel: priorityLevel,
            stateId: state.stateId
        },
        error: () => alert("error in creating task."),
        success: ret => {
            if(ret){
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
                let removeDiv = document.createElement("DIV");
                removeDiv.style = "display: flex;";
                let removeA = document.createElement("A");
                removeA.style = "margin: 2px 2px auto 2px";
                removeA.innerHTML = '<span class="glyphicon glyphicon-remove"></span>';
                removeA.addEventListener("click", eventUtil.newEventHendleFun(false, this.removeTask, this, task.id, taskBlock));
                removeDiv.appendChild(removeA);
                taskBlock.appendChild(removeDiv);
            }
        }
        // async: false
    });




};

Project.prototype.addTaskBlock = function (task, state) {
    let taskListArea = state.taskListArea;
    state.tasks = state.tasks || [];
    state.tasks.push(task);
    let taskTitle = task.taskTitle;
    let deadline = task.deadline;
    let priorityLevel = task.priorityLevel;
    let stateId = state.id;
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
        '       <h5><small>Deadline: ' + deadline +  '&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-user"></span><a> 未分配</a>' +
        '       </small></h5>' +
        '   </div>' +
        '</div>';
    let offerA = taskBlock.getElementsByTagName("A");
    debugger
    let removeDiv = document.createElement("DIV");
    removeDiv.style = "display: flex;";
    let removeA = document.createElement("A");
    removeA.style = "margin: 2px 2px auto 2px";
    removeA.innerHTML = '<span class="glyphicon glyphicon-remove"></span>';
    removeA.addEventListener("click", eventUtil.newEventHendleFun(false, this.removeTask, this, task.id, taskBlock));
    removeDiv.appendChild(removeA);
    taskBlock.appendChild(removeDiv);
    taskListArea.appendChild(taskBlock);
    this.changeTaskPriority(taskBlock, priorityLevel);
};

Project.prototype.removeTask = function (taskId, taskBlock) {
    let sure = confirm("确定删除该任务？");
    if(sure === true)
        commonUtil.runService("projectService", "removeTask", taskId, () => taskBlock.parentNode.removeChild(taskBlock));
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
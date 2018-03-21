const CreateNewProj = function (instanceOfRunning) {
    let container = document.createElement("DIV");
    container.className = "container-fluid";
    container.innerHTML = commonUtil.loadHtml("/createNewProj.html");
    this.instanceOfRunning = instanceOfRunning;
    this.stateFlow = [];
    this.teammate = [];
    this.container = container;
    this.projectStateFlow = this.container.getElementsByClassName("nav-pills")[0];
    this.btnCreate = this.container.getElementsByClassName("btn-create")[0];
    this.btnDeleteStateItem = this.projectStateFlow.firstElementChild;
    this.btnAddStateItem = this.projectStateFlow.lastElementChild;
    this.addTeammateBar = this.container.getElementsByClassName("thumbnail-last")[0];
    this.btnEditTeammate = this.addTeammateBar.getElementsByTagName("A")[0];
    this.areaEditTeammate = this.addTeammateBar.getElementsByTagName("DIV")[0];
    this.inputProjectName = this.container.getElementsByClassName("input-project-name")[0];
    this.inputProjectIntro = this.container.getElementsByClassName("input-project-intro")[0];
    this.inputAddTeammate = this.addTeammateBar.getElementsByTagName("INPUT")[0];
    this.btnAddTeammate = this.addTeammateBar.getElementsByTagName("BUTTON")[0];
    this.btnCloseEditTeammate = this.addTeammateBar.getElementsByTagName("BUTTON")[1];
    this.teammatePanel = this.container.getElementsByClassName("teammate-panel")[0];

    this.btnCreate.addEventListener("click", eventUtil.newEventHendleFun(false, this.addNewProject, this));
    this.btnAddTeammate.addEventListener("click", eventUtil.newEventHendleFun(false, this.addTeammate, this));
    this.btnCloseEditTeammate.addEventListener("click", eventUtil.newEventHendleFun(true, this.closeEditAddTeammate, this));
    this.btnEditTeammate.addEventListener("click", eventUtil.newEventHendleFun(false, this.editAddTeammate, this));
    this.btnAddStateItem.addEventListener("click", eventUtil.newEventHendleFun(false, this.addStateItem, this, "新状态"));
    this.btnDeleteStateItem.addEventListener("click", eventUtil.newEventHendleFun(false, this.deleteStateItem, this));

    this.init();
};

CreateNewProj.prototype.init = function () {
    this.addStateItem("未开始");
    this.addStateItem("进行中");
    this.addStateItem("已完成");
    this.addTeammatePatten(commonUtil.getState("curUsername"));
};

CreateNewProj.prototype.addStateItem = function (title) {
    if(this.stateFlow.every(state => {return state !== title})){
        let stateItem = document.createElement("LI");
        stateItem.role = "presentation";
        stateItem.className = "active";
        let btnStateChange = document.createElement("A");
        let stateNameBar = document.createElement("H4");
        stateNameBar.style = "text-align: center; padding: 0; margin: 0;";
        stateNameBar.innerHTML = title + '<small style="color: #a3a3a3">(点击以编辑)</small>';
        btnStateChange.appendChild(stateNameBar);
        stateItem.appendChild(btnStateChange);
        this.projectStateFlow.insertBefore(stateItem, this.btnAddStateItem);
        btnStateChange.addEventListener("click", eventUtil.newEventHendleFun(false, this.editStateName, this, stateItem, title));
        this.stateFlow.push(title);
    }

};

CreateNewProj.prototype.editStateName = function (stateItem, title) {
    let input = document.createElement("INPUT");
    input.style = 'width: -webkit-fill-available; font-size: x-large; text-align: center; border-radius: 4px; position: relative; display: block; padding: 2px 15px;';
    input.type = "text";
    input.value = title;
    stateItem.removeChild(stateItem.firstElementChild);
    stateItem.appendChild(input);
    input.focus();
    input.addEventListener("blur", eventUtil.newEventHendleFun(true, (stateItem, title, ev) => {
        let btnStateChange = document.createElement("A");
        let stateNameBar = document.createElement("H4");
        stateNameBar.style = "text-align: center; padding: 0; margin: 0;";
        let newTitle = ev.target.value;
        if(this.stateFlow.some(state => state === newTitle))
            newTitle = title;
        else {
            this.stateFlow.forEach((state, index, arr) => {
                if(state === title)
                    arr[index] = newTitle;
            })
        }
        stateNameBar.innerHTML = newTitle + '<small style="color: #a3a3a3">(点击以编辑)</small>';
        btnStateChange.appendChild(stateNameBar);
        stateItem.removeChild(stateItem.firstElementChild);
        stateItem.appendChild(btnStateChange);
        btnStateChange.addEventListener("click", eventUtil.newEventHendleFun(false, this.editStateName, this, stateItem, newTitle));
    }, this, stateItem, title));

};

CreateNewProj.prototype.deleteStateItem = function () {
    if(this.projectStateFlow.childElementCount > 2){
        this.projectStateFlow.removeChild(this.projectStateFlow.children[this.projectStateFlow.childElementCount - 2]);
        this.stateFlow.pop();
    }

};

CreateNewProj.prototype.editAddTeammate = function () {
    this.btnEditTeammate.style.display = "none";
    this.btnAddTeammate.style.display = "inline";
    this.btnCloseEditTeammate.style.display = "inline";
    this.areaEditTeammate.style.display = "";
    this.inputAddTeammate.value = "";
    this.inputAddTeammate.style.display = "inline";
    this.inputAddTeammate.style.width = "215px";
    this.inputAddTeammate.focus();
    this.addTeammateBar.style.display = "block";
    this.addTeammateBar.style.width = "312px";
};

CreateNewProj.prototype.closeEditAddTeammate = function (ev) {
    this.btnEditTeammate.style.display = "block";
    this.btnAddTeammate.style.display = "none";
    this.btnCloseEditTeammate.style.display = "none";
    this.areaEditTeammate.style.display = "none";
    this.inputAddTeammate.style.display = "none";
    this.inputAddTeammate.style.width = "0";
    this.addTeammateBar.style.display = "inline-block";
    this.addTeammateBar.style.width = "50px";
};

CreateNewProj.prototype.addTeammate = function () {
    let email = this.inputAddTeammate.value;
    let username = commonUtil.runService("userService", "findUsernameByEmail", [email]);
    if(username !== undefined && username !== "null"){
        this.addTeammatePatten(username);
        let user = {
            username: username,
            email: email
            };
        this.teammate.push(user);
    }
    this.closeEditAddTeammate();
};

CreateNewProj.prototype.addTeammatePatten = function (username, iconSrc) {
    let newTeammate = document.createElement("DIV");
    newTeammate.className = "thumbnail";
    newTeammate.style = 'width: 50px; height: 50px; margin: 2px; border-radius: 25px; display: inline-block; background-color: #ddd;';
    let a = document.createElement("A");
    let img = document.createElement("IMG");
    img.src = "/resource/img/account.png";
    img.title = username;
    img.width = "40px";
    img.height = "40px";
    img.style = "width:40px; height:40px; border-radius:25px;";
    a.appendChild(img);
    newTeammate.appendChild(a);
    this.teammatePanel.insertBefore(newTeammate, this.addTeammateBar);
};

CreateNewProj.prototype.addNewProject = function () {
    debugger
    let projectName = this.inputProjectName.value;
    let projectIntro = this.inputProjectIntro.value;
    let projectStateFlow = this.stateFlow.join(",");
    let projectTeammate = "[" + this.teammate.map(value => {
        return '{"username": "' + value.username + '","email": "' + value.email + '"}';
    }).join(",") + "]";
    let ret = $.ajax({
        url: "/controller/newProject",
        data: {
            projectName: projectName,
            projectIntro: projectIntro,
            projectStateFlow: projectStateFlow,
            projectTeammate: projectTeammate
        },
        async: false,
        error: () => alert("getSessionAttribute error")
    }).responseText;
    debugger

    // this.instanceOfRunning.addProjectBlock();
};
package controller;

import entity.OpTask;
import entity.Project;
import entity.User;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.IProjectService;
import service.IStateModule;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Controller
public class ProjectController {
    @Autowired
    private IProjectService projectService;
    @Autowired
    private IStateModule stateModule;

    @RequestMapping("newProject")
    public @ResponseBody int newProject(String projectName, String projectIntro, String projectStateFlow, String projectTeammatesEmail) {
        int curUserid = stateModule.getCurUserId();
        String curDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Project project = new Project(null, curUserid, projectName, projectIntro, curDateTime);
        String[] states = projectStateFlow.split(",");
        String[] teammatesEmail = projectTeammatesEmail.split(",");
        project = projectService.addProject(project, states, teammatesEmail);
        return project.getId();
    }


    @RequestMapping(value = "newTask", produces = "text/plain; charset=utf-8")
    public @ResponseBody String newTask(String taskTitle, String deadline, int priorityLevel, int stateId) {
        int curUserid = stateModule.getCurUserId();
        String curDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        OpTask task = new OpTask(null, curUserid, taskTitle, "", stateId, curDateTime, deadline, null, priorityLevel, null);
        task = projectService.addTask(task);
        return JsonObject.mapFrom(task).toString();
    }


}



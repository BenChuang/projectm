package controller;

import entity.Project;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.IProjectService;
import service.IStateModule;

import javax.ejb.Local;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Controller
public class ProjectController {
    @Autowired
    private IProjectService projectService;
    @Autowired
    private IStateModule stateModule;

    @RequestMapping("newProject")
    public @ResponseBody boolean newProject(String projectName, String projectIntro, String projectStateFlow, String projectTeammate) {
        int curUserid = stateModule.getCurUserId();
        String curDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Project project = new Project(null, curUserid, projectName, projectIntro, curDateTime);
        project = projectService.addProject(project);
        if (project.getId() != null){
            String[] states = projectStateFlow.split(",");
            Teammate[] teammates = Json.decodeValue(projectTeammate, Teammate[].class);
        }
        return true;
    }

}


class Teammate{
    private String username;
    private String email;

    public Teammate(){
        super();
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}


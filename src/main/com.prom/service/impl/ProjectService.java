package service.impl;

import dao.*;
import entity.*;
import io.vertx.core.eventbus.impl.codecs.JsonArrayMessageCodec;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import service.IProjectService;
import utils.StringsUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
public class ProjectService implements IProjectService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private StateToProjectRepository stateToProjectRepository;
    @Autowired
    private UserToProjectRepository userToProjectRepository;
    @Autowired
    private OpTaskRepository opTaskRepository;

    @Override
    public String findProjectStringById(String id) {
        int readId = Integer.parseInt(id);
        Optional<Project> optionalProject = projectRepository.findById(readId);
        return optionalProject.map(project -> {
            JsonObject jsonObject = JsonObject.mapFrom(project);
            int ownerId = jsonObject.getInteger("projectOwner");
            String ownerName = userRepository.findById(ownerId).map(User::getUsername).orElse(null);
            jsonObject.put("ownerName", ownerName);
            jsonObject.remove("projectOwner");
            return jsonObject.toString();
        }).orElse("null");
    }

    @Override
    public String findAllTaskIdByStateId(String stateId) {
        int realStateId = Integer.parseInt(stateId);
        Optional<List<OpTask>> optionalOpTask = opTaskRepository.findByState(realStateId);
        return optionalOpTask.map(opTasks -> {
            String s = opTasks.stream().map(opTask -> String.valueOf(opTask.getId())).reduce((preId, nextId) -> preId + "," + nextId).orElse("null");
            return "[" + s + "]";
        }).orElse("null");
    }

    @Override
    public String findAllTaskIdByStateIdAndTaskFor(String stateId, String taskFor) {
        int realStateId = Integer.parseInt(stateId);
        int realTaskFor = Integer.parseInt(taskFor);
        Optional<List<OpTask>> optionalOpTask = opTaskRepository.findByStateAndTaskFor(realStateId, realTaskFor);
        return optionalOpTask.map(opTasks -> {
            String s = opTasks.stream().map(opTask -> String.valueOf(opTask.getId())).reduce((preId, nextId) -> preId + "," + nextId).orElse("null");
            return "[" + s + "]";
        }).orElse("null");
    }

    @Override
    public void removeTask(String taskId) {
        int realTaskId = Integer.parseInt(taskId);
        opTaskRepository.deleteById(realTaskId);
    }

    @Override
    public String findTaskStringById(String stateId) {
        int realStateId = Integer.parseInt(stateId);
        Optional<OpTask> optionalOpTask = opTaskRepository.findById(realStateId);
        return optionalOpTask.map(ot -> JsonObject.mapFrom(ot).toString()).orElse("null");
    }

    @Override
    public String findAllProjectIdByUserId(String userId) {
        int readUserId = Integer.parseInt(userId);
        return userToProjectRepository.findDistinctByUserId(readUserId).map(list -> {
            String s = list.stream().map(userToProject -> String.valueOf(userToProject.getProjectId())).reduce((preId, nextId) -> preId + "," + nextId).orElse("null");
            return "[" + s + "]";
        }).orElse("null");
    }

    @Override public String findAllStateToProject(String projectId) {
        int readprojectId = Integer.parseInt(projectId);
        List<StateToProject> allStateToProject = stateToProjectRepository.findByProjectId(readprojectId).orElse(Collections.emptyList());
        int lengthOfSToP = allStateToProject.size();
        Map<Integer, StateToProject> sToPByPreState = new HashMap<>(4);
        String[] jsonSToP = new String[lengthOfSToP];
        Integer preStateId = null;
        for (StateToProject sToP : allStateToProject) {
            sToPByPreState.put(sToP.getPreState(), sToP);
        }
        JsonArray jsonArray = new JsonArray();
        for (int i = 0; i < lengthOfSToP; i++) {
            StateToProject sToP = sToPByPreState.get(preStateId);
            JsonObject jsonObject = new JsonObject();
            jsonObject.put("index", i);
            jsonObject.put("stateId", sToP.getId());
            jsonObject.put("stateName", sToP.getStateName());
            jsonArray.add(jsonObject);
            preStateId = sToP.getId();
        }
        return jsonArray.toString();
        
    }

    @Override
    public String findAllTaskByProjectId(String projectId) {
        List<OpTask> allTasks = new ArrayList<>();
        int realProjectId = Integer.parseInt(projectId);
        Optional<List<StateToProject>> optionalStateToProjects = stateToProjectRepository.findByProjectId(realProjectId);
        if(optionalStateToProjects.isPresent()) {
            List<StateToProject> stateToProjects = optionalStateToProjects.get();
            for (StateToProject state : stateToProjects) {
                Integer stateId = state.getId();
                if (stateId != null) {
                    Optional<List<OpTask>> optionalOpTasks = opTaskRepository.findByState(stateId);
                    allTasks.addAll(optionalOpTasks.orElse(new ArrayList<>()));
                }
            }
        }
        return new JsonArray(allTasks).toString();

    }


    @Override
    public Project addProject(Project project, String[] states, String[] teammatesEmail) {
        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(project, "projectName", "projectOwner", "createTime")){
            if((project = projectRepository.save(project)).getId() != null){
                initStates(project, states);
                initTeammates(project, teammatesEmail);
            }
        }
        return project;
    }

    @Override
    public void initStates(Project project, String[] states) {
        StateToProject[] allStateToProjectstate = new StateToProject[states.length];
        StateToProject preStateToProject = null;
        for (int i = 0; i < allStateToProjectstate.length; i++) {
            StateToProject stateToProject = allStateToProjectstate[i] = new StateToProject();
            stateToProject.setProjectId(project.getId());
            stateToProject.setStateName(states[i]);
            if (i > 0) stateToProject.setPreState(Objects.requireNonNull(preStateToProject.getId()));
            stateToProject = stateToProjectRepository.save(stateToProject);
            preStateToProject = stateToProject;
        }
        stateToProjectRepository.flush();
    }

    @Override
    public void initTeammates(Project project, String[] teammatesEmail) {
        UserToProject[] allUserToProject = new UserToProject[teammatesEmail.length];
        for (int i = 0; i < allUserToProject.length; i++) {
            User teammate = userRepository.findByEmail(teammatesEmail[i]);
            if(teammate != null && teammate.getId() != null){
                allUserToProject[i] = new UserToProject(null, project.getId(), teammate.getId());
                userToProjectRepository.save(allUserToProject[i]);
            }
        }
        userToProjectRepository.flush();
    }

    @Override
    public OpTask addTask(OpTask task) {
        return opTaskRepository.save(task);
    }


    @Override
    public String forwardTask(String taskId) {
        int realTaskId = Integer.parseInt(taskId);
        OpTask task = opTaskRepository.getOne(realTaskId);
        if(task.getState() != null){
            StateToProject state = stateToProjectRepository.getOne(task.getState());
            StateToProject nextState = stateToProjectRepository.findByPreState(state.getId());
            if(nextState == null) {
                task.setPriorityLevel(4);
                task.setFinishedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            } else
                task.setState(nextState.getId());
            task = opTaskRepository.saveAndFlush(task);
        }
        return JsonObject.mapFrom(task).toString();
    }
}

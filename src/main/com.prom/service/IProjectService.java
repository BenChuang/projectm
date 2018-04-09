package service;

import entity.OpTask;
import entity.Project;
import entity.User;

public interface IProjectService{


    String findProjectStringById(String id);

    String findAllTaskIdByStateId(String stateId);

    String findAllTaskIdByStateIdAndTaskFor(String stateId, String taskFor);

    void removeTask(String taskId);

    String findTaskStringById(String stateId);

    String findAllProjectIdByUserId(String userId);

    String findAllStateToProject(String projectId);

    String findAllTaskByProjectId(String projectId);

    Project addProject(Project project, String[] states, String[] teammatesEmail);

    void initStates(Project project, String[] states);

    void initTeammates(Project project, String[] teammatesEmail);

    OpTask addTask(OpTask task);

    String forwardTask(String taskId);
}

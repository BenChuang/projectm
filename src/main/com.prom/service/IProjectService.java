package service;

import entity.OpTask;
import entity.Project;
import entity.User;

public interface IProjectService{


    String findProjectStringById(String id);

    String findAllProjectIdByUserId(String userId);

    String findAllStateToProject(String projectId);

    Project addProject(Project project, String[] states, String[] teammatesEmail);

    void initStates(Project project, String[] states);

    void initTeammates(Project project, String[] teammatesEmail);

    OpTask addTadk(OpTask task);
}

package service.impl;

import dao.ProjectRepository;
import entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import service.IProjectService;
import utils.StringsUtils;

@Component
public class ProjectService implements IProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project addProject(Project project) {
        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(project, "projectName", "projectOwner", "createTime")){
            return projectRepository.saveAndFlush(project);
        }
        return null;
    }
}

package dao;

import entity.StateToProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateToProjectRepository extends JpaRepository<StateToProject, Integer>{

    Optional<List<StateToProject>> findByProjectId(Integer projectId);
}

package dao;

import entity.UserToProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserToProjectRepository extends JpaRepository<UserToProject, Integer>{
    Optional<List<UserToProject>> findDistinctByUserId(int userId);

    Optional<List<UserToProject>> findDistinctByProjectId(int projectId);
}

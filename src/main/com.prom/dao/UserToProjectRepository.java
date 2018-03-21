package dao;

import entity.UserToProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserToProjectRepository extends JpaRepository<UserToProject, UserToProject>{
}

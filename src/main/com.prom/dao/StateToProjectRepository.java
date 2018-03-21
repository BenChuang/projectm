package dao;

import entity.StateToProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateToProjectRepository extends JpaRepository<StateToProject, Integer>{
}

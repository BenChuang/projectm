package dao;

import entity.OpTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpTaskRepository extends JpaRepository<OpTask, Integer> {
}

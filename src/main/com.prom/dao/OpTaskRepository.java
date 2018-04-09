package dao;

import entity.OpTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpTaskRepository extends JpaRepository<OpTask, Integer> {
    Optional<List<OpTask>> findByState(int stateId);

    Optional<List<OpTask>> findByStateAndTaskFor(int stateId, int userId);
}

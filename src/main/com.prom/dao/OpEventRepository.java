package dao;

import entity.OpEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpEventRepository extends JpaRepository<OpEvent, Integer> {
}

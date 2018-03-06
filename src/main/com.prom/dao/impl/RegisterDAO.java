package dao.impl;

import dao.IRegisterDAO;
import entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class RegisterDAO implements IRegisterDAO{

    @PersistenceContext
    private EntityManager em;

    @Override
    public User findUserByEmail(String emailOrPhone) {
        return em.find(User.class, 2);
    }

    @Override
    public boolean addUser(User user) {
        em.persist(user);
        return true;
    }
}

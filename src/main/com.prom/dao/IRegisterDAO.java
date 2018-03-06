package dao;

import entity.User;

public interface IRegisterDAO {
    User findUserByEmail(String emailOrPhone);

    boolean addUser(User user);
}


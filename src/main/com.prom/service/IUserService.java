package service;

import entity.User;

public interface IUserService {

    boolean isUserExist(User user);

    boolean isUserInfoExist(int userId);

    boolean addUser(User user);

    User verify(String email, String password);
}

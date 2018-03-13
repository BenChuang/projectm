package service;

import entity.User;
import entity.UserInfo;

public interface IUserService {

    boolean isUserExist(User user);

    boolean isUserInfoExist(int userId);

    User addUser(User user);

    UserInfo addUserInfo(UserInfo userInfo);

    User verify(String email, String password);
}

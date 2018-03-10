package service;

import entity.User;

import java.lang.reflect.InvocationTargetException;

public interface IUserService {

    boolean isUserNotExist(User user);

    boolean addUser(User user);
}

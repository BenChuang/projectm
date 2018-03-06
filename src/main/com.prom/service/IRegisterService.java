package service;

import entity.User;

import java.lang.reflect.InvocationTargetException;

public interface IRegisterService {
    boolean isValid(User user) throws InvocationTargetException, IllegalAccessException;

    boolean isUserNotExist(User user);

    boolean addUser(User user);
}

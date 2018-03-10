package service.impl;

import dao.UserRepository;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import service.IUserService;
import utils.StringsUtils;

import java.util.ArrayList;


@Component
public class UserService implements IUserService {

    @Autowired
    public UserRepository userRepository;

    @Override
    public boolean isUserNotExist(User user) {
        return userRepository.findByEmail(user.getEmail()) == null;
    }

    @Override
    public boolean addUser(User user) {
        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(user, "email", "username", "password") && isUserNotExist(user)){
            userRepository.saveAndFlush(user);
            return true;
        }
        return false;
    }


}



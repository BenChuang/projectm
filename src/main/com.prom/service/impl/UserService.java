package service.impl;

import dao.UserInfoRepository;
import dao.UserRepository;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import service.IUserService;
import utils.StringsUtils;


@Component
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public boolean isUserExist(User user) {
        return userRepository.existsByEmail(user.getEmail());
    }

    @Override
    public boolean isUserInfoExist(int userId){
        return userInfoRepository.existsByUserId(userId);
    }

    @Override
    public boolean addUser(User user) {
        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(user, "email", "username", "password") && !isUserExist(user)){
            userRepository.saveAndFlush(user);
            return true;
        }
        return false;
    }

    @Override
    public User verify(String email, String password) {
        if (StringsUtils.INSTANCE.isAllNullOrEmpty(email, password))
            throw new IllegalArgumentException("email or password is emrty!");
        User user = userRepository.findByEmail(email);
        if(user != null && password.equals(user.getPassword()))
            return user;
        return null;
    }


}



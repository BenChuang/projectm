package service.impl;

import dao.IRegisterDAO;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import service.IRegisterService;
import utils.StringsUtils;


@Component
public class RegisterService implements IRegisterService {

    @Autowired
    private IRegisterDAO registerDAO;



    @Override
    public boolean isValid(User user) {
        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(user) && isUserNotExist(user)){
//        if(StringsUtils.INSTANCE.checkGetterNotNullOrEmpty(user)){
                return true;
        }
        return false;
    }

    @Override
    public boolean isUserNotExist(User user) {
        return registerDAO.findUserByEmail(user.getEmail()) == null;
    }

    @Override
    public boolean addUser(User user) {
        if(isValid(user))
            return registerDAO.addUser(user);
        return false;
    }

    public static void main(String[] args) {
        new RegisterService().isValid(new User(1,"d","d","s"));
    }

}



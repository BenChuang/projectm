package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import service.IStateModule;
import service.IUserService;
import service.impl.StateModule;


@Controller
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IStateModule stateModule;

    @PostMapping("/register")
    public String regist(User user) {
        if (userService.addUser(user)){
            stateModule.setCurUser(user);
        }
        return "index";
    }
}

package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import service.IStateModule;
import service.IUserService;


@Controller
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IStateModule stateModule;

    @PostMapping("/regist")
    public ModelAndView regist(User user) {
        if (userService.addUser(user)){
            stateModule.setCurUser(user);
        }
        return new ModelAndView("redirect:/");
    }

    @PostMapping("/login")
    public ModelAndView login(String email, String password){
        User user = userService.verify(email, password);
        if(user != null){
            stateModule.setCurUser(user);
        }
        return new ModelAndView("redirect:/");
    }

    @RequestMapping("/logout")
    public ModelAndView logout(){
        stateModule.setCurUser(null);
        return new ModelAndView("redirect:/");
    }
}

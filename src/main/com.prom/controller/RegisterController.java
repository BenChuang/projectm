package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import service.IRegisterService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
public class RegisterController {

    @Autowired
    IRegisterService registerService;

    @PostMapping("/register")
    public String regist(User user) {
        registerService.addUser(user);
        return "index";
    }
}

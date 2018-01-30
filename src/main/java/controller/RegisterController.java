package controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
@Controller
public class RegisterController {

    @RequestMapping("/register")
    public String getRegisterControllerPage() {
        return "forward:/login.html";
    }
}

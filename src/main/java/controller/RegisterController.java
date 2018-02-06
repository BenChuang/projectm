package controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
@Controller
public class RegisterController {

    @PostMapping("/register")
    public String getRegisterControllerPage() {

        return "forward:/register.html";
    }
}

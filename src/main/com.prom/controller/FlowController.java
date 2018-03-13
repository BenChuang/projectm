package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import service.IStateModule;
import service.IUserService;

@Controller
public class FlowController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IStateModule stateModule;

    @RequestMapping(value = "/teamco")
    public ModelAndView enter(){
        if(stateModule.isLogined()){
            int curUserId = stateModule.getCurUserId();
            if(curUserId > 0)
                return new ModelAndView("teamco");
        }
        return new ModelAndView("redirect:/");
    }
}

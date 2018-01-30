package service.impl;

import org.springframework.stereotype.Component;
import service.IMyService;

@Component
public class MyService implements IMyService {
    @Override
    public String hello() {
        return "forward:/login.html";
    }

}

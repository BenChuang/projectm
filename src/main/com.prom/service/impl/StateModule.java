package service.impl;

import entity.User;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import service.IStateModule;


@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.INTERFACES)
public class StateModule implements IStateModule{

    private User curUser;


    @Override
    public boolean isLogined() {
        return curUser != null;
    }

    @Override
    public void setCurUser(User user) {
        this.curUser = user;
    }

    @Override
    public User getCurUser(){
        return curUser;
    }
}

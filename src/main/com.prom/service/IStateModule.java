package service;

import entity.User;

public interface IStateModule {

    boolean isLogined();


    void setCurUser(User user);


    User getCurUser();

}

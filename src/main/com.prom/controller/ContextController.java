package controller;

import io.vertx.core.json.JsonObject;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.IStateModule;
import service.IUserService;
import service.impl.StateModule;
import utils.StringsUtils;

import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Controller
public class ContextController {

    @Autowired
    private BeanFactory beanFactory;

    /**
     * 获取session中的值
     * @param key
     * @param httpSession
     * @return 返回值或对象json字符串，值不存在均返回"null"
     */
    @RequestMapping(value = "sessAttr", produces = "text/plain; charset=utf-8")
    public @ResponseBody String getSessionAttribute(String key, HttpSession httpSession) {
        Object attr = httpSession.getAttribute(key);
        if (!StringsUtils.INSTANCE.isNullOrEmpty(attr) && !key.startsWith("scopedTarget")){
            JsonObject jsonObject = JsonObject.mapFrom(attr);
            return jsonObject.toString();
        }
        else return "null";
    }

    /**
     * 获取StateModule中的状态
     * @param key
     * @param httpSession
     * @return 返回值或对象json字符串，stateModule未初始化及值不存在均返回"null"
     */
    @RequestMapping(value = "state", produces = "text/plain; charset=utf-8")
    public @ResponseBody String getState(String key, HttpSession httpSession) {
        StateModule scopedStateModule = (StateModule) httpSession.getAttribute("scopedTarget.stateModule");
        if(scopedStateModule != null){
            Object value = JsonObject.mapFrom(scopedStateModule).getValue(key);
            return String.valueOf(value);
        } else return "null";
    }


    @RequestMapping(value = "service", produces = "text/plain; charset=utf-8")
    public @ResponseBody String runService(String serviceName, String methodName, String paramsString) {
        if (serviceName.contains("Service")){
            Object[] params = paramsString.split(";");
            Object service = beanFactory.getBean(serviceName);
            Method[] methods = service.getClass().getDeclaredMethods();
            for (Method method : methods) {
                if (method.getName().equals(methodName) && method.getParameterCount() == params.length){
                    Class[] parameterTypes = method.getParameterTypes();
                    if(Arrays.stream(parameterTypes).allMatch(aClass -> aClass.equals(String.class))){
                        try {
                            Object ret = method.invoke(service, params);
                            return ret != null?ret.toString():"null";
                        } catch (IllegalAccessException | InvocationTargetException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        return "null";
    }


}

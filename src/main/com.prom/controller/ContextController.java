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

@Controller
public class ContextController {

    @Autowired
    private BeanFactory beanFactory;
    @Autowired
    private IStateModule stateModule;

    /**
     * 获取session中的值
     * @param key
     * @param httpSession
     * @return 返回值或对象json字符串，值不存在均返回"null"
     * @throws Exception
     */
    @RequestMapping(value = "sessAttr")
    public @ResponseBody String getSessionAttribute(String key, HttpSession httpSession) {
        Object attr = httpSession.getAttribute(key);
        if (!StringsUtils.INSTANCE.isNullOrEmpty(attr)){
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
     * @throws Exception
     */
    @RequestMapping(value = "state")
    public @ResponseBody String getState(String key, HttpSession httpSession) {
        StateModule scopedStateModule = (StateModule) httpSession.getAttribute("scopedTarget.stateModule");
        if(scopedStateModule != null){
            Object value = JsonObject.mapFrom(scopedStateModule).getValue(key);
            return String.valueOf(value);
        } else return "null";
    }
}

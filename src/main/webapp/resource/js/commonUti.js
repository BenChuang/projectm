const commonUtil = {
    /**
     * 读取静态文件内容
     * @param url string文件的url地址
     * @returns {string}
     */
    syncLoad: (url) => {
        if("string" === typeof url){
            const respText = $.ajax({url: url, async: false}).responseText;
            if(respText){
                return respText;
            }
        }
    },
    /**
     * 获取当前session中存储的对象
     * @param key
     * @param callback
     * @returns {string}
     */
    getSessionAttribute: (key, callback) => {
        if (callback)
            $.ajax({url: "/controller/sessAttr", data: {key: key}, success: callback, error: () => alert("getSessionAttribute error")});
        else{
            let ajax = $.ajax({
                url: "/controller/sessAttr",
                data: {key: key},
                async: false,
                error: () => alert("getSessionAttribute error")
            });
            if(ajax.status === 200)
                return ajax.responseText;
        }
    },

    /**
     * 获取state中的状态值，若转台为对象则返回对象json字符串
     * @param key
     */
    getState: (key, callback) => {
        if (callback)
            $.ajax({url: "/controller/state", data: {key: key}, success: callback, error: () => alert("getState error")});
        else{
            let ajax = $.ajax({
                url: "/controller/state",
                data: {key: key},
                async: false,
                error: () => alert("getState error")
            });
            if(ajax.status === 200)
                return ajax.responseText;
        }
    },


};
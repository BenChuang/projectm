const commonUtil = {
    /**
     * 读取静态文件内容
     * @param url string文件的url地址
     * @param callback
     * @returns {string}
     */
    loadHtml: (url, callback) => {
        if("string" === typeof url){
            if(callback){
                $.ajax({url: url, success: ret => {callback(ret);}});
            } else {
                const respText = $.ajax({url: url, async: false}).responseText;
                if(respText){
                    return respText;
                }
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
                error: ( jqXHR,  textStatus,  errorThrown) => {debugger;alert("getState error");}
            });
            if(ajax.status === 200)
                return ajax.responseText;
        }
    },


    runService: (serviceName, methodName, params, callback) => {
        if(params !== undefined && params.constructor.name !== "Array"){
            const arr = [];
            arr.push(params);
            params = arr;
        }
        let paramsString = params.map(param => param.toString()).reduce( (pre, cur) => {
            if(cur) return pre + ";" + cur;
            else return pre;
        });
        if (callback)
            $.ajax({
                url: "/controller/service",
                data: {
                    serviceName: serviceName,
                    methodName: methodName,
                    paramsString: paramsString
                },
                success: callback,
                error: () => alert("runService error")
            });
        else{
            let ajax = $.ajax({
                url: "/controller/service",
                data: {
                    serviceName: serviceName,
                    methodName: methodName,
                    paramsString: paramsString
                },
                async: false,
                error: () => alert("runService error")
            });
            if(ajax.status === 200)
                return ajax.responseText;
        }
    },



    /**
     * 构造id为"btn_{ btnName }”形式的按钮的属性名
     * @param btn
     * @returns {string} 返回“{ BtnName }“形式字符串
     */
    buildBtnName: btn => {
        if(btn && btn.id){
            let btnId = btn.id;
            let indexOf_ = btnId.indexOf("_");
            if(indexOf_ + 1 !== -1 && btnId.length > indexOf_ + 1){
                return btnId.substr(indexOf_ + 1 , 1).toUpperCase() + btnId.substring(indexOf_ + 2);
            }
        }
    }

};
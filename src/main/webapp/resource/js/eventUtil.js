var eventUtil = {
    /**
     * 包装特殊上下文对象的事件处理函数
     * @param needEvent bool是否需要传入event对象
     * @param fn func事件处理函数对象
     * @param context obj上下文对象
     * @param params []事件处理函数的参数列表
     * @returns {Function} needEvent为true时将event对象添加到params最后
     */
    newEventHendleFun: function (needEvent, fn, context, params) {
        if (needEvent)
            return function (event) {
                params = params || [];
                //判断最后一位是否为event对象，是则替换成当前event对象
                if(params[params.length - 1] && params[params.length - 1].preventDefault && params[params.length - 1].target)
                    params.pop();
                params.push(event);
                fn.apply(context, params);
            };
        else
            return function () {
                fn.apply(context, params);
            }
    }
};
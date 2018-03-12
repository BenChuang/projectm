const eventUtil = {
    /**
     * 包装特殊上下文对象的事件处理函数
     * @param needEvent bool是否需要传入event对象
     * @param fn func事件处理函数对象
     * @param context obj上下文对象
     * @param params 事件处理函数的参数列表
     * @returns {Function} needEvent为true时将event对象添加到params后面作为最后一个参数输入
     */
    newEventHendleFun: (needEvent, fn, context, ...params) => {
        if (needEvent)
            return function (event) {
                fn.call(context, ...params, event);
            };
        else
            return function () {
                fn.call(context, ...params);
            }
    }
};
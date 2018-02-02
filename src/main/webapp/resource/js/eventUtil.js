var eventUtil = {
    newEventHendleFun: function (needEvent, fn, context, params) {
        if (needEvent)
            return function (event) {
                params = params || [];
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
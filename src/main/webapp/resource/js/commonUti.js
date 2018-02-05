var commonUtil = {
    syncLoad: function (url) {
        if("string" === typeof url){
            var respText = $.ajax({url: url, async: false}).responseText;
            if(respText){
                return respText;
            }
        }
    }
};
const commonUtil = {
    /**
     * 同步读取文件内容
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
    }
};